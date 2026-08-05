import { Router, type Request, type Response } from "express";
import { ZodError } from "zod";
import { contactSchema } from "../types/contact.js";
import { MAIL_FROM, resend } from "../lib/resend.js";
import { isRateLimited } from "../lib/rateLimit.js";
import {
  ownerEmailHtml,
  ownerEmailSubject,
  ownerEmailText,
} from "../emails/ownerEmail.js";
import {
  customerEmailHtml,
  customerEmailSubject,
  customerEmailText,
} from "../emails/customerEmail.js";

export const contactRouter = Router();

const OWNER_EMAIL = process.env.OWNER_EMAIL;

contactRouter.post("/contact", async (req: Request, res: Response) => {
  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: "Too many enquiries submitted recently. Please try again later.",
    });
  }

  if (!OWNER_EMAIL) {
    console.error("[contact] OWNER_EMAIL is not configured on the server.");
    return res.status(500).json({
      success: false,
      message: "Server is misconfigured. Please try again later.",
    });
  }

  let payload;
  try {
    payload = contactSchema.parse(req.body);
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors = err.flatten().fieldErrors;
      return res.status(400).json({ success: false, message: "Invalid form data", fieldErrors });
    }
    return res.status(400).json({ success: false, message: "Invalid form data" });
  }

  try {
    // Email #1 — notify the website owner.
    const ownerResult = await resend.emails.send({
      from: MAIL_FROM,
      to: OWNER_EMAIL,
      replyTo: payload.email,
      subject: ownerEmailSubject(payload),
      html: ownerEmailHtml(payload),
      text: ownerEmailText(payload),
    });

    if (ownerResult.error) {
      throw new Error(`Owner email failed: ${ownerResult.error.message}`);
    }

    // Email #2 — confirm submission to the customer.
    // If this one fails (e.g. domain not yet verified on Resend, so only the
    // Resend account owner's address can receive mail), we still tell the
    // user their enquiry was received, since Email #1 already succeeded.
    let customerEmailSent = true;
    try {
      const customerResult = await resend.emails.send({
        from: MAIL_FROM,
        to: payload.email,
        subject: customerEmailSubject(),
        html: customerEmailHtml(payload),
        text: customerEmailText(payload),
      });
      if (customerResult.error) {
        customerEmailSent = false;
        console.error("[contact] Customer confirmation email failed:", customerResult.error.message);
      }
    } catch (err) {
      customerEmailSent = false;
      console.error("[contact] Customer confirmation email threw:", err);
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully.",
      customerEmailSent,
    });
  } catch (err) {
    console.error("[contact] Failed to send owner notification email:", err);
    return res.status(502).json({
      success: false,
      message: "Could not send your enquiry right now. Please try again shortly.",
    });
  }
});

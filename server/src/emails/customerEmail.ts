import type { ContactPayload } from "../types/contact.js";
import { colors, detailRow, detailsTable, renderEmailShell } from "./layout.js";

export function customerEmailSubject(): string {
  return "Thank You for Contacting BharatX Infratech";
}

export function customerEmailHtml(payload: ContactPayload): string {
  const rows = [
    detailRow("Name", payload.name),
    detailRow("Email", payload.email),
    detailRow("Phone", payload.phone),
    detailRow("Company", payload.company || "—"),
    detailRow("Service", payload.service),
    detailRow("Message", payload.message, { multiline: true }),
  ].join("");

  const bodyHtml = `
    <p style="margin:0 0 16px 0; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${colors.INK}; font-size:14px; line-height:1.6;">
      We have successfully received your enquiry. Our team will review the
      details below and get back to you within <strong>24 hours</strong>.
    </p>

    <p style="margin:0 0 20px 0; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${colors.MUTED}; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">
      Your Submitted Details
    </p>

    ${detailsTable(rows)}

    <p style="margin:24px 0 0 0; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${colors.INK}; font-size:14px; line-height:1.6;">
      If anything above needs correcting, simply reply to this email and we'll
      update it on our end. Thank you for choosing BharatX Infratech.
    </p>
  `;

  return renderEmailShell({
    preheader: `Hi ${payload.name}, we've received your enquiry and will be in touch soon.`,
    eyebrow: "Enquiry Received",
    heading: `Thank You, ${payload.name}!`,
    bodyHtml,
  });
}

export function customerEmailText(payload: ContactPayload): string {
  return [
    `Thank You, ${payload.name}!`,
    "",
    "We have successfully received your enquiry.",
    "Our team will contact you within 24 hours.",
    "",
    "Your Submitted Details:",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || "—"}`,
    `Service: ${payload.service}`,
    `Message: ${payload.message}`,
    "",
    "Thank you for choosing BharatX Infratech.",
  ].join("\n");
}

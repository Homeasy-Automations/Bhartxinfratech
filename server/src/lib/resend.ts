import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  // Fail loudly at boot rather than silently dropping emails at request time.
  console.error(
    "[resend] RESEND_API_KEY is not set. Set it in your environment (.env locally, " +
      "Render dashboard in production) before starting the server."
  );
}

export const resend = new Resend(apiKey ?? "missing-api-key");

/**
 * Sender address used for all outgoing mail.
 *
 * Until a custom domain (e.g. bharatxinfratech.com) is verified on Resend,
 * you can only send FROM "onboarding@resend.dev" and only TO the email
 * address you signed up to Resend with. Set MAIL_FROM once the domain is
 * verified to switch to something like:
 *   "BharatX Infratech <enquiries@bharatxinfratech.com>"
 */
export const MAIL_FROM =
  process.env.MAIL_FROM || "BharatX Infratech <onboarding@resend.dev>";

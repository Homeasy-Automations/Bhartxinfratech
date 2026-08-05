/**
 * Shared email "shell" — inline CSS + table-based layout so it renders
 * consistently across Gmail, Outlook, Apple Mail, etc. Matches the site's
 * navy / gold brand from src/index.css (--color-navy, --color-gold).
 */

const NAVY = "#0A192F";
const NAVY_SOFT = "#112240";
const GOLD = "#C5A059";
const GOLD_LIGHT = "#D4AF37";
const INK = "#1F2937";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const BG = "#F4F5F7";

export const SITE_URL = process.env.SITE_URL || "https://bharatxinfratech.com";
export const COMPANY_NAME = "BharatX Infratech";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Converts plain text with line breaks into safe, wrapped HTML paragraphs. */
export function escapeMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}

interface EmailShellOptions {
  preheader: string;
  eyebrow: string;
  heading: string;
  bodyHtml: string;
}

export function renderEmailShell({
  preheader,
  eyebrow,
  heading,
  bodyHtml,
}: EmailShellOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(COMPANY_NAME)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BG}; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG}; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden; border:1px solid ${BORDER};">

            <!-- Header -->
            <tr>
              <td style="background-color:${NAVY}; background-image:linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%); padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:#ffffff; font-size:20px; font-weight:700; letter-spacing:0.5px;">
                      ${escapeHtml(COMPANY_NAME)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Gold accent bar -->
            <tr>
              <td style="height:4px; line-height:4px; font-size:0; background:linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%);">&nbsp;</td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 32px 12px 32px;">
                <p style="margin:0 0 8px 0; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${GOLD}; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">
                  ${escapeHtml(eyebrow)}
                </p>
                <h1 style="margin:0 0 24px 0; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${NAVY}; font-size:22px; font-weight:700; line-height:1.3;">
                  ${escapeHtml(heading)}
                </h1>
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER}; padding-top:20px;">
                  <tr>
                    <td style="font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${MUTED}; font-size:12px; line-height:1.7;">
                      <strong style="color:${INK};">${escapeHtml(COMPANY_NAME)}</strong><br/>
                      9th Floor, Logix Cyberpark, Tower-C, Sector 62, Noida, Uttar Pradesh &ndash; 201309, India<br/>
                      +91 98112 63046 &nbsp;&bull;&nbsp;
                      <a href="mailto:contact@bharatxinfratech.com" style="color:${GOLD_LIGHT}; text-decoration:none;">contact@bharatxinfratech.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:14px; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:#9CA3AF; font-size:11px;">
                      This is an automated message from the ${escapeHtml(COMPANY_NAME)} website.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** A single label/value row inside the details table used by both emails. */
export function detailRow(label: string, value: string, opts?: { multiline?: boolean }): string {
  const displayValue = value.trim() ? value : "&mdash;";
  const html = opts?.multiline
    ? escapeMultiline(displayValue === "&mdash;" ? displayValue : value)
    : escapeHtml(displayValue);

  return `
    <tr>
      <td style="padding:12px 16px; background-color:#F9FAFB; border:1px solid ${BORDER}; border-right:none; width:150px; vertical-align:top; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${MUTED}; font-size:13px; font-weight:600;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 16px; background-color:#ffffff; border:1px solid ${BORDER}; vertical-align:top; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${INK}; font-size:14px; line-height:1.6;">
        ${html}
      </td>
    </tr>`;
}

export function detailsTable(rowsHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-bottom:8px;">
    ${rowsHtml}
  </table>`;
}

export const colors = { NAVY, NAVY_SOFT, GOLD, GOLD_LIGHT, INK, MUTED, BORDER, BG };

import type { ContactPayload } from "../types/contact.js";
import { colors, detailRow, detailsTable, escapeHtml, renderEmailShell } from "./layout.js";

export function ownerEmailSubject(payload: ContactPayload): string {
  return `New Enquiry Received — ${payload.name} (${payload.service})`;
}

export function ownerEmailHtml(payload: ContactPayload): string {
  const rows = [
    detailRow("Name", payload.name),
    detailRow("Email", payload.email),
    detailRow("Phone", payload.phone),
    detailRow("Company", payload.company || "—"),
    detailRow("Service", payload.service),
    detailRow("Source", payload.source),
    detailRow("Message", payload.message, { multiline: true }),
  ].join("");

  const bodyHtml = `
    <p style="margin:0 0 20px 0; font-family:'Segoe UI', Helvetica, Arial, sans-serif; color:${colors.INK}; font-size:14px; line-height:1.6;">
      A new enquiry was just submitted on the website. Details are below — reply
      directly to <a href="mailto:${escapeHtml(payload.email)}" style="color:${colors.GOLD_LIGHT}; text-decoration:none; font-weight:600;">${escapeHtml(payload.email)}</a> to respond.
    </p>
    ${detailsTable(rows)}
  `;

  return renderEmailShell({
    preheader: `New enquiry from ${payload.name} — ${payload.service}`,
    eyebrow: "Website Enquiry",
    heading: "New Contact Form Submission",
    bodyHtml,
  });
}

/** Plain-text fallback, sent alongside the HTML version. */
export function ownerEmailText(payload: ContactPayload): string {
  return [
    "New Contact Form Submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || "—"}`,
    `Service: ${payload.service}`,
    `Source: ${payload.source}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

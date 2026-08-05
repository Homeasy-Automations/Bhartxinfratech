import { z } from "zod";

/**
 * Shared payload shape for both the Contact page and the Enquiry page forms.
 * The frontend maps its own field names (e.g. "requirement" / "enquiry")
 * onto `service` before posting, so the backend only has to deal with one shape.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10 digit phone number"),
  company: z.string().trim().optional().default(""),
  service: z.string().trim().optional().default("General Enquiry"),
  message: z.string().trim().min(5, "Message is required"),
  // Lets one backend serve multiple forms on the site (Contact vs Enquiry)
  // while keeping the notification email clearly labeled.
  source: z.string().trim().optional().default("Contact Page"),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/**
 * Shared client for the /api/contact endpoint used by both the Contact page
 * and the Enquiry page. No database on the frontend either — this just
 * posts JSON to the Express + Resend backend.
 */

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  source?: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

// Set VITE_API_URL in .env (and in your Vercel project settings) to your
// Render backend URL, e.g. https://bharatx-infratech-server.onrender.com
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/+$/, "");

export async function submitContactForm(payload: ContactFormPayload): Promise<ContactFormResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Something went wrong. Please try again.",
        fieldErrors: data?.fieldErrors,
      };
    }

    return {
      success: true,
      message: data?.message || "Enquiry submitted successfully.",
    };
  } catch (err) {
    console.error("[contactApi] Network error submitting form:", err);
    return {
      success: false,
      message: "Could not reach the server. Please check your connection and try again.",
    };
  }
}

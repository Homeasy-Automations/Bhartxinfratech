import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

try {
  const response = await resend.domains.list();
  console.log(response);
} catch (err) {
  console.error(err);
}
# BharatX Infratech — Contact Form Backend

A tiny, database-free Express backend for the site's Contact and Enquiry
forms. On every submission it sends two emails via [Resend](https://resend.com):

1. **Owner notification** → `OWNER_EMAIL`, with all submitted details.
2. **Customer confirmation** → the submitter's email, with a summary of what
   they submitted.

No database, no queue — the request is validated, both emails are fired off,
and the response is returned.

## Endpoints

| Method | Path           | Description                              |
|--------|----------------|-------------------------------------------|
| GET    | `/health`      | Health check (used by Render)             |
| POST   | `/api/contact` | Accepts a form submission, sends 2 emails |

### `POST /api/contact` request body

```json
{
  "name": "Ayush Kumar",
  "email": "ayush@gmail.com",
  "phone": "9876543210",
  "company": "ABC Pvt Ltd",
  "service": "Website Development",
  "message": "Need a company website.",
  "source": "Contact Page"
}
```

`company`, `service`, and `source` are optional. `name`, `email`, `phone`
(10 digits), and `message` are required — the server validates with `zod`
and returns `400` with `fieldErrors` if anything is missing/invalid.

### Response

```json
{ "success": true, "message": "Enquiry submitted successfully.", "customerEmailSent": true }
```

If the owner email fails to send, the endpoint returns `502` and the whole
submission is treated as failed. If only the customer confirmation fails
(e.g. domain not yet verified on Resend — see below), the endpoint still
returns `success: true` with `customerEmailSent: false`, since the owner
already has the enquiry.

## Local development

```bash
cd server
npm install
cp .env.example .env   # then fill in RESEND_API_KEY and OWNER_EMAIL
npm run dev            # http://localhost:4000
```

## Environment variables

| Variable          | Required | Description |
|--------------------|----------|-------------|
| `RESEND_API_KEY`   | Yes | From https://resend.com/api-keys |
| `OWNER_EMAIL`      | Yes | Where new-enquiry notifications go |
| `MAIL_FROM`        | No  | Sender address. Defaults to `onboarding@resend.dev` until your domain is verified |
| `FRONTEND_URL`     | Yes (prod) | Comma-separated allowed CORS origins, e.g. `https://bharatxinfratech.com,https://www.bharatxinfratech.com,https://your-app.vercel.app` |
| `SITE_URL`         | No  | Used in email footer, defaults to `https://bharatxinfratech.com` |
| `PORT`             | No  | Defaults to `4000` locally; Render sets this automatically |

### About the Resend sender restriction

Until `bharatxinfratech.com` is **verified as a domain on Resend**:

- You can only send **from** `onboarding@resend.dev`.
- You can only send **to** the email address you signed up to Resend with —
  so the customer-confirmation email (Email #2) will silently fail for real
  customer addresses. This is expected and handled gracefully: the owner
  email still goes through and the API still returns success.

Once the domain is verified (Resend dashboard → Domains → add
`bharatxinfratech.com` → add the DNS records they give you), set:

```
MAIL_FROM=BharatX Infratech <enquiries@bharatxinfratech.com>
```

and both emails will deliver to any address.

## Deploying to Render

1. Push this repo to GitHub (the `server/` folder can live inside the same
   repo as the frontend — Render lets you set a root directory).
2. In Render: **New → Web Service** → connect the repo.
3. **Root Directory**: `server`
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`
6. **Environment**: add `RESEND_API_KEY`, `OWNER_EMAIL`, `MAIL_FROM`,
   `FRONTEND_URL` (see table above). Render provides `PORT` automatically.
7. Deploy. Confirm `GET https://<your-service>.onrender.com/health` returns
   `{"status":"ok"}`.

> Render blocks outbound SMTP on its free/standard tiers — that's why this
> backend uses Resend's HTTP API rather than Nodemailer/SMTP.

## Wiring up the frontend (Vercel)

In the frontend's Vercel project settings, add an environment variable:

```
VITE_API_URL=https://<your-service>.onrender.com
```

Redeploy the frontend. The Contact and Enquiry pages already call
`submitContactForm()` in `src/lib/contactApi.ts`, which reads
`import.meta.env.VITE_API_URL`.

Make sure `FRONTEND_URL` on the Render backend includes **both** the
`www` and non-`www` versions of your production domain, plus your
`*.vercel.app` preview/prod URL if you test against it directly.

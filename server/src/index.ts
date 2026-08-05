import "dotenv/config";
import cors from "cors";
import express from "express";
import { contactRouter } from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Comma-separated list of allowed origins, e.g.:
// "https://bharatxinfratech.com,https://www.bharatxinfratech.com,https://your-app.vercel.app"
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, server-to-server, health checks) with no origin header.
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
  })
);

app.use(express.json({ limit: "100kb" }));

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "bharatx-infratech-server" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", contactRouter);

// Fallback error handler (e.g. CORS rejection, JSON parse errors).
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[server] Unhandled error:", err.message);
  res.status(400).json({ success: false, message: err.message || "Bad request" });
});

app.listen(PORT, () => {
  console.log(`BharatX Infratech server listening on port ${PORT}`);
});

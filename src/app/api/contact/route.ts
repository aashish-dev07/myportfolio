import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Very small fixed-window rate limiter. In-memory, so it resets on redeploy
 * and does not span instances — enough to blunt casual spam on a personal
 * site. Swap for Redis/Upstash if this ever runs behind multiple instances.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many messages in a short time. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill every field, so a value here means silently accept
  // and drop the message rather than telling the bot it was caught.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const payload = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: body.phone ? String(body.phone).trim() : "",
    subject: String(body.subject).trim(),
    message: String(body.message).trim(),
    receivedAt: new Date().toISOString(),
  };

  // Email delivery is opt-in: set the SMTP_* vars in .env.local and messages
  // are mailed to CONTACT_TO. Without them the route still succeeds and logs,
  // so the form works in local development with no configuration.
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO) {
    try {
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(SMTP_PORT ?? 587);

      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: CONTACT_FROM || SMTP_USER,
        to: CONTACT_TO,
        replyTo: `${payload.name} <${payload.email}>`,
        subject: `Portfolio enquiry — ${payload.subject}`,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone || "—"}`,
          `Subject: ${payload.subject}`,
          "",
          payload.message,
        ].join("\n"),
        html: `
          <h2 style="margin:0 0 16px">New portfolio enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(payload.phone) || "—"}</p>
          <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
          <hr />
          <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
        `,
      });
    } catch (err) {
      console.error("[contact] mail delivery failed:", err);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email me directly." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] SMTP not configured — message logged only:", payload);
  }

  return NextResponse.json({ ok: true });
}

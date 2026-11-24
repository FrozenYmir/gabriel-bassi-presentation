import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(140),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes." },
      { status: 429 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your form inputs." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;

  if (apiKey && receiver && !apiKey.startsWith("re_replace")) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [receiver],
        reply_to: parsed.data.email,
        subject: `New Inquiry from ${parsed.data.name}`,
        text: `${parsed.data.name} (${parsed.data.email}):

${parsed.data.message}`,
      }),
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

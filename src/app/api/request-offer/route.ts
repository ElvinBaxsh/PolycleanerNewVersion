import { NextRequest, NextResponse } from "next/server";
import { buildRequestOfferEmail, sendMail, type RequestOfferPayload } from "@/lib/mailer";
import { SALES_EMAILS } from "@/lib/constants";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Partial<RequestOfferPayload> & { website?: string; sourcePage?: string; userLanguage?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot spam protection: real users never fill this hidden field.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const required: (keyof RequestOfferPayload)[] = [
    "fullName",
    "company",
    "country",
    "email",
    "phone",
    "productInterest",
  ];
  const missing = required.filter((field) => !body[field]?.toString().trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!isValidEmail(body.email!)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!body.consent) {
    return NextResponse.json(
      { error: "Please agree to be contacted before submitting." },
      { status: 400 }
    );
  }

  const payload: RequestOfferPayload = {
    fullName: body.fullName!,
    company: body.company!,
    country: body.country!,
    email: body.email!,
    phone: body.phone!,
    productInterest: body.productInterest!,
    requiredVolume: body.requiredVolume,
    application: body.application,
    deliveryDestination: body.deliveryDestination,
    message: body.message,
    consent: Boolean(body.consent),
  };

  const meta = {
    sourcePage: body.sourcePage || request.headers.get("referer") || "unknown",
    submittedAt: new Date().toISOString(),
    userLanguage: body.userLanguage || "EN",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  };

  const { subject, html, text, inlineImages } = buildRequestOfferEmail(payload, meta);

  console.log("[request-offer] New request:", { ...payload, ...meta });

  const result = await sendMail(SALES_EMAILS, subject, html, text, [], inlineImages);

  if (!result.sent && "error" in result) {
    // SMTP was configured but the send itself failed — this is a real error,
    // unlike the "not configured yet" dev-mode case which still returns ok.
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

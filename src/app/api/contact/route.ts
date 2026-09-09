import { NextRequest, NextResponse } from "next/server";
import { buildContactEmail, sendMail, type ContactPayload } from "@/lib/mailer";
import { COMPANY } from "@/lib/constants";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload> & { website?: string; sourcePage?: string; userLanguage?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot spam protection: real users never fill this hidden field.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  // country/phone/message aren't collected by every form on the site (e.g.
  // the Documents page's compact request form only asks for name/company/
  // email/document type), so only these three are enforced universally.
  const required: (keyof ContactPayload)[] = ["fullName", "company", "email"];
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

  const payload: ContactPayload = {
    fullName: body.fullName!,
    company: body.company!,
    country: body.country,
    email: body.email!,
    phone: body.phone,
    productInterest: body.productInterest,
    monthlyVolume: body.monthlyVolume,
    documentType: body.documentType,
    sampleType: body.sampleType,
    application: body.application,
    deliveryDestination: body.deliveryDestination,
    deliveryAddress: body.deliveryAddress,
    courierAccount: body.courierAccount,
    message: body.message,
    inquiryType: body.inquiryType,
    consent: body.consent === undefined ? undefined : Boolean(body.consent),
  };

  const meta = {
    sourcePage: body.sourcePage || request.headers.get("referer") || "unknown",
    submittedAt: new Date().toISOString(),
    userLanguage: body.userLanguage || "EN",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  };

  const { subject, html, text } = buildContactEmail(payload, meta);

  console.log("[contact-form] New inquiry:", { ...payload, ...meta });

  const result = await sendMail(COMPANY.email, subject, html, text);

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

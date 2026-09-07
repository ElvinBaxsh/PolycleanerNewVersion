import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  fullName: string;
  company: string;
  country?: string;
  email: string;
  phone?: string;
  productInterest?: string;
  monthlyVolume?: string;
  documentType?: string;
  inquiryType?: string;
  message?: string;
  website?: string; // honeypot field, must stay empty
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;

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

  // TODO: wire up real delivery once credentials are available, e.g.:
  //   - Resend / SendGrid API to notify sales@polycleaner.com
  //   - or persist to a CRM / Google Sheet
  // For now, log server-side so submissions aren't silently lost during development.
  console.log("[contact-form] New inquiry:", {
    ...body,
    website: undefined,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}

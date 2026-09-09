import { NextRequest, NextResponse } from "next/server";
import { buildContactEmail, sendMail, BUYER_DOCUMENT_ATTACHMENTS, type ContactPayload, type EmailAttachment } from "@/lib/mailer";
import { COMPANY, SALES_EMAILS, MAX_UPLOAD_FILES, MAX_UPLOAD_FILE_SIZE, MAX_UPLOAD_TOTAL_SIZE } from "@/lib/constants";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let fields: Record<string, string>;
  let attachments: EmailAttachment[] = [];

  // Only the Sample form's file field sends multipart/form-data — every
  // other form on the site still posts plain JSON, so both are accepted.
  const isMultipart = (request.headers.get("content-type") || "").includes("multipart/form-data");

  if (isMultipart) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    fields = {};
    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        if (value.size > 0) files.push(value);
      } else {
        fields[key] = value;
      }
    }

    if (files.length > MAX_UPLOAD_FILES) {
      return NextResponse.json({ error: `You can attach up to ${MAX_UPLOAD_FILES} files.` }, { status: 400 });
    }
    const invalidType = files.find((file) => !ALLOWED_TYPES.includes(file.type));
    if (invalidType) {
      return NextResponse.json({ error: "Only images and PDF files can be attached." }, { status: 400 });
    }
    const oversized = files.find((file) => file.size > MAX_UPLOAD_FILE_SIZE);
    if (oversized) {
      return NextResponse.json({ error: "Each attached file must be under 5MB." }, { status: 400 });
    }
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_UPLOAD_TOTAL_SIZE) {
      return NextResponse.json({ error: "Total attachment size must be under 15MB." }, { status: 400 });
    }

    attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name || "attachment",
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || undefined,
      }))
    );
  } else {
    try {
      fields = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
  }

  // Honeypot spam protection: real users never fill this hidden field.
  if (fields.website) {
    return NextResponse.json({ ok: true });
  }

  const isPartner = fields.inquiryType === "partner";

  // The Partner form has its own shape: company is optional, and either an
  // email or a phone number is enough — every other form still requires
  // fullName/company/email as before (country/phone/message aren't
  // collected by every form on the site either, e.g. the Documents page's
  // compact request form only asks for name/company/email/document type).
  const required: (keyof ContactPayload)[] = isPartner ? ["fullName", "country", "city"] : ["fullName", "company", "email"];
  const missing = required.filter((field) => !fields[field]?.toString().trim());

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (isPartner) {
    if (!fields.email?.trim() && !fields.phone?.trim()) {
      return NextResponse.json({ error: "Please provide an email address or phone number." }, { status: 400 });
    }
    if (fields.email?.trim() && !isValidEmail(fields.email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (!fields.partnershipInterest?.trim()) {
      return NextResponse.json({ error: "Missing required fields: partnershipInterest" }, { status: 400 });
    }
  } else if (!isValidEmail(fields.email!)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const payload: ContactPayload = {
    fullName: fields.fullName!,
    company: fields.company,
    country: fields.country,
    city: fields.city,
    email: fields.email,
    phone: fields.phone,
    productInterest: fields.productInterest,
    monthlyVolume: fields.monthlyVolume,
    documentType: fields.documentType,
    sampleType: fields.sampleType,
    application: fields.application,
    deliveryDestination: fields.deliveryDestination,
    deliveryAddress: fields.deliveryAddress,
    courierAccount: fields.courierAccount,
    partnershipInterest: fields.partnershipInterest,
    message: fields.message,
    inquiryType: fields.inquiryType,
    consent: fields.consent === undefined ? undefined : fields.consent === "true" || fields.consent === "on",
  };

  const meta = {
    sourcePage: fields.sourcePage || request.headers.get("referer") || "unknown",
    submittedAt: new Date().toISOString(),
    userLanguage: fields.userLanguage || "EN",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    attachmentNames: attachments.map((a) => a.filename),
  };

  const { subject, html, text } = buildContactEmail(payload, meta);

  console.log("[contact-form] New inquiry:", {
    ...payload,
    sourcePage: meta.sourcePage,
    attachments: meta.attachmentNames,
  });

  // The General/Contact form and Partner enquiries go to the office inbox —
  // Sample, TAROPAK and Buyer Documents/Pack inquiries go to sales instead.
  const OFFICE_INBOX_TYPES = ["general", "partner"];
  const recipients =
    !payload.inquiryType || OFFICE_INBOX_TYPES.includes(payload.inquiryType) ? COMPANY.email : SALES_EMAILS;

  // A "Buyer Documents" request gets the actual PDF files attached,
  // in addition to any customer-uploaded files (there normally aren't any
  // on this particular form, but attachments still merge safely either way).
  const outgoingAttachments =
    payload.inquiryType === "documents" ? [...attachments, ...BUYER_DOCUMENT_ATTACHMENTS] : attachments;

  const result = await sendMail(recipients, subject, html, text, outgoingAttachments);

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

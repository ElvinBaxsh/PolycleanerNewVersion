import { NextRequest, NextResponse } from "next/server";
import { buildContactEmail, sendMail, BUYER_DOCUMENT_ATTACHMENTS, type ContactPayload, type EmailAttachment } from "@/lib/mailer";
import {
  COMPANY,
  SALES_EMAILS,
  MAX_UPLOAD_FILES,
  MAX_UPLOAD_FILE_SIZE,
  MAX_UPLOAD_TOTAL_SIZE,
  hasAllowedUploadExtension,
} from "@/lib/constants";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let fields: Record<string, string>;
  let attachments: EmailAttachment[] = [];

  // Only the sample form sends files (multipart). The rest post JSON.
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
    // Checked by extension: browsers often report no MIME type for .docx and
    // .xlsx.
    const invalidType = files.find((file) => !hasAllowedUploadExtension(file.name));
    if (invalidType) {
      return NextResponse.json(
        { error: "You can attach images, PDF, Word or Excel files." },
        { status: 400 }
      );
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

  // Honeypot: real users never fill this hidden field.
  if (fields.website) {
    return NextResponse.json({ ok: true });
  }

  const isPartner = fields.inquiryType === "partner";

  // The partner form needs less: company is optional, and an email or a phone
  // is enough.
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
    // The reference the sender saw on screen.
    reference: fields.reference,
    attachmentFiles: attachments.map((a) => ({ name: a.filename, size: a.content?.length ?? 0 })),
  };

  const { subject, html, text, inlineImages } = buildContactEmail(payload, meta);

  // General and partner enquiries go to the office inbox, the rest to sales.
  const OFFICE_INBOX_TYPES = ["general", "partner"];
  const recipients =
    !payload.inquiryType || OFFICE_INBOX_TYPES.includes(payload.inquiryType) ? COMPANY.email : SALES_EMAILS;

  // A buyer-documents request gets the PDFs attached.
  const outgoingAttachments =
    payload.inquiryType === "documents" ? [...attachments, ...BUYER_DOCUMENT_ATTACHMENTS] : attachments;

  const result = await sendMail(recipients, subject, html, text, outgoingAttachments, inlineImages);

  // Without SMTP the server log is the only record of the enquiry.
  if (!result.sent && !("error" in result)) {
    console.log("[contact-form] Not emailed:", {
      ...payload,
      sourcePage: meta.sourcePage,
      attachments: meta.attachmentFiles.map((f) => f.name),
    });
  }

  if (!result.sent && "error" in result) {
    // SMTP is set up but sending failed.
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

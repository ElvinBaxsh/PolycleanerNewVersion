import nodemailer from "nodemailer";
import path from "path";
import { BUYER_DOCUMENTS } from "./constants";

// Embedded in the email (cid:) rather than linked, so it always shows.
const LOGO_CID = "polycleaner-logo";
const LOGO_SRC = `cid:${LOGO_CID}`;
// A small copy of the logo for email (376x128, about 21KB).
const LOGO_PATH = path.join(process.cwd(), "public", "images", "mail", "polycleaner-logo.png");

// Section icons: 64px copies of the site icons, embedded like the logo.
const SECTION_ICONS = {
  lead: "corporate-building.png",
  product: "inventory.png",
  buyerDocs: "TraceabilityN.png",
  partnership: "handshake-blue.png",
  message: "inquiry.png",
  attachments: "traceability.png",
  system: "processTransparency.png",
} as const;
type SectionIcon = keyof typeof SECTION_ICONS;

const iconCid = (icon: SectionIcon) => `section-icon-${icon}`;
const iconPath = (icon: SectionIcon) =>
  path.join(process.cwd(), "public", "images", "icons", "mail", SECTION_ICONS[icon]);

// The PDFs are attached rather than linked.
export const BUYER_DOCUMENT_ATTACHMENTS: EmailAttachment[] = BUYER_DOCUMENTS.map((doc) => ({
  filename: doc.file.split("/").pop()!,
  path: path.join(process.cwd(), "public", doc.file),
}));

export interface RequestOfferPayload {
  fullName: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  productInterest: string;
  requiredVolume?: string;
  application?: string;
  deliveryDestination?: string;
  message?: string;
  consent: boolean;
}

export interface RequestOfferMeta {
  sourcePage: string;
  submittedAt: string;
  userLanguage: string;
  ip?: string;
  /** The reference shown to the sender. */
  reference?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Table layout throughout, so it renders in Outlook.

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.round(kb)} KB` : `${(kb / 1024).toFixed(1)} MB`;
}

function infoRow(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:5px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:5px 0;color:#062B3A;font-size:14px;font-weight:700;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

// Renders section cards and records which icons were used, so only those get
// embedded.
function makeSectionRenderer() {
  const usedIcons = new Set<SectionIcon>();

  function sectionCard(icon: SectionIcon, title: string, innerHtml: string) {
    usedIcons.add(icon);
    return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;background:#ffffff;border:1px solid #DDE5E8;border-radius:12px;">
    <tr>
      <td style="padding:18px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td style="width:36px;height:36px;background:#EAF3F7;border-radius:999px;text-align:center;vertical-align:middle;line-height:36px;">
              <img src="cid:${iconCid(icon)}" width="20" height="20" alt="" style="display:inline-block;width:20px;height:20px;vertical-align:middle;border:0;" />
            </td>
            <td style="padding-left:12px;color:#1688B5;font-size:13px;font-weight:700;letter-spacing:.04em;vertical-align:middle;">
              ${escapeHtml(title.toUpperCase())}
            </td>
          </tr>
        </table>
        ${innerHtml}
      </td>
    </tr>
  </table>`;
  }

  function inlineIcons(): EmailAttachment[] {
    return [...usedIcons].map((icon) => ({
      filename: SECTION_ICONS[icon],
      path: iconPath(icon),
      cid: iconCid(icon),
    }));
  }

  return { sectionCard, inlineIcons };
}

export function buildRequestOfferEmail(payload: RequestOfferPayload, meta: RequestOfferMeta) {
  const { sectionCard, inlineIcons } = makeSectionRenderer();
  const subject = `New Request Offer — Poly Cleaner Website — ${payload.company} — ${payload.country}${meta.reference ? ` — ${meta.reference}` : ""}`;

  const leadInfo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Full Name:", payload.fullName)}
      ${infoRow("Company Name:", payload.company)}
      ${infoRow("Country:", payload.country)}
      ${infoRow("Email:", payload.email)}
      ${infoRow("Phone / WhatsApp:", payload.phone)}
    </table>`;

  const productReq = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Product Interest:", payload.productInterest)}
      ${infoRow("Required Volume:", payload.requiredVolume)}
      ${infoRow("Application:", payload.application)}
      ${infoRow("Delivery Destination:", payload.deliveryDestination)}
    </table>`;

  const sourcePageLink = `<a href="${escapeHtml(meta.sourcePage)}" style="color:#1688B5;text-decoration:underline;">${escapeHtml(meta.sourcePage)}</a>`;
  const systemInfo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${meta.reference ? infoRow("Reference:", meta.reference) : ""}
      <tr>
        <td style="padding:5px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">Source Page:</td>
        <td style="padding:5px 0;font-size:14px;font-weight:700;vertical-align:top;">${sourcePageLink}</td>
      </tr>
      ${infoRow("Submission Date:", meta.submittedAt)}
      ${infoRow("User Language:", meta.userLanguage)}
      ${meta.ip ? infoRow("IP Address:", meta.ip) : ""}
      ${infoRow("Consent:", payload.consent ? "Yes" : "No")}
    </table>`;

  const html = `
  <div style="background:#F4F7F8;padding:32px 16px;font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border:1px solid #DDE5E8;border-radius:16px;">
      <tr>
        <td style="background:#062B3A;border-radius:16px 16px 0 0;padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <img src="${LOGO_SRC}" alt="Poly Cleaner" width="188" height="64" style="display:block;width:188px;height:64px;" />
              </td>
              <td style="text-align:right;vertical-align:middle;">
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:700;line-height:1.3;">New rPET Flakes</p>
                <p style="margin:0;color:#4CAF1B;font-size:15px;font-weight:700;line-height:1.3;">Offer Request</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background:#F4F7F8;padding:20px 24px 4px;">
          <p style="margin:0 0 16px;color:#334155;font-size:14px;">
            You have received a new Request Offer from the Poly Cleaner website.
          </p>

          ${sectionCard("lead", "Lead Information", leadInfo)}
          ${sectionCard("product", "Product Requirements", productReq)}
          ${
            payload.message
              ? sectionCard(
                  "message",
                  "Message",
                  `<p style="margin:0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>`
                )
              : ""
          }
          ${sectionCard("system", "System Information", systemInfo)}
        </td>
      </tr>
      <tr>
        <td style="background:#062B3A;border-radius:0 0 16px 16px;padding:18px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <img src="${LOGO_SRC}" alt="Poly Cleaner" width="117" height="40" style="display:block;width:117px;height:40px;" />
              </td>
              <td style="text-align:right;vertical-align:middle;color:#ffffff;font-size:12px;line-height:1.5;">
                office@polycleaner.az<br />www.polycleaner.az
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    "New rPET Flakes Offer Request",
    "",
    "Lead Information",
    `Full Name: ${payload.fullName}`,
    `Company Name: ${payload.company}`,
    `Country: ${payload.country}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone}`,
    "",
    "Product Requirements",
    `Product Interest: ${payload.productInterest}`,
    payload.requiredVolume ? `Required Volume: ${payload.requiredVolume}` : null,
    payload.application ? `Application: ${payload.application}` : null,
    payload.deliveryDestination ? `Delivery Destination: ${payload.deliveryDestination}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
    "",
    "System Information",
    meta.reference ? `Reference: ${meta.reference}` : null,
    `Source Page: ${meta.sourcePage}`,
    `Submission Date: ${meta.submittedAt}`,
    `User Language: ${meta.userLanguage}`,
    meta.ip ? `IP Address: ${meta.ip}` : null,
    `Consent: ${payload.consent ? "Yes" : "No"}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return { subject, html, text, inlineImages: inlineIcons() };
}

export interface ContactPayload {
  fullName: string;
  // Optional for the partner form.
  company?: string;
  country?: string;
  city?: string;
  // Optional: the partner form takes an email or a phone.
  email?: string;
  phone?: string;
  productInterest?: string;
  monthlyVolume?: string;
  documentType?: string;
  sampleType?: string;
  application?: string;
  deliveryDestination?: string;
  deliveryAddress?: string;
  courierAccount?: string;
  partnershipInterest?: string;
  message?: string;
  inquiryType?: string;
  consent?: boolean;
}

export interface ContactMeta {
  sourcePage: string;
  submittedAt: string;
  userLanguage?: string;
  ip?: string;
  /** The reference shown to the sender. */
  reference?: string;
  /** Uploaded files with their sizes. */
  attachmentFiles?: { name: string; size: number }[];
}

// A file attached to the email.
export interface EmailAttachment {
  filename: string;
  /** File content in memory (uploads). */
  content?: Buffer;
  /** Path to a bundled file (the buyer PDFs). */
  path?: string;
  contentType?: string;
  /** For images shown inline via cid:. */
  cid?: string;
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  sample: "Sample Request",
  taropak: "TAROPAK Meeting Request",
  amiExpo: "AMI Expo Meeting Request",
  documents: "Buyer Documents Request",
  general: "General Inquiry",
  partner: "Partnership Request",
};

// One template for every form except Request Offer.
export function buildContactEmail(payload: ContactPayload, meta: ContactMeta) {
  const { sectionCard, inlineIcons } = makeSectionRenderer();
  const kind = INQUIRY_TYPE_LABELS[payload.inquiryType ?? "general"] ?? "General Inquiry";
  const isSample = payload.inquiryType === "sample";
  const isDocuments = payload.inquiryType === "documents";
  const isPartner = payload.inquiryType === "partner";
  const subject = `New ${kind} — Poly Cleaner Website — ${payload.company || payload.fullName}${meta.reference ? ` — ${meta.reference}` : ""}`;

  const leadInfo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Full Name:", payload.fullName)}
      ${infoRow("Company Name:", payload.company)}
      ${infoRow("Country:", payload.country)}
      ${infoRow("City:", payload.city)}
      ${infoRow("Email:", payload.email)}
      ${infoRow("Phone / WhatsApp:", payload.phone)}
    </table>`;

  const partnershipDetails = isPartner
    ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Partnership Interest:", payload.partnershipInterest)}
    </table>`
    : "";

  // Sample requests have their own fields.
  const sampleRequirements = isSample
    ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Product Interest:", payload.productInterest)}
      ${infoRow("Sample Type:", payload.sampleType)}
      ${infoRow("Application:", payload.application)}
      ${infoRow("Delivery Destination:", payload.deliveryDestination)}
      ${infoRow("Delivery Address:", payload.deliveryAddress)}
      ${infoRow("Courier Account:", payload.courierAccount)}
    </table>`
    : "";

  const otherDetails = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Product Interest:", payload.productInterest)}
      ${infoRow("Monthly Volume:", payload.monthlyVolume)}
      ${infoRow("Document Type:", payload.documentType)}
    </table>`;
  const hasOtherDetails = Boolean(payload.productInterest || payload.monthlyVolume || payload.documentType);

  // The PDFs are attached, so this is a plain list.
  const buyerDocumentsList = isDocuments
    ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${BUYER_DOCUMENTS.map(
        (doc) => `
      <tr>
        <td style="padding:5px 0;color:#062B3A;font-size:14px;font-weight:700;">
          &#128206; ${escapeHtml(doc.name)} <span style="color:#64748b;font-weight:400;">(${escapeHtml(doc.format)})</span>
        </td>
      </tr>`
      ).join("")}
    </table>
    <p style="margin:10px 0 0;color:#64748b;font-size:12px;">These documents are attached to this email.</p>`
    : "";

  const sourcePageLink = `<a href="${escapeHtml(meta.sourcePage)}" style="color:#1688B5;text-decoration:underline;">${escapeHtml(meta.sourcePage)}</a>`;
  const systemInfo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${meta.reference ? infoRow("Reference:", meta.reference) : ""}
      <tr>
        <td style="padding:5px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">Source Page:</td>
        <td style="padding:5px 0;font-size:14px;font-weight:700;vertical-align:top;">${sourcePageLink}</td>
      </tr>
      ${infoRow("Submission Date:", meta.submittedAt)}
      ${infoRow("User Language:", meta.userLanguage)}
      ${meta.ip ? infoRow("IP Address:", meta.ip) : ""}
      ${payload.consent !== undefined ? infoRow("Consent:", payload.consent ? "Granted (Privacy Policy Accepted)" : "Not granted") : ""}
    </table>`;

  // Uploaded files get their own card.
  const uploadedFilesList = meta.attachmentFiles?.length
    ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${meta.attachmentFiles
        .map(
          (file) => `
      <tr>
        <td style="padding:6px 0;color:#062B3A;font-size:14px;font-weight:700;">
          &#128206; ${escapeHtml(file.name)}
          <span style="color:#64748b;font-weight:400;">(${escapeHtml(formatBytes(file.size))})</span>
        </td>
      </tr>`
        )
        .join("")}
    </table>
    <p style="margin:10px 0 0;color:#64748b;font-size:12px;">Sent by the customer and attached to this email.</p>`
    : "";

  const html = `
  <div style="background:#F4F7F8;padding:32px 16px;font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border:1px solid #DDE5E8;border-radius:16px;">
      <tr>
        <td style="background:#062B3A;border-radius:16px 16px 0 0;padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <img src="${LOGO_SRC}" alt="Poly Cleaner" width="188" height="64" style="display:block;width:188px;height:64px;" />
              </td>
              <td style="text-align:right;vertical-align:middle;">
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:700;line-height:1.3;">New ${escapeHtml(kind)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background:#F4F7F8;padding:20px 24px 4px;">
          <p style="margin:0 0 16px;color:#334155;font-size:14px;">
            You have received a new ${escapeHtml(kind.toLowerCase())} from the Poly Cleaner website.
          </p>

          ${sectionCard("lead", "Lead Information", leadInfo)}
          ${isSample ? sectionCard("product", "Sample Requirements", sampleRequirements) : ""}
          ${!isSample && hasOtherDetails ? sectionCard("product", "Inquiry Details", otherDetails) : ""}
          ${isDocuments ? sectionCard("buyerDocs", "Buyer Documents", buyerDocumentsList) : ""}
          ${isPartner ? sectionCard("partnership", "Partnership Details", partnershipDetails) : ""}
          ${
            payload.message
              ? sectionCard(
                  "message",
                  "Message",
                  `<p style="margin:0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>`
                )
              : ""
          }
          ${uploadedFilesList ? sectionCard("attachments", "Attachments", uploadedFilesList) : ""}
          ${sectionCard("system", "System Information", systemInfo)}
        </td>
      </tr>
      <tr>
        <td style="background:#062B3A;border-radius:0 0 16px 16px;padding:18px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <img src="${LOGO_SRC}" alt="Poly Cleaner" width="117" height="40" style="display:block;width:117px;height:40px;" />
              </td>
              <td style="text-align:right;vertical-align:middle;color:#ffffff;font-size:12px;line-height:1.5;">
                office@polycleaner.az<br />www.polycleaner.az
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>`;

  const text = [
    `New ${kind}`,
    "",
    "Lead Information",
    `Full Name: ${payload.fullName}`,
    payload.company ? `Company Name: ${payload.company}` : null,
    payload.country ? `Country: ${payload.country}` : null,
    payload.city ? `City: ${payload.city}` : null,
    payload.email ? `Email: ${payload.email}` : null,
    payload.phone ? `Phone / WhatsApp: ${payload.phone}` : null,
    isSample ? "" : null,
    isSample ? "Sample Requirements" : null,
    isSample && payload.productInterest ? `Product Interest: ${payload.productInterest}` : null,
    isSample && payload.sampleType ? `Sample Type: ${payload.sampleType}` : null,
    isSample && payload.application ? `Application: ${payload.application}` : null,
    isSample && payload.deliveryDestination ? `Delivery Destination: ${payload.deliveryDestination}` : null,
    isSample && payload.deliveryAddress ? `Delivery Address: ${payload.deliveryAddress}` : null,
    isSample && payload.courierAccount ? `Courier Account: ${payload.courierAccount}` : null,
    !isSample && hasOtherDetails ? "" : null,
    !isSample && hasOtherDetails ? "Inquiry Details" : null,
    !isSample && payload.productInterest ? `Product Interest: ${payload.productInterest}` : null,
    !isSample && payload.monthlyVolume ? `Monthly Volume: ${payload.monthlyVolume}` : null,
    !isSample && payload.documentType ? `Document Type: ${payload.documentType}` : null,
    isDocuments ? "" : null,
    isDocuments ? "Buyer Documents (attached to this email)" : null,
    ...(isDocuments ? BUYER_DOCUMENTS.map((doc) => `- ${doc.name} (${doc.format})`) : []),
    isPartner ? "" : null,
    isPartner ? "Partnership Details" : null,
    isPartner && payload.partnershipInterest ? `Partnership Interest: ${payload.partnershipInterest}` : null,
    payload.message ? `\nMessage:\n${payload.message}` : null,
    meta.attachmentFiles?.length ? "" : null,
    meta.attachmentFiles?.length ? "Attachments (sent by the customer)" : null,
    ...(meta.attachmentFiles?.map((f) => `- ${f.name} (${formatBytes(f.size)})`) ?? []),
    "",
    "System Information",
    meta.reference ? `Reference: ${meta.reference}` : null,
    `Source Page: ${meta.sourcePage}`,
    `Submission Date: ${meta.submittedAt}`,
    meta.userLanguage ? `User Language: ${meta.userLanguage}` : null,
    meta.ip ? `IP Address: ${meta.ip}` : null,
    payload.consent !== undefined
      ? `Consent: ${payload.consent ? "Granted (Privacy Policy Accepted)" : "Not granted"}`
      : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return { subject, html, text, inlineImages: inlineIcons() };
}

// Sends via SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM).
// Without them it returns { sent: false } instead of throwing.
export async function sendMail(
  to: string | string[],
  subject: string,
  html: string,
  text: string,
  extraAttachments: EmailAttachment[] = [],
  /** Images referenced from the HTML as cid:. */
  inlineImages: EmailAttachment[] = []
) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[mailer] SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS missing) — skipping real send. " +
        "Set these env vars to enable outgoing email. See README."
    );
    return { sent: false as const };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html,
      text,
      attachments: [
        {
          filename: "polycleaner-logo.png",
          path: LOGO_PATH,
          cid: LOGO_CID,
        },
        ...inlineImages,
        ...extraAttachments,
      ],
    });
    return { sent: true as const };
  } catch (error) {
    console.error("[mailer] Failed to send email:", error);
    return { sent: false as const, error };
  }
}

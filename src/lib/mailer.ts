import nodemailer from "nodemailer";
import path from "path";
import { BUYER_DOCUMENTS } from "./constants";

// Embedded as a CID attachment (see sendMail) rather than linked by URL —
// a linked <img src="https://..."> would only render once the site is
// deployed and that path is publicly reachable; an embedded image travels
// with the email itself and works immediately, regardless of deploy status.
const LOGO_CID = "polycleaner-logo";
const LOGO_SRC = `cid:${LOGO_CID}`;
const LOGO_PATH = path.join(process.cwd(), "public", "images", "polycleaner-logonew.png");

// Section badges use the site's own icon set rather than emoji, so the email
// reads as part of the brand instead of a generic template — and so it looks
// identical everywhere (emoji render full-colour in Gmail but flat and
// differently shaped in Outlook). These are 64px copies of the site icons,
// small enough to embed; the originals are ~500px and would be ~6x the weight
// for a badge displayed at 20px. Travelling with the email (cid:) rather than
// hotlinked also means they show before the domain is even live, and they are
// not blocked by the "don't load remote images" default many clients ship.
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

// Same reasoning as the logo above: attaching the actual PDF files (rather
// than linking to /PDF/... on the live site) means a "Buyer Documents"
// request email works immediately, regardless of whether the site has
// been deployed yet.
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
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Table-based layout throughout (not flexbox/grid) so this renders correctly
// in Outlook desktop's Word engine, not just modern webmail clients.

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

/**
 * Builds the section-card renderer for one email, recording which icons it
 * actually used. Only those get embedded: an unreferenced cid: image is shown
 * by some clients as a real attachment, which would clutter the very
 * attachment list this template is trying to keep readable.
 */
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

  /** The embedded copies of exactly the icons this email referenced. */
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
  const subject = `New Request Offer — Poly Cleaner Website — ${payload.company} — ${payload.country}`;

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
  // Optional — the Partner form's "Company / Organisation" field isn't required.
  company?: string;
  country?: string;
  city?: string;
  // Optional (not required) rather than string — the Partner form accepts
  // either an email or a phone number, not necessarily both.
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
  /** Customer-uploaded files, with sizes so the email can show them without
   *  the reader having to open each one to judge what arrived. */
  attachmentFiles?: { name: string; size: number }[];
}

/** A customer-uploaded file (e.g. a reference photo on the Sample form),
 * read fully into memory server-side and passed through to nodemailer. */
export interface EmailAttachment {
  filename: string;
  /** In-memory content (customer file uploads) — mutually exclusive with `path`. */
  content?: Buffer;
  /** A local file path (bundled assets, e.g. the buyer-document PDFs) — mutually exclusive with `content`. */
  path?: string;
  contentType?: string;
  /** Set for images referenced from the HTML as `cid:<value>` — clients render
   *  these inline instead of listing them as downloadable attachments. */
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

/**
 * Covers every non-"Request Offer" form on the site (Request Sample, Book
 * TAROPAK Meeting, the Documents page's buyer-pack form, and the general
 * contact form) — one shared template since they're all a subset of the
 * same handful of fields, distinguished by `inquiryType`.
 */
export function buildContactEmail(payload: ContactPayload, meta: ContactMeta) {
  const { sectionCard, inlineIcons } = makeSectionRenderer();
  const kind = INQUIRY_TYPE_LABELS[payload.inquiryType ?? "general"] ?? "General Inquiry";
  const isSample = payload.inquiryType === "sample";
  const isDocuments = payload.inquiryType === "documents";
  const isPartner = payload.inquiryType === "partner";
  const subject = `New ${kind} — Poly Cleaner Website — ${payload.company || payload.fullName}`;

  const leadInfo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Full Name:", payload.fullName)}
      ${infoRow("Company Name:", payload.company)}
      ${infoRow("Country:", payload.country)}
      ${infoRow("City:", payload.city)}
      ${infoRow("Email:", payload.email)}
      ${infoRow("Phone / WhatsApp:", payload.phone)}
    </table>`;

  // The Partner form doesn't collect Product Interest / Monthly Volume /
  // Document Type — Partnership Interest is its own thing, own section.
  const partnershipDetails = isPartner
    ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Partnership Interest:", payload.partnershipInterest)}
    </table>`
    : "";

  // Sample requests carry their own set of fields (sample type, application,
  // delivery address, courier account) that don't apply to other inquiry
  // types, so they get a dedicated section instead of the generic one below.
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

  // The 4 buyer-document PDFs are attached to this email (see sendMail /
  // BUYER_DOCUMENT_ATTACHMENTS) rather than linked — a cid: link in an <a
  // href> isn't reliably clickable-to-open across email clients the way
  // cid: works for inline <img>, so this is a plain list, not fake buttons.
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
      <tr>
        <td style="padding:5px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">Source Page:</td>
        <td style="padding:5px 0;font-size:14px;font-weight:700;vertical-align:top;">${sourcePageLink}</td>
      </tr>
      ${infoRow("Submission Date:", meta.submittedAt)}
      ${infoRow("User Language:", meta.userLanguage)}
      ${meta.ip ? infoRow("IP Address:", meta.ip) : ""}
      ${payload.consent !== undefined ? infoRow("Consent:", payload.consent ? "Granted (Privacy Policy Accepted)" : "Not granted") : ""}
    </table>`;

  // The files the customer sent are the part of the email someone actually
  // acts on, so they get their own card instead of being a comma-joined row
  // buried under the IP address and the submission timestamp.
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
    // Mirrors the HTML: the customer's files are their own block, above the
    // technical metadata rather than a row buried inside it.
    meta.attachmentFiles?.length ? "" : null,
    meta.attachmentFiles?.length ? "Attachments (sent by the customer)" : null,
    ...(meta.attachmentFiles?.map((f) => `- ${f.name} (${formatBytes(f.size)})`) ?? []),
    "",
    "System Information",
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

/**
 * Sends via SMTP using env vars (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
 * SMTP_FROM). Returns { sent: false } instead of throwing when SMTP isn't
 * configured yet, so local/dev submissions still succeed (logged to the
 * console) while the real send path is ready for production credentials.
 */
export async function sendMail(
  to: string | string[],
  subject: string,
  html: string,
  text: string,
  extraAttachments: EmailAttachment[] = [],
  /** Images the HTML references as `cid:` — the section badges, from the
   *  builder's `inlineImages`. Shown inline, not listed as attachments. */
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
    // nodemailer sets charset=utf-8 on the html/text MIME parts automatically
    // whenever the content requires it — no extra options needed here.
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

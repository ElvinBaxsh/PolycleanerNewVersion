import nodemailer from "nodemailer";
import path from "path";

// Embedded as a CID attachment (see sendMail) rather than linked by URL —
// a linked <img src="https://..."> would only render once the site is
// deployed and that path is publicly reachable; an embedded image travels
// with the email itself and works immediately, regardless of deploy status.
const LOGO_CID = "polycleaner-logo";
const LOGO_SRC = `cid:${LOGO_CID}`;
const LOGO_PATH = path.join(process.cwd(), "public", "images", "polycleaner-logonew.png");

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

function infoRow(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:5px 0;color:#64748b;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:5px 0;color:#062B3A;font-size:14px;font-weight:700;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function sectionCard(icon: string, title: string, innerHtml: string) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;background:#ffffff;border:1px solid #DDE5E8;border-radius:12px;">
    <tr>
      <td style="padding:18px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td style="width:34px;height:34px;background:#1688B5;border-radius:999px;text-align:center;vertical-align:middle;font-size:17px;line-height:34px;">
              ${icon}
            </td>
            <td style="padding-left:12px;color:#1688B5;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;vertical-align:middle;">
              ${title}
            </td>
          </tr>
        </table>
        ${innerHtml}
      </td>
    </tr>
  </table>`;
}

export function buildRequestOfferEmail(payload: RequestOfferPayload, meta: RequestOfferMeta) {
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

          ${sectionCard("&#128100;", "Lead Information", leadInfo)}
          ${sectionCard("&#128230;", "Product Requirements", productReq)}
          ${
            payload.message
              ? sectionCard(
                  "&#128172;",
                  "Message",
                  `<p style="margin:0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>`
                )
              : ""
          }
          ${sectionCard("&#9881;", "System Information", systemInfo)}
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

  return { subject, html, text };
}

export interface ContactPayload {
  fullName: string;
  company: string;
  country?: string;
  email: string;
  phone?: string;
  productInterest?: string;
  monthlyVolume?: string;
  documentType?: string;
  sampleType?: string;
  application?: string;
  deliveryDestination?: string;
  deliveryAddress?: string;
  courierAccount?: string;
  message?: string;
  inquiryType?: string;
  consent?: boolean;
}

export interface ContactMeta {
  sourcePage: string;
  submittedAt: string;
  userLanguage?: string;
  ip?: string;
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  sample: "Sample Request",
  taropak: "TAROPAK Meeting Request",
  documents: "Buyer Documents Request",
  general: "General Inquiry",
};

/**
 * Covers every non-"Request Offer" form on the site (Request Sample, Book
 * TAROPAK Meeting, the Documents page's buyer-pack form, and the general
 * contact form) — one shared template since they're all a subset of the
 * same handful of fields, distinguished by `inquiryType`.
 */
export function buildContactEmail(payload: ContactPayload, meta: ContactMeta) {
  const kind = INQUIRY_TYPE_LABELS[payload.inquiryType ?? "general"] ?? "General Inquiry";
  const isSample = payload.inquiryType === "sample";
  const subject = `New ${kind} — Poly Cleaner Website — ${payload.company}`;

  const leadInfo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${infoRow("Full Name:", payload.fullName)}
      ${infoRow("Company Name:", payload.company)}
      ${infoRow("Country:", payload.country)}
      ${infoRow("Email:", payload.email)}
      ${infoRow("Phone / WhatsApp:", payload.phone)}
    </table>`;

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

          ${sectionCard("&#128100;", "Lead Information", leadInfo)}
          ${isSample ? sectionCard("&#128230;", "Sample Requirements", sampleRequirements) : ""}
          ${!isSample && hasOtherDetails ? sectionCard("&#128230;", "Inquiry Details", otherDetails) : ""}
          ${
            payload.message
              ? sectionCard(
                  "&#128172;",
                  "Message",
                  `<p style="margin:0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>`
                )
              : ""
          }
          ${sectionCard("&#9881;", "System Information", systemInfo)}
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
    `Company Name: ${payload.company}`,
    payload.country ? `Country: ${payload.country}` : null,
    `Email: ${payload.email}`,
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
    payload.message ? `\nMessage:\n${payload.message}` : null,
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

  return { subject, html, text };
}

/**
 * Sends via SMTP using env vars (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
 * SMTP_FROM). Returns { sent: false } instead of throwing when SMTP isn't
 * configured yet, so local/dev submissions still succeed (logged to the
 * console) while the real send path is ready for production credentials.
 */
export async function sendMail(to: string | string[], subject: string, html: string, text: string) {
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
      ],
    });
    return { sent: true as const };
  } catch (error) {
    console.error("[mailer] Failed to send email:", error);
    return { sent: false as const, error };
  }
}

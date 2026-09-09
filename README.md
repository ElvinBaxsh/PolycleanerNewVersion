# Poly Cleaner — Website (Next.js)

Rebuild of the Poly Cleaner marketing site (rPET flakes producer/exporter) as a Next.js
App Router project, following the supplied design brief (`Poly Cleaner Website Redesign
Texniki Tapşırıq.docx`) and the approved page designs (Home, About Us, rPET Flakes,
Process & Quality, Sustainability, Contact — Documents built to the brief's spec since no
mockup was supplied for it).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — brand tokens defined in `src/app/globals.css` (`@theme inline`)
- **lucide-react** for line-style icons (per brief: line icons, blue/green accents only)
- **next/font** — Quicksand (brief's primary font) self-hosted via Google Fonts, no layout shift

Chosen for SEO: file-based routing gives clean per-page metadata, static generation for every
marketing page (`sitemap.ts` / `robots.ts` included), and no client-side-only rendering on
content pages.

## Project Structure

```
src/
  app/                      Route segments (one folder per page)
    page.tsx                Home
    about/page.tsx
    rpet-flakes/page.tsx
    process-quality/page.tsx
    sustainability/page.tsx
    documents/page.tsx
    contact/page.tsx         reads ?type= / ?interest= to prefill the form
    api/contact/route.ts         generic inquiry endpoint (Sample/TAROPAK/Documents/Contact)
    api/request-offer/route.ts   dedicated Request Offer endpoint — sends a structured email
    sitemap.ts, robots.ts    SEO
    layout.tsx, globals.css  global shell, fonts, color tokens
  components/
    layout/                 Header, Footer, Logo
    ui/                     Button, Container, SectionHeading, IconBadge, PhotoPlaceholder...
    inquiry/                global modal system (see below) — every CTA site-wide opens this
    forms/
      InquiryForm.tsx        generic form used by Sample/TAROPAK/Documents/Contact-Sales CTAs
      RequestOfferForm.tsx   dedicated Request Offer form (its own field set, its own endpoint)
    sections/               page sections, grouped by page (home/, about/, rpet/, process/,
                             sustainability/, contact/, documents/) plus cross-page sections
                             (TrustBar, ProcessStrip, BuyerDocuments, TaropakBanner, FinalCta,
                             PageHero) used on 2+ pages
  lib/
    constants.ts            all site copy/data — edit content here first
    mailer.ts               nodemailer transport + the Request Offer HTML email template
    analytics.ts            trackEvent() — pushes to window.dataLayer for GTM/GA4
```

### The inquiry modal system

Every "Request Offer / Sample / Book Meeting / Request Document Pack / Contact Sales"
button on the site (`InquiryButton`, or `PageHero`'s `cta` prop with `inquiryType`) opens the
same modal (`components/inquiry/InquiryModal.tsx`) instead of navigating away. The modal
renders one of two forms depending on which button was clicked:

- **`type="offer"`** → `RequestOfferForm` — the dedicated flow specified for the sales team
  (Product Interest / Required Volume / Application / Delivery Destination fields, its own
  copy, its own `/api/request-offer` endpoint, its own GA events).
- Anything else (`sample`, `taropak`, `documents`, `general`) → the shared `InquiryForm` →
  `/api/contact`.

## Design tokens (from the brief)

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#062B3A` | header, footer, hero overlay |
| `teal` | `#073342` | hero gradient end |
| `brand-green` | `#4CAF1B` | primary buttons, active nav underline |
| `brand-green-dark` | `#378A16` | button hover |
| `brand-blue` | `#1688B5` | technical/process icons |
| `charcoal` / `slate` | `#1F2323` / `#334155` | text |
| `soft-gray` | `#F4F7F8` | alternating section backgrounds |
| `border` | `#DDE5E8` | card/table borders |

Typography scale, spacing, radii and button/card specs from section 3–4 of the brief are
implemented as Tailwind utility values inline in components (no separate design-token file
was needed at this size).

## What's implemented vs. what's stubbed

- **Request Offer form**: fully wired end to end per the client's technical brief for that
  flow — validation (client + server), honeypot spam protection, loading state, success/error
  states, a structured HTML email (`src/lib/mailer.ts`) sent via SMTP (`nodemailer`), and
  `request_offer_open/submit/success/error` GA/GTM events. **Email sending needs real SMTP
  credentials** — copy `.env.example` to `.env.local` and fill in `SMTP_HOST` / `SMTP_USER` /
  `SMTP_PASS`. Without them, submissions still succeed and are logged to the server console
  (so the form never appears "broken" in dev), but no email actually goes out. The receiving
  address is `OFFER_SALES_EMAIL` in `src/lib/constants.ts` (currently `info@polycleaner.az`
  per the brief) — swap it once the live sales inbox is confirmed.
- **Other forms** (Sample / TAROPAK Meeting / Document Pack / Contact Sales) post to
  `/api/contact`, which validates and logs server-side but has no SMTP wired up yet — reuse
  the same `sendMail()` helper from `src/lib/mailer.ts` there if/when needed.
- **Spam protection**: honeypot field on both forms. reCAPTCHA/Turnstile was in the brief as
  an option but needs a site key from an account that doesn't exist yet — not added.
- **GA/GTM**: `trackEvent()` (`src/lib/analytics.ts`) pushes to `window.dataLayer`, which is
  the standard pattern GTM reads from — but no GTM container snippet is installed yet (no ID
  supplied). Once you have one, add it to `layout.tsx` and the Request Offer events will
  already be flowing.
- **Photography**: the brief asks to avoid stock photos and use real Poly Cleaner material
  (production line, flakes, facility, etc.). Since none was supplied, every photo slot uses a
  `PhotoPlaceholder` component (labelled, brand-colored placeholder) so real photos can be
  dropped in later without restructuring layout. Search the codebase for `PhotoPlaceholder` to
  find every slot and its intended subject.
- **Hero video**: the homepage has a working play-button UI over a placeholder; no video file
  was supplied, so it doesn't open an actual player yet.
- **Multi-language**: brief specifies English first, then AZ/RU/TR later — the site is
  English-only for now with no i18n routing scaffolded (including the Request Offer modal,
  whose brief included AZ copy — only the EN copy is wired up).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build — verified passing (all pages static except /contact and /api)
npm run lint    # ESLint — clean
```

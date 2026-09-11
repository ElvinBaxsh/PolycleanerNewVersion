import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, COMPANY } from "./constants";
import { localizePath } from "./i18n/localizePath";
import type { Locale } from "./i18n/translations";

// The preview card's image has its tagline baked into the pixels, so each
// language gets its own file. The Azerbaijani one is the English design
// with only the two text lines replaced, worded as on the site itself
// (home hero + trust bar in translations.ts).
const OG_IMAGE: Record<Locale, string> = {
  en: "/images/og-image.png",
  az: "/images/og-image-az.png",
};
const OG_IMAGE_SIZE = { width: 1200, height: 630 };
const OG_LOCALE: Record<Locale, string> = { en: "en_US", az: "az_AZ" };

/**
 * The complete metadata for one page, built from its path and locale.
 *
 * Every page used to spell out its own title/description/alternates and
 * none set openGraph or twitter at all — so each one inherited the root
 * layout's, and a shared link to any page (in either language) previewed
 * as the English homepage: same title, same description, og:url pointing
 * at "/". Next merges metadata one key deep, so a page that sets openGraph
 * must set all of it; building it here keeps the social preview, the
 * <title>, the canonical and the hreflang pair from drifting apart.
 *
 * `path` is the English path ("/about"); the Azerbaijani one is derived.
 * `title` is the final <title> text — it bypasses the layout's template.
 */
export function pageMetadata({
  path,
  locale,
  title,
  description,
}: {
  path: string;
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const canonical = localizePath(path, locale);
  const enUrl = `${SITE_URL}${path}`;
  const azUrl = `${SITE_URL}${localizePath(path, "az")}`;
  const otherLocale: Locale = locale === "en" ? "az" : "en";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: { en: enUrl, az: azUrl, "x-default": enUrl },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: locale === "en" ? enUrl : azUrl,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: [OG_LOCALE[otherLocale]],
      images: [{ url: OG_IMAGE[locale], ...OG_IMAGE_SIZE, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE[locale]],
    },
  };
}

/**
 * Structured data stays in English on both locales: it describes the one
 * organization, and search engines read it as data rather than as page
 * copy. A localized variant for /az is a possible follow-up, not a gap.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    description:
      "Poly Cleaner supplies consistently processed, fully documented hot washed rPET flakes for sheet, strap, fiber and non-food packaging applications, exported worldwide from Azerbaijan.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/polycleaner-logonew.png`,
    image: `${SITE_URL}/images/polycleaner-logonew.png`,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address,
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.coordinates.lat,
      longitude: COMPANY.coordinates.lng,
    },
    hasMap: `https://www.openstreetmap.org/?mlat=${COMPANY.coordinates.lat}&mlon=${COMPANY.coordinates.lng}#map=17/${COMPANY.coordinates.lat}/${COMPANY.coordinates.lng}`,
    areaServed: "Worldwide",
    knowsLanguage: ["en", "az", "ru", "tr"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      areaServed: "Worldwide",
      availableLanguage: ["English", "Azerbaijani", "Russian", "Turkish"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

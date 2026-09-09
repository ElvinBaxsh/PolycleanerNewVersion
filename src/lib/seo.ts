import { SITE_URL, SITE_NAME, COMPANY } from "./constants";

/**
 * Structured data is emitted with static English copy regardless of the
 * visitor's selected UI language: the site's i18n is client-side only (see
 * LanguageContext), so crawlers only ever see the English strings baked
 * into the server-rendered HTML anyway — matching that here keeps the
 * schema consistent with what search engines actually index.
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

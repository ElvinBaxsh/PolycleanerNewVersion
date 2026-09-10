export const SITE_URL = "https://polycleaner.az";
export const SITE_NAME = "Poly Cleaner";

export const COMPANY = {
  name: "Poly Cleaner",
  tagline: "From Waste to Value",
  email: "office@polycleaner.az",
  phone: "+994 55 257 54 54",
  whatsappNumber: "994552575454",
  address: "Balakhani Industrial Park, 1th zone",
  // Facility location — FW63+JX, Baku, Azerbaijan.
  coordinates: { lat: 40.46201514558341, lng: 49.905589297413826 },
  languages: ["English", "Russian", "Turkish", "Azerbaijani"],
};

// Where form submissions are routed internally. Request Offer, Request
// Sample, Book TAROPAK Meeting and Request Buyer Documents/Pack all go to
// the sales inboxes; only the General/Contact form goes to COMPANY.email.
export const SALES_EMAILS = ["sales@polycleaner.az", "telmannadjafov@polycleaner.az"];

// Shared by the client-side FileUpload widget and the /api/contact route's
// server-side check, so the two can't silently drift apart.
export const MAX_UPLOAD_FILES = 3;
export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
export const MAX_UPLOAD_TOTAL_SIZE = 15 * 1024 * 1024; // 15MB combined

// What a buyer may attach. Office formats are here because specifications
// arrive as .xlsx and purchase orders as .docx at least as often as PDFs;
// archives (.zip) are deliberately left out — they carry real risk into the
// sales inbox and a buyer can always attach the files themselves.
//
// The extension is what actually gets enforced. A browser's reported MIME
// type is unreliable for Office files in particular — Windows without Office
// installed reports "application/octet-stream" or an empty string for a
// perfectly valid .xlsx — so rejecting on MIME alone would turn away real
// customers. The MIME list below only steers the OS file picker.
export const ALLOWED_UPLOAD_EXTENSIONS = [
  ".jpg", ".jpeg", ".png", ".webp", ".gif",
  ".pdf",
  ".doc", ".docx",
  ".xls", ".xlsx",
];

export const ALLOWED_UPLOAD_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

/** For an <input type="file"> `accept` attribute. */
export const UPLOAD_ACCEPT_ATTRIBUTE = [...ALLOWED_UPLOAD_MIME_TYPES, ...ALLOWED_UPLOAD_EXTENSIONS].join(",");

export function hasAllowedUploadExtension(filename: string) {
  const lower = filename.toLowerCase();
  return ALLOWED_UPLOAD_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export const OFFER_PRODUCT_INTEREST_OPTIONS = [
  "Transparent / Clear rPET Flakes",
  "Light Blue rPET Flakes",
  "Green rPET Flakes",
  "Mixed Color rPET Flakes",
  "Multiple Products",
  "Not sure yet",
];

export const OFFER_VOLUME_OPTIONS = [
  "Sample only",
  "1–5 MT",
  "20–25 MT Trial Order",
  "50–100 MT",
  "Regular monthly supply",
  "Other",
];

export const OFFER_APPLICATION_OPTIONS = [
  "Sheet / Thermoforming",
  "Strap",
  "Fiber",
  "Food Packaging",
  "Non-food Packaging",
  "Trading / Distribution",
  "Other",
];

export const SAMPLE_TYPE_OPTIONS = [
  "500g Sample",
  "1kg Sample",
  "2kg Sample",
  "5kg Sample",
  "Custom Quantity",
];

export const PARTNERSHIP_INTEREST_OPTIONS = [
  "PET Bottle Supply",
  "Collection Partnership",
  "Logistics & Transportation",
  "Distribution & Sales Partnership",
  "Other Partnership",
];

export const COUNTRY_OPTIONS = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bosnia and Herzegovina",
  "Brazil", "Bulgaria", "Canada", "China", "Croatia", "Cyprus", "Czech Republic", "Denmark",
  "Egypt", "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany", "Ghana",
  "Greece", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia",
  "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Moldova",
  "Montenegro", "Morocco", "Netherlands", "New Zealand", "Nigeria", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa",
  "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uzbekistan",
  "Vietnam", "Yemen", "Other",
];

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "rPET Flakes", href: "/rpet-flakes" },
  { label: "Process & Quality", href: "/process-quality" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_PRODUCT_LINKS: NavLink[] = [
  { label: "Transparent", href: "/rpet-flakes#transparent" },
  { label: "Light Blue", href: "/rpet-flakes#light-blue" },
  { label: "Green", href: "/rpet-flakes#green" },
  { label: "Mixed Colors", href: "/rpet-flakes#mixed-colors" },
  { label: "Custom Specifications", href: "/contact?interest=custom-specification" },
];

export const FOOTER_INFO_LINKS: NavLink[] = [
  { label: "Quality Assurance", href: "/process-quality" },
  { label: "Certificates", href: "/documents" },
  { label: "Logistics & Shipping", href: "/process-quality#how-we-work" },
  { label: "Payments", href: "/documents" },
  { label: "FAQ", href: "/documents#faq" },
];

export const TAROPAK_EVENT = {
  name: "TAROPAK 2026",
  dates: "23–25 September 2026",
  location: "Poznań, Poland",
};

export const AMI_EXPO_EVENT = {
  // Non-breaking space before "2026" — the AZ translation appends a
  // suffix directly onto the year ("2026-də"), and without this a line
  // break could land between "EU" and "2026-də", splitting the edition
  // year from the event name awkwardly.
  name: "Compounding & Recycling Expo EU 2026",
  dates: "23–24 September 2026",
  location: "Frankfurt, Germany",
};

export const PRODUCT_GRADES = [
  {
    slug: "transparent",
    name: "Transparent",
    description: "For sheet, thermoforming and general applications.",
    swatch: "#eef2f2",
    image: "/images/transparent.jpg",
  },
  {
    slug: "light-blue",
    name: "Light Blue",
    description: "For sheet, strapping, thermoforming.",
    swatch: "#bfe1ea",
    image: "/images/lightBlue.jpg",
  },
  {
    slug: "green",
    name: "Green",
    description: "For strap, sheet, general applications.",
    swatch: "#4caf1b",
    image: "/images/green.jpg",
  },
  {
    slug: "mixed-colors",
    name: "Mixed Colors",
    description: "For fiber, non-food packaging, others.",
    swatch: "#9aa7ad",
    image: "/images/mixedColors.jpg",
  },
];

export const PROCESS_STEPS = [
  { name: "Collection", description: "Post-consumer PET bottles are collected from trusted sources." },
  { name: "Sorting", description: "Bottles are sorted by color and material; labels and contaminants removed." },
  { name: "Washing", description: "Hot wash with eco-friendly detergents to remove dirt, glue and residues." },
  { name: "Drying", description: "Centrifugal and thermal drying to reach optimal moisture." },
  { name: "Quality Control", description: "In-process and final inspection to ensure consistent quality." },
  { name: "Packing & Loading", description: "Flakes are packed in bulk bags and loaded for worldwide shipment." },
];

export const SPEC_TABLE = [
  { label: "Flake Size", value: "8–14 mm (customizable)" },
  { label: "Moisture", value: "≤ 1.0%" },
  { label: "Contamination", value: "≤ 100 ppm (PVC, labels, other plastics)" },
  { label: "Packing", value: "1,100 kg Jumbo Bags" },
  { label: "Loading", value: "20–22 MT per 20' FCL / 24–26 MT per 40' HC" },
  { label: "Applications", value: "Sheet, strap, fiber, non-food packaging, trading" },
];

export const PRODUCT_INFO = [
  { label: "Raw Material", value: "Post-consumer PET bottles (bales)" },
  { label: "Process", value: "Hot washing, friction washing, rinsing, drying, sorting, metal detection" },
  { label: "Quality Control", value: "In-house lab testing for every batch" },
  { label: "Origin", value: "Azerbaijan" },
  { label: "Certification", value: "REACH Compliant (upon request)" },
  { label: "HS Code", value: "3915.10" },
];

export const BUYER_DOCUMENTS = [
  { name: "Company Profile", format: "PDF", file: "/PDF/company-profile.pdf" },
  { name: "Product Offer Sheet", format: "PDF", file: "/PDF/product-offer-sheet.pdf" },
  { name: "Technical Data Sheet", format: "PDF", file: "/PDF/technical-data-sheet.pdf" },
  { name: "Traceability Note", format: "PDF", file: "/PDF/traceability-note.pdf" },
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: "Sustainability",
    description: "We reduce plastic waste and support circular economy by turning used bottles into valuable raw materials.",
  },
  {
    title: "Quality Assurance",
    description: "Every batch is controlled to support consistent quality and customer confidence.",
  },
  {
    title: "Global Partnership",
    description: "We build long-term partnerships with manufacturers, recyclers and traders.",
  },
  {
    title: "Fast & Reliable",
    description: "Flexible logistics, clear documentation and responsive sales support.",
  },
  {
    title: "Experienced Team",
    description: "Professional team with recycling and export experience.",
  },
];

export const PRODUCT_INTERESTS = [
  "Transparent rPET Flakes",
  "Light Blue rPET Flakes",
  "Green rPET Flakes",
  "Mixed Colors rPET Flakes",
  "Custom Specification",
  "General Inquiry",
];

export const INQUIRY_TYPES = [
  { value: "offer", label: "Request rPET Flakes Offer" },
  { value: "sample", label: "Request Sample" },
  { value: "taropak", label: "Book TAROPAK Meeting" },
  { value: "documents", label: "Request Buyer Documents" },
  { value: "general", label: "General / Contact Sales" },
];

export const ABOUT_PROCESS_STEPS = [
  { name: "Collection", description: "Post-consumer PET bottles are collected from trusted sources." },
  { name: "Sorting", description: "Bottles are sorted by color and material; labels and contaminants removed." },
  { name: "Shredding", description: "Bottles are shredded into uniform flakes for further processing." },
  { name: "Hot Washing", description: "Hot wash with eco-friendly detergents to remove dirt, glue and residues." },
  { name: "Drying", description: "Centrifugal and thermal drying to reach optimal moisture." },
  { name: "Quality Control", description: "In-process and final inspection to ensure consistent quality." },
  { name: "Packing & Loading", description: "Flakes are packed in bulk bags and loaded for worldwide shipment." },
];

export const COMPANY_VALUES = [
  { title: "Value from Waste", description: "We turn post-consumer PET waste into high quality flakes that power a circular economy." },
  { title: "Reliability", description: "Consistent quality, on-time delivery and transparent communication build lasting partnerships." },
  { title: "Sustainability", description: "Energy-efficient operations and responsible resource management to reduce environmental impact." },
  { title: "Traceability", description: "From bottle to flakes — every lot is documented, tested and fully traceable." },
];

export const COMPANY_NUMBERS = [
  { value: "10,000+ m²", label: "Production Facility (Balakhani Industrial Park)" },
  { value: "30,000+", label: "MT Annual Production Capacity" },
  { value: "15+", label: "Quality Tests on Every Batch" },
  { value: "20+", label: "Countries Supplied" },
  { value: "50+", label: "Dedicated Team Members" },
];

export const WHY_PARTNER_ITEMS = [
  { title: "Consistent Quality", description: "Advanced hot wash process and rigorous QC ensure clean, low-contamination rPET flakes." },
  { title: "Export Ready", description: "Packaging, documentation and logistics support for smooth international shipments." },
  { title: "Flexible Solutions", description: "Multiple flake colors and custom specifications to match your production requirements." },
  { title: "Customer Focused", description: "Responsive service and technical support before, during and after delivery." },
];

export const APPLICATIONS = [
  { name: "Sheet", description: "Thermoformed sheets & trays" },
  { name: "Strap", description: "Strapping & banding" },
  { name: "Fiber", description: "Polyester staple fiber & nonwoven" },
  { name: "Non-Food Packaging", description: "Bottles, jars, boxes & rigid packaging" },
  { name: "Trading / Distribution", description: "Global trading and resale" },
];

export const PROCESS_CAPABILITIES = [
  "Advanced sorting and color separation lines",
  "Multi-stage hot washing system",
  "High-efficiency friction & floating sink separation",
  "Automated drying and air classification",
  "Metal detection and final inspection",
  "Bulk packing in 1100–1250 kg big bags",
  "Daily production with strict process control",
];

export const QUALITY_CONTROL = [
  "Moisture content testing",
  "PVC, labels & glue content analysis",
  "Color and visual inspection",
  "Contamination and foreign material check",
  "Batch traceability from input to shipment",
  "COA (Certificate of Analysis) for every shipment",
  "Full export documentation support",
];

export const QA_PILLARS = [
  { title: "Consistent Quality", description: "Standardized processes and advanced equipment ensure stable, high-quality rPET flakes batch after batch." },
  { title: "Traceable Operations", description: "End-to-end traceability from collection to shipment for complete visibility and accountability." },
  { title: "Export Documentation", description: "Commercial and shipping documents are prepared for international trade." },
  { title: "Process Transparency", description: "Open communication and clear data to build long-term trust with our global partners." },
];

export const KEY_SPECS = [
  { value: "≤ 1.0%", label: "Moisture" },
  { value: "≤ 100 ppm", label: "PVC Content" },
  { value: "≤ 30 ppm", label: "Labels & Glue" },
  { value: "≤ 300 ppm", label: "Other Plastics" },
  { value: "100%", label: "Sorted Feedstock" },
  { value: "1100–1250 kg", label: "Packaging (Big Bags)" },
  { value: "Transparent, Light Blue, Green, Mixed", label: "Color Options" },
];

export const HOW_WE_WORK = [
  { title: "Inquiry", description: "Share your requirements and target specifications." },
  { title: "Offer & Samples", description: "We provide offer and arrange sample for approval." },
  { title: "Order Confirmation", description: "Confirm order, specs, packaging and delivery schedule." },
  { title: "Production & QC", description: "We produce with strict quality control at every stage." },
  { title: "Shipping", description: "On-time shipment with complete export documents." },
  { title: "After-Sales Support", description: "We stay with you for ongoing support and long-term partnership." },
];

export const SUSTAINABILITY_PILLARS = [
  { title: "Sustainable Sourcing", description: "We prioritize responsible sourcing of post-consumer PET to protect natural resources." },
  { title: "Innovation & Efficiency", description: "We continuously improve our processes to use less energy, less water, and generate less waste." },
  { title: "People & Safety", description: "Our team's well-being and safety are fundamental to our sustainable growth." },
  { title: "Partnerships", description: "We work with suppliers, customers and communities to build a stronger and more responsible value chain." },
  { title: "Transparency", description: "We provide clear, verifiable information so our partners can make confident, sustainable choices." },
];

export const SUSTAINABILITY_STEPS = [
  { name: "Collection", description: "Post-consumer PET bottles are collected." },
  { name: "Sorting", description: "Bottles are sorted by color and type." },
  { name: "Washing", description: "Hot washing removes labels, glue and dirt." },
  { name: "Drying", description: "Moisture is removed for clean flakes." },
  { name: "Flaking", description: "Bottles are shredded into uniform flakes." },
  { name: "Quality Control", description: "Strict testing ensures consistent quality." },
  { name: "High-Quality rPET Flakes", description: "Ready for your production." },
];

export const IMPACT_STATS = [
  { value: "20,000+", label: "Tons rPET flakes produced annually" },
  { value: "800M+", label: "Bottles diverted from landfills each year" },
  { value: "-30%", label: "Water use compared to industry average" },
  { value: "-25%", label: "Energy use through efficient processes" },
  { value: "Positive", label: "Social impact supporting local jobs and communities" },
];

export const DOCUMENT_LIST: {
  name: string;
  category: string;
  format: string;
  size: string;
  icon: string;
  file?: string;
  description: string;
}[] = [
  {
    name: "Company Profile",
    category: "Company",
    format: "PDF",
    size: "71 KB",
    icon: "company",
    file: "/PDF/company-profile.pdf",
    description: "Company structure, background and overall capabilities.",
  },
  {
    name: "Product Offer Sheet",
    category: "Product",
    format: "PDF",
    size: "151 KB",
    icon: "product",
    file: "/PDF/product-offer-sheet.pdf",
    description: "Grades, colors and commercial offer summary.",
  },
  {
    name: "Technical Data Sheet",
    category: "Product",
    format: "PDF",
    size: "208 KB",
    icon: "technical",
    file: "/PDF/technical-data-sheet.pdf",
    description: "Physical and chemical properties, specs and application notes.",
  },
  {
    name: "Traceability Note",
    category: "Quality",
    format: "PDF",
    size: "140 KB",
    icon: "traceability",
    file: "/PDF/traceability-note.pdf",
    description: "Raw material chain of custody and batch traceability.",
  },
  {
    name: "Process Overview",
    category: "Company",
    format: "PDF",
    size: "1.7 MB",
    icon: "process",
    description: "Step-by-step overview of our production and quality process.",
  },
  {
    name: "Sustainability Note",
    category: "Sustainability",
    format: "PDF",
    size: "1.2 MB",
    icon: "sustainability",
    description: "Our approach to responsible sourcing and environmental impact.",
  },
];

export const DOCUMENTS_FAQ = [
  {
    q: "How can I request a sample?",
    a: "Use the Request Sample button on this page or the Contact page, and our sales team will arrange a sample for your evaluation.",
  },
  {
    q: "How do I request a TDS or COA?",
    a: "Request our Technical Data Sheet or Certificate of Analysis through the document request form on this page or by contacting our sales team directly.",
  },
  {
    q: "Do you provide export documents?",
    a: "Yes. We prepare the commercial and shipping documents required for international trade for every shipment upon order confirmation.",
  },
  {
    q: "Can I get documents in another language?",
    a: "Most documents are available in English. For other languages, contact our team and we'll do our best to accommodate your request.",
  },
];

// Partner logo files live in public/images/partners/ — dropped in directly by
// the user (not generated by this codebase). Each was manually picked from
// several supplied variants per brand (some had white-on-transparent text
// meant for dark backgrounds and would be invisible on our white cards).
// `website` links out to each partner's real, verified official site.
export const PARTNERS = [
  {
    name: "KəhrizSu",
    logo: "/images/partners/kehrizSu-partnersLogo.png",
    website: "https://kehrizsu.az/",
    description:
      "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
  },
  {
    name: "Slavyanka",
    logo: "/images/partners/slavyanka-partnersLogo.png",
    website: "https://slavyanka.az/",
    description:
      "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
  },
  {
    name: "Sirab",
    logo: "/images/partners/Sirab-logo.png",
    website: "https://www.sirab.az/",
    description:
      "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
  },
  {
    name: "Təmiz Şəhər",
    logo: "/images/partners/temizSheher-partnersLogo.png",
    website: "https://tamizshahar.az/",
    description:
      "Qafqazın ən böyük və müasir tullantıların çeşidlənməsi və utilizasiyası müəssisəsi ilə əməkdaşlıq bizim uğurumuz və təcrübəmizin inkişafıdır.",
  },
  {
    name: "Auxilium Carbon",
    logo: "/images/partners/auxilium.png",
    website: "https://auxiliumcarbon.com/",
    description:
      "Tullantıdan Dəyərə şüarı ilə tullantıların təkrar emalı və karbon emisiyasının azaldılması fəaliyyətlərimizi qlobal platformalara aparırıq.",
  },
  {
    name: "Azərbaycan Respublikası Ekologiya və Təbii Sərvətlər Nazirliyi",
    logo: "/images/partners/ekologiyaTebii-partners.png",
    website: "https://www.eco.gov.az/",
    description:
      "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
  },
  {
    name: "Verra",
    logo: "/images/partners/verra-partners.svg",
    website: "https://verra.org/",
    description:
      "Karbon bazarları və davamlılıq standartlarında qlobal lider olan Verra, ölçülə bilən ekoloji təsir öhdəliyimizi dəstəkləyir.",
  },
  {
    name: "Iterum",
    logo: "/images/partners/iterum-partners.svg",
    website: "https://iterum.lv/en/",
    description:
      "Latviyada yerləşən polimer emalı şirkəti Iterum ilə birgə plastik tullantıları dəyərli xammala çevirmək məqsədini irəli aparırıq.",
  },
  {
    name: "Onur Ambalaj",
    logo: "/images/partners/onurAmbalaj-partners.png",
    website: "https://www.onurambalaj.com.tr/",
    description:
      "Türkiyədə yerləşən qablaşdırma həlləri istehsalçısı Onur Ambalaj, rPET fleksimizi real məhsullarda dəyərləndirən beynəlxalq tərəfdaşlarımızdandır.",
  },
  {
    name: "İnan Tech",
    logo: "/images/partners/inanTech-partners.png",
    website: "https://www.inanplastics.com/en/",
    description:
      "Türkiyədə plastik emalı avadanlıqları istehsalçısı İnan Tech, daxil olduğumuz emal sənayesinin texnoloji tərəfini dəstəkləyir.",
  },
];

export const CONTACT_INFO = [
  { label: "Sales Email", value: "office@polycleaner.az", sub: "We typically reply within 24 hours." },
  { label: "Phone / WhatsApp", value: "+994 55 257 54 54", sub: "Mon – Fri, 09:00 – 18:00 (GMT+4)" },
  { label: "Location", value: "Balakhani Industrial Park, 1th zone", sub: "Factory & Headquarters" },
  { label: "Website", value: "polycleaner.az", sub: "Learn more about our products & services." },
  { label: "Working Languages", value: "English • Russian • Turkish • Azerbaijani", sub: "We support you in your language." },
];

// Central bilingual content dictionary. `en` mirrors the site's original
// English copy; `az` is its Azerbaijani translation. Both share an identical
// shape (enforced by `satisfies typeof en` on `az`) so every component can
// index into either with the same path. Non-textual data (image paths,
// hrefs, slugs, numeric spec values, emails/phone) stays in `lib/constants.ts`
// and is zipped together with these arrays by index — this file holds text only.

export type Locale = "en" | "az";

const en = {
  nav: {
    home: "Home",
    about: "About Us",
    rpet: "rPET Flakes",
    process: "Process & Quality",
    sustainability: "Sustainability",
    documents: "Documents",
    contact: "Contact",
  },

  common: {
    requestOffer: "Request Offer",
    requestRpetOffer: "Request rPET Flakes Offer",
    requestSample: "Request Sample",
    bookTaropakMeeting: "Book TAROPAK Meeting",
    bookMeeting: "Book Meeting",
    requestBuyerDocuments: "Request Buyer Documents",
    generalContactSales: "General / Contact Sales",
    viewAllProducts: "View All Products",
    viewDetails: "View Details",
    learnMore: "Learn more",
    backToHome: "Back to Home",
    download: "Download",
    downloading: "Downloading…",
    downloaded: "Downloaded",
    request: "Request",
    address: "Balakhani Industrial Park, 1th zone",
    chatOnWhatsapp: "Chat on WhatsApp",
    sendAnEmail: "Send an Email",
  },

  footer: {
    tagline:
      "Poly Cleaner is a trusted producer of high quality rPET flakes from Azerbaijan. We turn used bottles into valuable raw materials for a sustainable future.",
    quickLinks: "Quick Links",
    products: "Products",
    information: "Information",
    contactUs: "Contact Us",
    followUs: "Follow Us",
    website: "polycleaner.az",
    copyright: (year: number) => `© ${year} Poly Cleaner. All rights reserved.`,
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    productLinks: ["Transparent", "Light Blue", "Green", "Mixed Colors", "Custom Specifications"],
    infoLinks: ["Quality Assurance", "Certificates", "Logistics & Shipping", "Payments", "FAQ"],
  },

  home: {
    heroEyebrow: "Documented rPET Flakes",
    heroTitleLine1: "Documented Hot Washed",
    heroTitleAccent: "rPET Flakes",
    heroTitleLine2: "Supplier",
    heroTitleLine3: "from Azerbaijan",
    heroDescription:
      "Poly Cleaner supplies consistently processed and fully documented rPET flakes for sheet, strap, fiber, food and non-food packaging applications.",
    taropakMeetUs: (name: string) => `Meet us at ${name}`,
    taropakBannerTagline: "Discover our rPET flakes and build your next sustainable solution with us.",
    trustBar: [
      { label: "PRODUCER", sub: "NOT A TRADER" },
      { label: "DOCUMENTED &", sub: "AUDITABLE" },
      { label: "EXPORT READY", sub: "WORLDWIDE" },
      { label: "BALAKHANI", sub: "INDUSTRIAL PARK" },
      { label: "TRACEABLE", sub: "OPERATIONS" },
      { label: "TRIAL VOLUMES", sub: "AVAILABLE" },
    ],
    productsTitle: "Our rPET Flakes",
    productsDescription:
      "High quality hot washed rPET flakes in different colors and specifications to meet your production needs.",
    processEyebrow: "Our Process",
    processTitle: "From Bottles to High Quality rPET Flakes",
    whyChooseTitle: "Why Choose Poly Cleaner",
    buyerDocsTitle: "Buyer Documents",
    buyerDocsDescription: "All key documents are available for your due diligence.",
    finalCtaTitle: "Let’s build a cleaner future together.",
    finalCtaDescription: "Contact us today for samples, offers and partnership opportunities.",
    partnersEyebrow: "Our Partners",
    partnersTitle: "We work with the best partners",
    partnersDescription:
      "We work with manufacturers, recyclers, traders and logistics partners across Europe, Asia and the Middle East.",
    partnersCtaTitle: "Interested in partnering with us?",
    partnersCtaDescription: "Let’s build a greener future together.",
    partnersCtaButton: "Become a Partner",
    partnersViewAll: (count: number) => `View all partners (${count})`,
    partnersModalClose: "Close",
  },

  whyChooseItems: [
    {
      title: "Sustainability",
      description:
        "We reduce plastic waste and support circular economy by turning used bottles into valuable raw materials.",
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
  ],

  buyerDocuments: [
    { name: "Company Profile" },
    { name: "Product Offer Sheet" },
    { name: "Technical Data Sheet" },
    { name: "Traceability Note" },
  ],

  partners: [
    {
      name: "KəhrizSu",
      description:
        "Our partnerships with local companies, built on a zero-waste philosophy, strengthen our resources.",
    },
    {
      name: "Slavyanka",
      description:
        "Our partnerships with local companies, built on a zero-waste philosophy, strengthen our resources.",
    },
    {
      name: "Sirab",
      description:
        "Our partnerships with local companies, built on a zero-waste philosophy, strengthen our resources.",
    },
    {
      name: "Təmiz Şəhər",
      description:
        "Our partnership with the Caucasus’ largest and most modern waste sorting and utilization facility drives our success and growing expertise.",
    },
    {
      name: "Auxilium Carbon",
      description:
        "Under our ‘From Waste to Value’ philosophy, we bring our waste recycling and carbon emission reduction efforts to global platforms.",
    },
    {
      name: "Azerbaijan Ministry of Ecology and Natural Resources",
      description:
        "Our partnerships with local companies, built on a zero-waste philosophy, strengthen our resources.",
    },
    {
      name: "Verra",
      description:
        "A global leader in carbon markets and sustainability standards, supporting our commitment to measurable environmental impact.",
    },
    {
      name: "Iterum",
      description:
        "A Latvia-based polymer recycling company — together we advance turning plastic waste into valuable, reusable raw material.",
    },
    {
      name: "Onur Ambalaj",
      description:
        "A Turkey-based packaging solutions manufacturer, one of the international partners putting our rPET flakes to work in real products.",
    },
    {
      name: "İnan Tech",
      description:
        "A Türkiye-based manufacturer of plastic recycling machinery, supporting the technology side of the recycling industry we're part of.",
    },
  ],

  processSteps: [
    { name: "Collection", description: "Post-consumer PET bottles are collected from trusted sources." },
    { name: "Sorting", description: "Bottles are sorted by color and material; labels and contaminants removed." },
    { name: "Washing", description: "Hot wash with eco-friendly detergents to remove dirt, glue and residues." },
    { name: "Drying", description: "Centrifugal and thermal drying to reach optimal moisture." },
    { name: "Quality Control", description: "In-process and final inspection to ensure consistent quality." },
    { name: "Packing & Loading", description: "Flakes are packed in bulk bags and loaded for worldwide shipment." },
  ],

  aboutProcessSteps: [
    { name: "Collection", description: "Post-consumer PET bottles are collected from trusted sources." },
    { name: "Sorting", description: "Bottles are sorted by color and material; labels and contaminants removed." },
    { name: "Shredding", description: "Bottles are shredded into uniform flakes for further processing." },
    { name: "Hot Washing", description: "Hot wash with eco-friendly detergents to remove dirt, glue and residues." },
    { name: "Drying", description: "Centrifugal and thermal drying to reach optimal moisture." },
    { name: "Quality Control", description: "In-process and final inspection to ensure consistent quality." },
    { name: "Packing & Loading", description: "Flakes are packed in bulk bags and loaded for worldwide shipment." },
  ],

  about: {
    heroTitle: "About",
    heroTitleAccent: "Poly Cleaner",
    heroDescription:
      "Poly Cleaner is an Azerbaijan-based producer of high quality hot washed rPET flakes. We transform post-consumer PET waste into consistent, clean and traceable recycled raw material for global recyclers and manufacturers.",
    overviewEyebrow: "COMPANY OVERVIEW",
    overviewTitle: "Azerbaijan-based. Quality-driven. Export-ready.",
    overviewParagraph1:
      "Poly Cleaner operates in the Balakhani Industrial Park, Baku, Azerbaijan, with a purpose-built facility designed for efficient and sustainable rPET flakes production. Our advanced hot wash technology, strict quality control and responsible operations enable us to deliver consistent products that meet international standards.",
    overviewParagraph2:
      "We are committed to long-term partnerships, transparent communication and creating value from waste — for our customers, our community and the planet.",
    factsLocation: "Location",
    factsLocationValue: "Balakhani Industrial Park, 1th zone",
    factsFounded: "Founded",
    factsFoundedValue: "Built for modern recycling and global markets",
    factsMarkets: "Markets",
    factsMarketsValue: "Exporting to Europe, Asia, Middle East & beyond",
    valuesTitle: "Our Values. Our Strength.",
    numbersTitle: "Poly Cleaner in Numbers",
    whyPartnerTitle: "Why Partner with Poly Cleaner?",
    processEyebrow: "Our Process",
    processTitle: "Process Snapshot",
  },

  companyValues: [
    { title: "Value from Waste", description: "We turn post-consumer PET waste into high quality flakes that power a circular economy." },
    { title: "Reliability", description: "Consistent quality, on-time delivery and transparent communication build lasting partnerships." },
    { title: "Sustainability", description: "Energy-efficient operations and responsible resource management to reduce environmental impact." },
    { title: "Traceability", description: "From bottle to flakes — every lot is documented, tested and fully traceable." },
  ],

  companyNumbers: [
    { value: "10,000+ m²", label: "Production Facility (Balakhani Industrial Park)" },
    { value: "30,000+", label: "MT Annual Production Capacity" },
    { value: "15+", label: "Quality Tests on Every Batch" },
    { value: "20+", label: "Countries Supplied" },
    { value: "50+", label: "Dedicated Team Members" },
  ],

  whyPartnerItems: [
    { title: "Consistent Quality", description: "Advanced hot wash process and rigorous QC ensure clean, low-contamination rPET flakes." },
    { title: "Export Ready", description: "Packaging, documentation and logistics support for smooth international shipments." },
    { title: "Flexible Solutions", description: "Multiple flake colors and custom specifications to match your production requirements." },
    { title: "Customer Focused", description: "Responsive service and technical support before, during and after delivery." },
  ],

  rpet: {
    heroTitle: "Hot Washed",
    heroTitleAccent: "rPET Flakes",
    heroDescription:
      "High-quality rPET flakes produced in Azerbaijan from post-consumer PET bottles. Hot washed, dry and sorted to support consistent performance in sheet, strap, fiber, non-food packaging and trading applications.",
    trustStrip: [
      { label: "Made in Azerbaijan\nExport to Europe" },
      { label: "Consistent\nQuality" },
      { label: "Sustainable &\nTraceable" },
      { label: "Reliable\nSupply" },
    ],
    gradesEyebrow: "Product Range",
    gradesTitle: "Our rPET Flakes Grades",
    gradesDescription: "Different colors and specifications to suit your production needs.",
    applicationsTitle: "Applications",
    applicationsDescription: "Our rPET flakes are used across a wide range of industries.",
    specsTitle: "Specifications (Typical Values)",
    productInfoTitle: "Product Information",
    closeupTitle: "Close-up View",
  },

  productGrades: [
    { name: "Transparent", description: "For sheet, thermoforming and general applications." },
    { name: "Light Blue", description: "For sheet, strapping, thermoforming." },
    { name: "Green", description: "For strap, sheet, general applications." },
    { name: "Mixed Colors", description: "For fiber, non-food packaging, others." },
  ],

  closeups: [
    { label: "Transparent flakes close-up" },
    { label: "Light Blue flakes close-up" },
    { label: "Green flakes close-up" },
    { label: "Mixed Colors flakes close-up" },
    { label: "Flakes in hand" },
  ],

  applications: [
    { name: "Sheet", description: "Thermoformed sheets & trays" },
    { name: "Strap", description: "Strapping & banding" },
    { name: "Fiber", description: "Polyester staple fiber & nonwoven" },
    { name: "Non-Food Packaging", description: "Bottles, jars, boxes & rigid packaging" },
    { name: "Trading / Distribution", description: "Global trading and resale" },
  ],

  specTable: [
    { label: "Flake Size", value: "8–14 mm (customizable)" },
    { label: "Moisture", value: "≤ 1.0%" },
    { label: "Contamination", value: "≤ 100 ppm (PVC, labels, other plastics)" },
    { label: "Packing", value: "1,100 kg Jumbo Bags" },
    { label: "Loading", value: "20–22 MT per 20' FCL / 24–26 MT per 40' HC" },
    { label: "Applications", value: "Sheet, strap, fiber, non-food packaging, trading" },
  ],

  productInfo: [
    { label: "Raw Material", value: "Post-consumer PET bottles (bales)" },
    { label: "Process", value: "Hot washing, friction washing, rinsing, drying, sorting, metal detection" },
    { label: "Quality Control", value: "In-house lab testing for every batch" },
    { label: "Origin", value: "Azerbaijan" },
    { label: "Certification", value: "REACH Compliant (upon request)" },
    { label: "HS Code", value: "3915.10" },
  ],

  process: {
    heroTitle: "Process &",
    heroTitleAccent: "Quality",
    heroDescription:
      "At Poly Cleaner, our integrated process and quality systems ensure high quality rPET flakes with consistent specifications, full traceability and reliable export documentation.",
    ctaRequestInfo: "Request Product Information",
    ctaSpeakWithSales: "Speak with Sales",
    capabilitiesTitle: "Process Capabilities",
    capabilitiesDescription: "Our facility is designed for efficient, sustainable and scalable rPET flake production.",
    qualityTitle: "Quality Control & Documentation",
    qualityDescription: "Every batch is tested and documented to meet international buyer requirements.",
    qaPillarsTitle: "Our Quality Assurance Pillars",
    keySpecsTitle: "Key Specifications*",
    keySpecsFootnote: "* Specifications may vary by color and grade. Values shown are typical and based on regular production.",
    colorOptionsValue: "Transparent, Light Blue, Green, Mixed",
    howWeWorkTitle: "How We Work",
    finalCtaTitle: "Let’s build a cleaner future together.",
    finalCtaDescription: "Contact our team for product information or a customized solution.",
  },

  processCapabilities: [
    "Advanced sorting and color separation lines",
    "Multi-stage hot washing system",
    "High-efficiency friction & floating sink separation",
    "Automated drying and air classification",
    "Metal detection and final inspection",
    "Bulk packing in 1100–1250 kg big bags",
    "Daily production with strict process control",
  ],

  qualityControl: [
    "Moisture content testing",
    "PVC, labels & glue content analysis",
    "Color and visual inspection",
    "Contamination and foreign material check",
    "Batch traceability from input to shipment",
    "COA (Certificate of Analysis) for every shipment",
    "Full export documentation support",
  ],

  qaPillars: [
    { title: "Consistent Quality", description: "Standardized processes and advanced equipment ensure stable, high-quality rPET flakes batch after batch." },
    { title: "Traceable Operations", description: "End-to-end traceability from collection to shipment for complete visibility and accountability." },
    { title: "Export Documentation", description: "Commercial and shipping documents are prepared for international trade." },
    { title: "Process Transparency", description: "Open communication and clear data to build long-term trust with our global partners." },
  ],

  keySpecs: [
    { label: "Moisture" },
    { label: "PVC Content" },
    { label: "Labels & Glue" },
    { label: "Other Plastics" },
    { label: "Sorted Feedstock" },
    { label: "Packaging (Big Bags)" },
    { label: "Color Options" },
  ],

  howWeWork: [
    { title: "Inquiry", description: "Share your requirements and target specifications." },
    { title: "Offer & Samples", description: "We provide offer and arrange sample for approval." },
    { title: "Order Confirmation", description: "Confirm order, specs, packaging and delivery schedule." },
    { title: "Production & QC", description: "We produce with strict quality control at every stage." },
    { title: "Shipping", description: "On-time shipment with complete export documents." },
    { title: "After-Sales Support", description: "We stay with you for ongoing support and long-term partnership." },
  ],

  sustainability: {
    heroTitle: "Turning Waste",
    heroTitleAccent: "into Value",
    heroDescription:
      "At Poly Cleaner, sustainability is at the core of everything we do. We transform post-consumer PET waste into high-quality rPET flakes, supporting a circular economy and a cleaner future.",
    trustStrip: [
      { title: "Circular Economy", description: "Keeping materials in use for longer" },
      { title: "Traceable &\nDocumented", description: "Full transparency from source to flakes" },
      { title: "Responsible\nOperations", description: "High standards for people and planet" },
      { title: "From Waste\nto Value", description: "Creating high-quality rPET for a better tomorrow" },
    ],
    bottleToFlakeTitle: "From Bottles to High-Quality rPET Flakes",
    pillarsTitle: "Our Sustainability Pillars",
    plasticCreditHeading: "Driving Positive Impact Beyond Our Operations",
    plasticCreditDescription:
      "We support plastic credit projects that help prevent plastic waste from leaking into the environment. These projects create verified environmental and social benefits in communities where waste management infrastructure is limited.",
    plasticCreditLink: "Learn more about our impact approach",
    plasticCreditBadgeTitle: "Plastic Credit\nSupported",
    plasticCreditBadgeDescription: "Contributing to a cleaner environment and better livelihoods.",
    impactAtGlanceTitle: "Impact at a Glance",
    impactFootnote: "Figures represent approximate annual impact and continue to improve as we grow.",
    finalCtaDescription: "Partner with Poly Cleaner for reliable, high-quality rPET flakes and measurable sustainability.",
  },

  impactCards: [
    {
      title: "Circular Economy",
      description: "We close the loop by turning post-consumer PET waste into valuable raw material for new products.",
    },
    {
      title: "Waste Reduction",
      description: "Our process diverts plastic waste from landfills and oceans, reducing environmental footprint.",
    },
    {
      title: "Responsible Operations",
      description: "Energy-efficient technologies, strict quality controls, and safe working conditions guide our daily operations.",
    },
    {
      title: "Long-Term Impact",
      description: "We invest in partnerships and innovation to create lasting social, environmental, and economic value.",
    },
  ],

  sustainabilitySteps: [
    { name: "Collection", description: "Post-consumer PET bottles are collected." },
    { name: "Sorting", description: "Bottles are sorted by color and type." },
    { name: "Washing", description: "Hot washing removes labels, glue and dirt." },
    { name: "Drying", description: "Moisture is removed for clean flakes." },
    { name: "Flaking", description: "Bottles are shredded into uniform flakes." },
    { name: "Quality Control", description: "Strict testing ensures consistent quality." },
    { name: "High-Quality rPET Flakes", description: "Ready for your production." },
  ],

  sustainabilityPillars: [
    { title: "Sustainable Sourcing", description: "We prioritize responsible sourcing of post-consumer PET to protect natural resources." },
    { title: "Innovation & Efficiency", description: "We continuously improve our processes to use less energy, less water, and generate less waste." },
    { title: "People & Safety", description: "Our team’s well-being and safety are fundamental to our sustainable growth." },
    { title: "Partnerships", description: "We work with suppliers, customers and communities to build a stronger and more responsible value chain." },
    { title: "Transparency", description: "We provide clear, verifiable information so our partners can make confident, sustainable choices." },
  ],

  impactStats: [
    { value: "20,000+", title: "TONS", description: "rPET flakes produced annually" },
    { value: "800M+", title: "BOTTLES", description: "Diverted from landfills each year" },
    { value: "-30%", title: "WATER USE", description: "Compared to industry average" },
    { value: "-25%", title: "ENERGY USE", description: "Through efficient processes" },
    { value: "Positive", title: "SOCIAL IMPACT", description: "Supporting local jobs and communities" },
  ],

  documents: {
    heroCrumb: "Documents > Buyer Documents",
    heroTitle: "Buyer",
    heroTitleAccent: "Documents",
    heroDescription:
      "All the documents you need to evaluate, approve and collaborate with Poly Cleaner. Verified, up to date and prepared for global trade.",
    heroTrustItems: [
      { label: "Verified &\nUp to Date" },
      { label: "Fast & Easy\nAccess" },
      { label: "Trusted\nInformation" },
      { label: "Built for\nGlobal Trade" },
    ],
    infoBanner:
      "All documents are available in PDF format. Need another format or additional information? Contact us and we’ll be happy to help.",
    taropakMeet: (name: string) => `Let’s meet at ${name}`,
    taropakTagline: "Meet the Poly Cleaner team to discuss your rPET flake needs and explore partnership opportunities.",
    taropakButton: "Request Meeting",
    faqTitle: "Frequently Asked Questions",
    allDocuments: "All",
    categories: {
      Company: "Company",
      Product: "Product",
      Quality: "Quality",
      Sustainability: "Sustainability",
    } as Record<string, string>,
    buyerPackTitle: "Get a tailored buyer pack",
    buyerPackDescription:
      "Save time with a ready-to-share package of key documents matched to your needs.",
    buyerPackButton: "Request Buyer Pack",
    buyerPackFootnote: "Fast • Secure • Complete",
  },

  documentList: [
    { name: "Company Profile", description: "Company structure, background and overall capabilities." },
    { name: "Product Offer Sheet", description: "Grades, colors and commercial offer summary." },
    { name: "Technical Data Sheet", description: "Physical and chemical properties, specs and application notes." },
    { name: "Traceability Note", description: "Raw material chain of custody and batch traceability." },
    { name: "Process Overview", description: "Step-by-step overview of our production and quality process." },
    { name: "Sustainability Note", description: "Our approach to responsible sourcing and environmental impact." },
  ],

  documentsFaq: [
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
      a: "Most documents are available in English. For other languages, contact our team and we’ll do our best to accommodate your request.",
    },
  ],

  documentRequestForm: {
    heading: "Need a custom document package?",
    subtext: "Tell us what you need and we’ll prepare a tailored package for you.",
    documentTypeLabel: "Document Type",
    notesLabel: "Additional Notes",
    notesPlaceholder: "Tell us more about your request",
    submit: "Request Buyer Documents",
    footnote: "Your data is kept secure • Response within 24 hours",
    successTitle: "Request received.",
    successDescription: "Our team will prepare your document package shortly.",
    sendAnother: "Send another request",
    documentTypeOptions: ["Packing List", "CMR", "Certificate of Origin", "Invoice", "Purchase Order", "Quality Passport"],
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    company: "Company",
    companyPlaceholder: "Enter your company name",
    email: "Email",
    emailPlaceholder: "Enter your email address",
  },

  contact: {
    heroTitle: "Contact",
    heroTitleAccent: "Poly Cleaner",
    heroDescription:
      "We’re here to support your business with high-quality rPET solutions and reliable service. Reach out to our team for inquiries, samples, offers, or partnership opportunities.",
    heroItems: [
      { title: "Reliable Quality", description: "Consistent rPET quality you can count on." },
      { title: "Long-term Partnership", description: "Transparent collaboration built on trust." },
      { title: "Global Support", description: "Responsive service globally, locally." },
    ],
    formTitle: "Send Us a Message",
    formIntro: "Fill in the form below and our team will get back to you promptly.",
    infoTitle: "Contact Information",
    findUsTitle: "Find Us",
    findUsDescription:
      "Our facility is located in the Balakhani Industrial Park, strategically positioned for efficient logistics and global shipping.",
    getDirections: "Get Directions",
    directionsHint: "On a phone, the app opens directly.",
    coordinates: "Coordinates",
    copy: "Copy",
    copied: "Copied",
    mapView: "Map",
    satelliteView: "Satellite",
    quickCards: [
      { title: "Request Offer", description: "Get a tailored offer for your required rPET flakes specifications.", cta: "Request rPET Flakes Offer" },
      { title: "Request Sample", description: "Receive a sample to evaluate our rPET flakes quality.", cta: "Request Sample" },
      { title: "Book TAROPAK Meeting", description: "Let’s meet at TAROPAK 2026 in Poznań, Poland.", cta: "Book Meeting" },
    ],
  },

  contactInfo: [
    { label: "Sales Email", sub: "We typically reply within 24 hours." },
    { label: "Phone / WhatsApp", sub: "Mon – Fri, 09:00 – 18:00 (GMT+4)" },
    { label: "Location", sub: "Factory & Headquarters" },
    { label: "Website", sub: "Learn more about our products & services." },
    { label: "Working Languages", value: "English • Russian • Turkish • Azerbaijani", sub: "We support you in your language." },
  ],

  inquiryTypes: [
    { value: "offer", label: "Request rPET Flakes Offer" },
    { value: "sample", label: "Request Sample" },
    { value: "taropak", label: "Book TAROPAK Meeting" },
    { value: "amiExpo", label: "Book AMI Expo Meeting" },
    { value: "documents", label: "Request Buyer Documents" },
    { value: "general", label: "General / Contact Sales" },
    { value: "partner", label: "Become a Partner" },
  ],

  inquiryModal: {
    offerTitle: "Request rPET Flakes Offer",
    offerSubtitle: "Tell us your requirements and our sales team will prepare a tailored offer for your company.",
    defaultSubtitle: "Fill in the form below and our team will get back to you promptly.",
    fallbackTitle: "Send an Inquiry",
  },

  forms: {
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    companyName: "Company Name",
    companyNamePlaceholder: "Your company name",
    companyNamePlaceholder2: "Company Ltd.",
    country: "Country",
    countryPlaceholder: "Select your country",
    countryPlaceholder2: "Select country",
    email: "Email",
    emailAddress: "Email Address",
    emailPlaceholder: "name@company.com",
    phone: "Phone / WhatsApp",
    phonePlaceholder: "+00 000 000 0000",
    phonePlaceholder2: "+48 123 456 789",
    productInterest: "Product Interest",
    selectProduct: "Select product",
    monthlyVolume: "Monthly Volume",
    monthlyVolumePlaceholder: "e.g. 20-40 MT",
    requiredVolume: "Required Volume",
    selectVolume: "Select volume",
    application: "Application",
    selectApplication: "Select application",
    deliveryDestination: "Delivery Destination",
    deliveryDestinationPlaceholder: "Poland, Germany, Netherlands, Turkey, etc.",
    deliveryAddress: "Delivery Address",
    deliveryAddressPlaceholder: "Street, city, postal code, country",
    sampleType: "Sample Type",
    selectSampleType: "Select sample type",
    courierAccount: "Courier Account",
    courierAccountPlaceholder: "e.g. DHL Account #123456789",
    attachments: "Attachments",
    attachmentsHint: "Images, PDF, Word or Excel — up to 3 files, 5MB each.",
    chooseFiles: "Click to upload or drag and drop",
    tooManyFiles: "You can attach up to 3 files.",
    fileTooLarge: "Each attached file must be under 5MB.",
    fileTypeNotAllowed: "You can attach images, PDF, Word or Excel files.",
    companyOrganisation: "Company / Organisation",
    city: "City",
    cityPlaceholder: "Your city",
    emailOrPhoneNote: "Please provide an email address or phone number.",
    partnershipInterest: "Partnership Interest",
    selectPartnershipType: "Select partnership type",
    partnershipInterestOptions: [
      "PET Bottle Supply",
      "Collection Partnership",
      "Logistics & Transportation",
      "Distribution & Sales Partnership",
      "Other Partnership",
    ],
    message: "Message",
    messageOptional: "(optional)",
    messagePlaceholder: "Tell us about your requirements...",
    messagePlaceholderOffer: "Please describe your required product, target volume, delivery terms or any special specifications.",
    selectOption: "Select an option",
    searchPlaceholder: "Search...",
    noMatches: "No matches",
    consentPrivacy: "I agree to the processing of my personal data in accordance with the Privacy Policy.",
    consentContact: "I agree to be contacted by Poly Cleaner regarding my inquiry.",
    consentDataUse: "Your information will only be used to respond to your request.",
    secureNote: "Your information is secure and will only be used to respond to your inquiry.",
    requiredNote: "All fields marked with * are required.",
    cancel: "Cancel",
    sendMessage: "Send Message",
    sendRequest: "Send Request",
    sendAnotherInquiry: "Send another inquiry",
    inquiryDetails: "Inquiry Details",
    referenceLabel: "Reference",
    sendAnotherRequest: "Send another request",
    thankYouInquiry: "Thank you — your inquiry was sent.",
    thankYouInquirySub: "Our team will get back to you within 24 hours.",
    thankYouOffer: "Thank you. Your request has been received.",
    thankYouOfferSub: "Our sales team will contact you shortly.",
    genericError: "Something went wrong. Please try again.",
    genericErrorContact: "Something went wrong. Please try again or contact us directly by email.",
    productInterestOptions: [
      "Transparent rPET Flakes",
      "Light Blue rPET Flakes",
      "Green rPET Flakes",
      "Mixed Colors rPET Flakes",
      "Custom Specification",
      "General Inquiry",
    ],
    offerProductInterestOptions: [
      "Transparent / Clear rPET Flakes",
      "Light Blue rPET Flakes",
      "Green rPET Flakes",
      "Mixed Color rPET Flakes",
      "Multiple Products",
      "Not sure yet",
    ],
    offerVolumeOptions: ["Sample only", "1–5 MT", "20–25 MT Trial Order", "50–100 MT", "Regular monthly supply", "Other"],
    offerApplicationOptions: ["Sheet / Thermoforming", "Strap", "Fiber", "Food Packaging", "Non-food Packaging", "Trading / Distribution", "Other"],
    sampleTypeOptions: ["500g Sample", "1kg Sample", "2kg Sample", "5kg Sample", "Custom Quantity"],
  },

  notFound: {
    title: "Page not found",
    description: "The page you’re looking for doesn’t exist or may have moved.",
  },

  legal: {
    privacyTitle: "Privacy Policy",
    privacyParagraph1:
      "Poly Cleaner (“we”, “us”) respects your privacy. Information submitted through our contact and inquiry forms (name, company, email, phone, and message) is used solely to respond to your request and is not sold or shared with third parties for marketing purposes.",
    privacyParagraph2:
      "We use essential cookies to operate this website and, where enabled, analytics cookies to understand site usage. You can control cookie preferences through your browser settings.",
    privacyContactPrefix: "For any questions about how your data is handled, contact us at",
    termsTitle: "Terms of Use",
    termsParagraph1:
      "By accessing this website, you agree to use it for lawful purposes only. Content, specifications and pricing displayed are for informational purposes and are subject to confirmation in a formal offer or contract with Poly Cleaner.",
    termsParagraph2:
      "All trademarks, logos and content on this site are the property of Poly Cleaner unless otherwise stated, and may not be reproduced without prior written consent.",
    termsContactPrefix: "For questions regarding these terms, contact us at",
  },
};

const az = {
  nav: {
    home: "Əsas",
    about: "Haqqımızda",
    rpet: "rPET Fleks",
    process: "Proses və Keyfiyyət",
    sustainability: "Dayanıqlılıq",
    documents: "Sənədlər",
    contact: "Əlaqə",
  },

  common: {
    requestOffer: "Təklif İstə",
    requestRpetOffer: "rPET Fleks Təklifi İstə",
    requestSample: "Nümunə İstə",
    bookTaropakMeeting: "TAROPAK Görüşü Təyin Et",
    bookMeeting: "Görüş Təyin Et",
    requestBuyerDocuments: "Alıcı Sənədlərini İstə",
    generalContactSales: "Ümumi / Satış Komandası ilə Əlaqə",
    viewAllProducts: "Bütün Məhsullara Bax",
    viewDetails: "Ətraflı Bax",
    learnMore: "Ətraflı məlumat",
    backToHome: "Ana Səhifəyə Qayıt",
    download: "Yüklə",
    downloading: "Yüklənir…",
    downloaded: "Yükləndi",
    request: "İstə",
    address: "Balaxanı Sənaye Parkı, 1-ci zona",
    chatOnWhatsapp: "WhatsApp-da Yaz",
    sendAnEmail: "Email Göndər",
  },

  footer: {
    tagline:
      "Poly Cleaner Azərbaycandan yüksək keyfiyyətli rPET fleksin etibarlı istehsalçısıdır. Biz istifadə olunmuş şüşələri dayanıqlı gələcək üçün dəyərli xammala çeviririk.",
    quickLinks: "Sürətli Linklər",
    products: "Məhsullar",
    information: "Məlumat",
    contactUs: "Əlaqə",
    followUs: "Bizi İzlə",
    website: "polycleaner.az",
    copyright: (year: number) => `© ${year} Poly Cleaner. Bütün hüquqlar qorunur.`,
    privacyPolicy: "Məxfilik Siyasəti",
    termsOfUse: "İstifadə Şərtləri",
    productLinks: ["Şəffaf", "Açıq Mavi", "Yaşıl", "Qarışıq Rənglər", "Xüsusi Spesifikasiyalar"],
    infoLinks: ["Keyfiyyət Təminatı", "Sertifikatlar", "Logistika və Daşınma", "Ödənişlər", "FAQ"],
  },

  home: {
    heroEyebrow: "Sənədləşdirilmiş rPET Fleks",
    heroTitleLine1: "Sənədləşdirilmiş İsti Yuyulmuş",
    heroTitleAccent: "rPET Fleks",
    heroTitleLine2: "Təchizatçısı",
    heroTitleLine3: "Azərbaycandan",
    heroDescription:
      "Poly Cleaner PET lövhə, qablaşdırma çəmbəri, polyester lif, qida və qeyri-qida qablaşdırması üçün sabit keyfiyyətli, tam sənədləşdirilmiş isti yuyulmuş (hot washed) rPET fleks təchiz edir.",
    taropakMeetUs: (name: string) => `${name}-da bizimlə görüşün`,
    taropakBannerTagline: "rPET flekslərimizi kəşf edin və növbəti dayanıqlı həllinizi bizimlə quraq.",
    trustBar: [
      { label: "İSTEHSALÇI", sub: "VASİTƏÇİ DEYİL" },
      { label: "SƏNƏDLƏŞDİRİLMİŞ VƏ", sub: "AUDİTƏ AÇIQ" },
      { label: "İXRACA HAZIR", sub: "DÜNYA ÜÇÜN" },
      { label: "BALAXANI", sub: "SƏNAYE PARKI" },
      { label: "İZLƏNƏ BİLƏN", sub: "ƏMƏLİYYATLAR" },
      { label: "SINAQ HƏCMLƏRİ", sub: "MÜMKÜNDÜR" },
    ],
    productsTitle: "rPET Fleks Məhsullarımız",
    productsDescription:
      "İstehsal ehtiyaclarınıza uyğun müxtəlif rəng və spesifikasiyalarda yüksək keyfiyyətli isti yuyulmuş rPET fleks.",
    processEyebrow: "Prosesimiz",
    processTitle: "Şüşələrdən Yüksək Keyfiyyətli rPET Fleksə",
    whyChooseTitle: "Nəyə Görə Poly Cleaner",
    buyerDocsTitle: "Alıcı Sənədləri",
    buyerDocsDescription: "Bütün əsas sənədlər yoxlama prosesiniz üçün hazırdır.",
    finalCtaTitle: "Daha təmiz gələcəyi birlikdə quraq.",
    finalCtaDescription: "Nümunə, qiymət təklifi və əməkdaşlıq imkanları üçün bu gün bizimlə əlaqə saxlayın.",
    partnersEyebrow: "Tərəfdaşlarımız",
    partnersTitle: "Biz ən yaxşı tərəfdaşlarla işləyirik",
    partnersDescription:
      "Avropa, Asiya və Yaxın Şərqdə istehsalçılar, recycler-lər, trader-lər və logistika tərəfdaşları ilə işləyirik.",
    partnersCtaTitle: "Bizimlə tərəfdaşlıq etmək istəyirsiniz?",
    partnersCtaDescription: "Daha yaşıl bir gələcəyi birlikdə quraq.",
    partnersCtaButton: "Tərəfdaş Olun",
    partnersViewAll: (count: number) => `Bütün partnerlərə bax (${count})`,
    partnersModalClose: "Bağla",
  },

  whyChooseItems: [
    {
      title: "Dayanıqlılıq",
      description:
        "İstifadə olunmuş şüşələri dəyərli xammala çevirərək plastik tullantını azaldır və dairəvi iqtisadiyyatı dəstəkləyirik.",
    },
    {
      title: "Keyfiyyət Təminatı",
      description: "Hər partiya sabit keyfiyyəti və alıcı etibarını dəstəkləmək üçün nəzarətdən keçirilir.",
    },
    {
      title: "Qlobal Tərəfdaşlıq",
      description: "İstehsalçılar, recycler-lər və trader-lərlə uzunmüddətli əməkdaşlıqlar qururuq.",
    },
    {
      title: "Sürətli və Etibarlı",
      description: "Çevik logistika, açıq sənədləşmə və operativ satış dəstəyi.",
    },
    {
      title: "Təcrübəli Komanda",
      description: "Təkrar emal və ixrac təcrübəsi olan peşəkar komanda.",
    },
  ],

  buyerDocuments: [
    { name: "Şirkət Profili" },
    { name: "Məhsul Təklifi Vərəqəsi" },
    { name: "Texniki Məlumat Vərəqəsi (TDS)" },
    { name: "İzlənəbilənlik Qeydi" },
  ],

  partners: [
    {
      name: "KəhrizSu",
      description:
        "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
    },
    {
      name: "Slavyanka",
      description:
        "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
    },
    {
      name: "Sirab",
      description:
        "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
    },
    {
      name: "Təmiz Şəhər",
      description:
        "Qafqazın ən böyük və müasir tullantıların çeşidlənməsi və utilizasiyası müəssisəsi ilə əməkdaşlıq bizim uğurumuz və təcrübəmizin inkişafıdır.",
    },
    {
      name: "Auxilium Carbon",
      description:
        "Tullantıdan Dəyərə şüarı ilə tullantıların təkrar emalı və karbon emissiyasının azaldılması fəaliyyətlərimizi qlobal platformalara aparırıq.",
    },
    {
      name: "Azərbaycan Respublikası Ekologiya və Təbii Sərvətlər Nazirliyi",
      description:
        "Yerli şirkətlərlə sıfır itgi fəlsəfəsinə söykənən əməkdaşlıqlarımız resurslarımızı artırır.",
    },
    {
      name: "Verra",
      description:
        "Karbon bazarları və davamlılıq standartlarında qlobal lider olan Verra, ölçülə bilən ekoloji təsir öhdəliyimizi dəstəkləyir.",
    },
    {
      name: "Iterum",
      description:
        "Latviyada yerləşən polimer emalı şirkəti Iterum ilə birgə plastik tullantıları dəyərli xammala çevirmək məqsədini irəli aparırıq.",
    },
    {
      name: "Onur Ambalaj",
      description:
        "Türkiyədə yerləşən qablaşdırma həlləri istehsalçısı Onur Ambalaj, rPET fleksimizi real məhsullarda dəyərləndirən beynəlxalq tərəfdaşlarımızdandır.",
    },
    {
      name: "İnan Tech",
      description:
        "Türkiyədə plastik emalı avadanlıqları istehsalçısı İnan Tech, daxil olduğumuz emal sənayesinin texnoloji tərəfini dəstəkləyir.",
    },
  ],

  processSteps: [
    { name: "Toplama", description: "Post-consumer PET şüşələri etibarlı mənbələrdən toplanır." },
    { name: "Çeşidləmə", description: "Şüşələr rəng və materiala görə çeşidlənir; etiket və çirklər təmizlənir." },
    { name: "Yuma", description: "Ekoloji cəhətdən təmiz kimyəvi maddələrlə isti yuyulma prosesi çirki, yapışqan və qalıqları təmizləyir." },
    { name: "Qurutma", description: "İdeal rətubət səviyyəsinə çatmaq üçün santrifuqa və termik qurutma." },
    { name: "Keyfiyyətə Nəzarət", description: "Sabit keyfiyyəti təmin etmək üçün proses daxili və yekun yoxlama." },
    { name: "Qablaşdırma və Yükləmə", description: "Fleks böyük çantalara qablaşdırılır və dünya üzrə göndəriş üçün yüklənir." },
  ],

  aboutProcessSteps: [
    { name: "Toplama", description: "Post-consumer PET şüşələri etibarlı mənbələrdən toplanır." },
    { name: "Çeşidləmə", description: "Şüşələr rəng və materiala görə çeşidlənir; etiket və çirklər təmizlənir." },
    { name: "Xırdalama", description: "Şüşələr sonrakı emal üçün eyni ölçülü fleksə xırdalanır." },
    { name: "İsti Yuyulma", description: "Ekoloji cəhətdən təmiz kimyəvi maddələrlə isti yuyulma prosesi çirki, yapışqan və qalıqları təmizləyir." },
    { name: "Qurutma", description: "İdeal rətubət səviyyəsinə çatmaq üçün santrifuqa və termik qurutma." },
    { name: "Keyfiyyətə Nəzarət", description: "Sabit keyfiyyəti təmin etmək üçün proses daxili və yekun yoxlama." },
    { name: "Qablaşdırma və Yükləmə", description: "Fleks böyük çantalara qablaşdırılır və dünya üzrə göndəriş üçün yüklənir." },
  ],

  about: {
    heroTitle: "Poly Cleaner",
    heroTitleAccent: "haqqında",
    heroDescription:
      "Poly Cleaner Azərbaycanda yerləşən, yüksək keyfiyyətli isti yuyulmuş (hot washed) rPET fleks istehsalçısıdır. Biz istifadə olunmuş PET tullantılarını sabit, təmiz və izlənə bilən təkrar emal xammalına çevirərək beynəlxalq təkrar emal müəssisələrinə və istehsalçılara təqdim edirik.",
    overviewEyebrow: "ŞİRKƏT İCMALI",
    overviewTitle: "Azərbaycanda yerləşən. Keyfiyyət yönümlü. İxraca hazır.",
    overviewParagraph1:
      "Poly Cleaner Bakı şəhərində, Balaxanı Sənaye Parkında fəaliyyət göstərir. Müəssisəmiz effektiv və dayanıqlı rPET fleks istehsalı üçün qurulmuşdur. İsti yuyulma texnologiyası, keyfiyyətə nəzarət və məsuliyyətli əməliyyat yanaşması beynəlxalq müştərilər üçün sabit məhsul təqdim etməyimizə imkan yaradır.",
    overviewParagraph2:
      "Biz uzunmüddətli tərəfdaşlığa, şəffaf kommunikasiyaya və tullantıdan dəyər yaratmağa — müştərilərimiz, cəmiyyət və planet üçün faydalı nəticələrə inanırıq.",
    factsLocation: "Yerləşmə",
    factsLocationValue: "Balaxanı Sənaye Parkı, 1-ci zona",
    factsFounded: "Fəaliyyət",
    factsFoundedValue: "Müasir təkrar emal və qlobal bazarlar üçün qurulub",
    factsMarkets: "Bazar",
    factsMarketsValue: "Avropa, Asiya, Yaxın Şərq və daha çox ölkəyə ixrac",
    valuesTitle: "Dəyərlərimiz. Gücümüz.",
    numbersTitle: "Rəqəmlərlə Poly Cleaner",
    whyPartnerTitle: "Niyə Poly Cleaner ilə Əməkdaşlıq?",
    processEyebrow: "Prosesimiz",
    processTitle: "Proses İcmalı",
  },

  companyValues: [
    { title: "Tullantıdan Dəyərə", description: "İstifadə olunmuş PET tullantılarını dairəvi iqtisadiyyatı gücləndirən yüksək keyfiyyətli fleksə çeviririk." },
    { title: "Etibarlılıq", description: "Sabit keyfiyyət, vaxtında çatdırılma və şəffaf kommunikasiya uzunmüddətli tərəfdaşlıqlar qurur." },
    { title: "Dayanıqlılıq", description: "Ekoloji təsiri azaltmaq üçün enerji-effektiv əməliyyatlar və məsuliyyətli resurs idarəetməsi." },
    { title: "İzlənəbilənlik", description: "Şüşədən fleksə qədər — hər partiya sənədləşdirilir, test edilir və tam izlənə biləndir." },
  ],

  companyNumbers: [
    { value: "10,000+ m²", label: "İstehsal Sahəsi (Balaxanı Sənaye Parkı)" },
    { value: "30,000+", label: "MT İllik İstehsal Gücü" },
    { value: "15+", label: "Hər Partiyada Keyfiyyət Testi" },
    { value: "20+", label: "İxrac Olunan Ölkə" },
    { value: "50+", label: "Həsr Olunmuş Komanda Üzvü" },
  ],

  whyPartnerItems: [
    { title: "Sabit Keyfiyyət", description: "Qabaqcıl isti yuyulma prosesi və ciddi keyfiyyət nəzarəti təmiz, az çirklənmiş rPET fleks təmin edir." },
    { title: "İxraca Hazır", description: "Rəvan beynəlxalq göndərişlər üçün qablaşdırma, sənədləşmə və logistika dəstəyi." },
    { title: "Çevik Həllər", description: "İstehsal tələblərinizə uyğun müxtəlif fleks rəngləri və xüsusi spesifikasiyalar." },
    { title: "Müştəriyönümlü", description: "Çatdırılmadan əvvəl, əsnasında və sonrasında operativ xidmət və texniki dəstək." },
  ],

  rpet: {
    heroTitle: "İsti Yuyulmuş",
    heroTitleAccent: "rPET Fleks",
    heroDescription:
      "Azərbaycanda istifadə olunmuş PET şüşələrindən istehsal olunan yüksək keyfiyyətli isti yuyulmuş rPET fleks (PET lopa). Məhsul PET lövhə, qablaşdırma çəmbəri, polyester lif, qeyri-qida qablaşdırması və ticarət sahələrində sabit performans üçün yuyulur, qurudulur və çeşidlənir.",
    trustStrip: [
      { label: "Azərbaycanda istehsal\nAvropaya ixrac" },
      { label: "Sabit\nKeyfiyyət" },
      { label: "Dayanıqlı və\nİzlənə Bilən" },
      { label: "Etibarlı\nTəchizat" },
    ],
    gradesEyebrow: "Məhsul Çeşidi",
    gradesTitle: "rPET Fleks Növlərimiz",
    gradesDescription: "İstehsal ehtiyaclarınıza uyğun müxtəlif rəng və spesifikasiyalar.",
    applicationsTitle: "Tətbiq Sahələri",
    applicationsDescription: "rPET flekslərimiz geniş sənaye sahələrində istifadə olunur.",
    specsTitle: "Spesifikasiyalar (Tipik Dəyərlər)",
    productInfoTitle: "Məhsul Məlumatı",
    closeupTitle: "Yaxından Görünüş",
  },

  productGrades: [
    { name: "Şəffaf", description: "PET lövhə, termoformalaşdırma və ümumi tətbiqlər üçün." },
    { name: "Açıq Mavi", description: "PET lövhə, qablaşdırma çəmbəri və termoformalaşdırma üçün." },
    { name: "Yaşıl", description: "Qablaşdırma çəmbəri, PET lövhə və ümumi tətbiqlər üçün." },
    { name: "Qarışıq Rənglər", description: "Polyester lif, qeyri-qida qablaşdırması və digər sahələr üçün." },
  ],

  closeups: [
    { label: "Şəffaf fleksin yaxından görünüşü" },
    { label: "Açıq mavi fleksin yaxından görünüşü" },
    { label: "Yaşıl fleksin yaxından görünüşü" },
    { label: "Qarışıq rəngli fleksin yaxından görünüşü" },
    { label: "Əldə fleks" },
  ],

  applications: [
    { name: "Lövhə", description: "Termoformalaşdırılmış lövhələr və qablar" },
    { name: "Çəmbər", description: "Qablaşdırma çəmbəri və bağlama" },
    { name: "Lif", description: "Polyester ştapel lif və toxunmamış material" },
    { name: "Qeyri-Qida Qablaşdırma", description: "Butulka, banka, qutu və sərt qablaşdırma" },
    { name: "Ticarət / Distribusiya", description: "Qlobal ticarət və yenidən satış" },
  ],

  specTable: [
    { label: "Fleks Ölçüsü", value: "8–14 mm (fərdiləşdirilə bilər)" },
    { label: "Rətubət", value: "≤ 1.0%" },
    { label: "Çirklənmə", value: "≤ 100 ppm (PVC, etiketlər, digər plastiklər)" },
    { label: "Qablaşdırma", value: "1.100 kq Jumbo Çantalar" },
    { label: "Yükləmə", value: "20–22 MT / 20' FCL, 24–26 MT / 40' HC" },
    { label: "Tətbiqlər", value: "PET lövhə, qablaşdırma çəmbəri, polyester lif, qeyri-qida qablaşdırması, ticarət" },
  ],

  productInfo: [
    { label: "Xammal", value: "Post-consumer PET şüşələri (taylarda)" },
    { label: "Proses", value: "İsti yuyulma, sürtünmə ilə yuyulma, durulama, qurutma, çeşidləmə, metal aşkarlanması" },
    { label: "Keyfiyyətə Nəzarət", value: "Hər partiya üçün daxili laboratoriya testi" },
    { label: "Mənşə", value: "Azərbaycan" },
    { label: "Sertifikatlaşdırma", value: "REACH Uyğun (tələb əsasında)" },
    { label: "HS Kodu", value: "3915.10" },
  ],

  process: {
    heroTitle: "Proses və",
    heroTitleAccent: "Keyfiyyət",
    heroDescription:
      "Poly Cleaner-də inteqrasiya olunmuş proses və keyfiyyət sistemimiz sabit spesifikasiyalı, tam izlənə bilən və etibarlı ixrac sənədləri ilə dəstəklənən yüksək keyfiyyətli rPET fleks təmin edir.",
    ctaRequestInfo: "Məhsul Məlumatı İstə",
    ctaSpeakWithSales: "Satış Komandası ilə Danış",
    capabilitiesTitle: "Proses İmkanları",
    capabilitiesDescription: "Müəssisəmiz effektiv, dayanıqlı və miqyaslana bilən rPET fleks istehsalı üçün qurulmuşdur.",
    qualityTitle: "Keyfiyyətə Nəzarət və Sənədləşmə",
    qualityDescription: "Hər partiya beynəlxalq alıcı tələblərinə uyğun test edilir və sənədləşdirilir.",
    qaPillarsTitle: "Keyfiyyət Təminatı Prinsiplərimiz",
    keySpecsTitle: "Əsas Spesifikasiyalar*",
    keySpecsFootnote: "* Spesifikasiyalar rəng və növə görə fərqlənə bilər. Göstərilən dəyərlər tipikdir və normal istehsala əsaslandırılıb.",
    colorOptionsValue: "Şəffaf, Açıq Mavi, Yaşıl, Qarışıq",
    howWeWorkTitle: "Necə İşləyirik",
    finalCtaTitle: "Daha təmiz gələcəyi birlikdə quraq.",
    finalCtaDescription: "Məhsul məlumatı və ya fərdi həll üçün komandamızla əlaqə saxlayın.",
  },

  processCapabilities: [
    "Qabaqcıl çeşidləmə və rəng ayırma xətləri",
    "Çoxmərhələli isti yuyulma sistemi",
    "Yüksək effektivlikli sürtünmə ilə yuyulma və üzmə/batma ayırması",
    "Avtomatlaşdırılmış qurutma və hava klassifikasiyası",
    "Metal detektoru və yekun yoxlama",
    "1100–1250 kq böyük çantalarda toplu qablaşdırma",
    "Ciddi proses nəzarəti ilə gündəlik istehsal",
  ],

  qualityControl: [
    "Rətubət testi",
    "PVC, etiket və yapışqan təhlili",
    "Rəng və vizual yoxlama",
    "Çirklənmə və yad maddə yoxlaması",
    "Girişdən göndərişə qədər partiya izlənəbilənliyi",
    "Hər göndəriş üçün COA (Analiz Sertifikatı)",
    "Tam ixrac sənədləşmə dəstəyi",
  ],

  qaPillars: [
    { title: "Sabit Keyfiyyət", description: "Standartlaşdırılmış proseslər və qabaqcıl avadanlıq hər partiyada sabit, yüksək keyfiyyətli rPET fleks təmin edir." },
    { title: "İzlənə Bilən Əməliyyatlar", description: "Toplamadan göndərişə qədər tam şəffaflıq və hesabatlılıq üçün uçdan-uca izlənəbilənlik." },
    { title: "İxrac Sənədləşməsi", description: "Beynəlxalq ticarət üçün kommersiya və göndəriş sənədləri hazırlanır." },
    { title: "Proses Şəffaflığı", description: "Açıq kommunikasiya və aydın məlumat qlobal tərəfdaşlarımızla uzunmüddətli etimad qurmağa kömək edir." },
  ],

  keySpecs: [
    { label: "Rətubət" },
    { label: "PVC Miqdarı" },
    { label: "Etiket və Yapışqan" },
    { label: "Digər Plastiklər" },
    { label: "Çeşidlənmiş Xammal" },
    { label: "Qablaşdırma (Böyük Çanta)" },
    { label: "Rəng Seçimi" },
  ],

  howWeWork: [
    { title: "Sorğu", description: "Tələblərinizi və hədəf spesifikasiyalarınızı bizimlə paylaşın." },
    { title: "Təklif və Nümunələr", description: "Biz təklif təqdim edirik və təsdiq üçün nümunə təyin edirik." },
    { title: "Sifariş Təsdiqi", description: "Sifarişi, spesifikasiyaları, qablaşdırma və çatdırılma qrafikini təsdiqləyin." },
    { title: "İstehsal və QC", description: "Hər mərhələdə ciddi keyfiyyət nəzarəti ilə istehsal edirik." },
    { title: "Göndəriş", description: "Tam ixrac sənədləri ilə vaxtında göndəriş." },
    { title: "Satış Sonrası Dəstək", description: "Davamlı dəstək və uzunmüddətli tərəfdaşlıq üçün sizinlə qalırıq." },
  ],

  sustainability: {
    heroTitle: "Tullantıdan",
    heroTitleAccent: "Dəyərə",
    heroDescription:
      "Poly Cleaner üçün dayanıqlılıq fəaliyyətimizin mərkəzində dayanır. Biz istifadə olunmuş PET tullantılarını yüksək keyfiyyətli rPET fleksə çevirərək dairəvi iqtisadiyyatı və daha təmiz bir gələcəyi dəstəkləyirik.",
    trustStrip: [
      { title: "Dairəvi İqtisadiyyat", description: "Materialları daha uzun müddət istifadədə saxlamaq" },
      { title: "İzlənə Bilən və\nSənədləşdirilmiş", description: "Mənbədən fleksə qədər tam şəffaflıq" },
      { title: "Məsuliyyətli\nƏməliyyatlar", description: "İnsanlar və planet üçün yüksək standartlar" },
      { title: "Tullantıdan\nDəyərə", description: "Daha yaxşı bir sabah üçün yüksək keyfiyyətli rPET yaratmaq" },
    ],
    bottleToFlakeTitle: "Şüşələrdən Yüksək Keyfiyyətli rPET Fleksə",
    pillarsTitle: "Dayanıqlılıq Prinsiplərimiz",
    plasticCreditHeading: "Əməliyyatlarımızdan Kənarda Müsbət Təsir Yaratmaq",
    plasticCreditDescription:
      "Biz plastik tullantının ətrafa yayılmasının qarşısını almağa kömək edən plastik kredit layihələrini dəstəkləyirik. Bu layihələr tullantı idarəetmə infrastrukturu məhdud olan icmalarda təsdiqlənmiş ekoloji və sosial fayda yaradır.",
    plasticCreditLink: "Təsir yanaşmamız haqqında daha çox",
    plasticCreditBadgeTitle: "Plastik Kredit\nDəstəklənir",
    plasticCreditBadgeDescription: "Daha təmiz ətraf mühit və daha yaxşı həyat şəraiti üçün töhfə.",
    impactAtGlanceTitle: "Təsir Bir Baxışda",
    impactFootnote: "Rəqəmlər təxmini illik təsiri əks etdirir və böyüdükcə yaxşılaşır.",
    finalCtaDescription: "Etibarlı, yüksək keyfiyyətli rPET fleks və ölçülə bilən dayanıqlılıq üçün Poly Cleaner ilə tərəfdaş olun.",
  },

  impactCards: [
    {
      title: "Dairəvi İqtisadiyyat",
      description: "Post-consumer PET tullantılarını yeni məhsullar üçün dəyərli xammala çevirərək dövrəni bağlayırıq.",
    },
    {
      title: "Tullantının Azaldılması",
      description: "Prosesimiz plastik tullantını poliqonlardan və okeanlardan uzaqlaşdırır, ekoloji izi azaldır.",
    },
    {
      title: "Məsuliyyətli Əməliyyatlar",
      description: "Enerji-effektiv texnologiyalar, ciddi keyfiyyət nəzarəti və təhlükəsiz iş şəraiti gündəlik əməliyyatlarımıza rəhbərlik edir.",
    },
    {
      title: "Uzunmüddətli Təsir",
      description: "Davamlı sosial, ekoloji və iqtisadi dəyər yaratmaq üçün tərəfdaşlıq və innovasiyaya investisiya edirik.",
    },
  ],

  sustainabilitySteps: [
    { name: "Toplama", description: "Post-consumer PET şüşələri toplanır." },
    { name: "Çeşidləmə", description: "Şüşələr rəng və növünə görə çeşidlənir." },
    { name: "Yuma", description: "İsti yuyulma etiket, yapışqan və çirki təmizləyir." },
    { name: "Qurutma", description: "Təmiz fleks üçün rütubət təmizlənir." },
    { name: "Xırdalama", description: "Şüşələr eyni ölçülü fleksə xırdalanır." },
    { name: "Keyfiyyətə Nəzarət", description: "Ciddi test sabit keyfiyyəti təmin edir." },
    { name: "Yüksək Keyfiyyətli rPET Fleks", description: "İstehsalınız üçün hazırdır." },
  ],

  sustainabilityPillars: [
    { title: "Dayanıqlı Təchizat", description: "Təbii resursları qorumaq üçün istifadə olunmuş PET-in məsuliyyətli təchizatına üstünlük veririk." },
    { title: "İnnovasiya və Effektivlik", description: "Daha az enerji, daha az su istifadə etmək və daha az tullantı yaratmaq üçün proseslərimizi davamlı təkmilləşdiririk." },
    { title: "İnsanlar və Təhlükəsizlik", description: "Komandamızın rifahı və təhlükəsizliyi dayanıqlı böyüməyimiz üçün əsasdır." },
    { title: "Tərəfdaşlıqlar", description: "Daha güclü və məsuliyyətli dəyər zənciri qurmaq üçün təchizatçılar, müştərilər və icmalarla işləyirik." },
    { title: "Şəffaflıq", description: "Tərəfdaşlarımızın əminliklə dayanıqlı seçim edə bilməsi üçün açıq, təsdiqlənə bilən məlumat təqdim edirik." },
  ],

  impactStats: [
    { value: "20,000+", title: "TON", description: "İldə istehsal olunan rPET fleks" },
    { value: "800M+", title: "ŞÜŞƏ", description: "Hər il poliqonlardan uzaqlaşdırılan" },
    { value: "-30%", title: "SU İSTİFADƏSİ", description: "Sənaye ortalaması ilə müqayisə" },
    { value: "-25%", title: "ENERJİ İSTİFADƏSİ", description: "Effektiv proseslər sayəsində" },
    { value: "Müsbət", title: "SOSİAL TƏSİR", description: "Yerli iş yerlərini və icmaları dəstəkləyir" },
  ],

  documents: {
    heroCrumb: "Sənədlər > Alıcı Sənədləri",
    heroTitle: "Alıcı",
    heroTitleAccent: "Sənədləri",
    heroDescription:
      "Poly Cleaner-i qiymətləndirmək, təsdiqləmək və əməkdaşlıq etmək üçün ehtiyac duyduğunuz bütün sənədlər. Təsdiqlənmiş, yenilənmiş və qlobal ticarət üçün hazırlanmış.",
    heroTrustItems: [
      { label: "Təsdiqlənmiş və\nYenilənmiş" },
      { label: "Sürətli və Asan\nÇıxış" },
      { label: "Etibarlı\nMəlumat" },
      { label: "Qlobal Ticarət\nüçün Hazır" },
    ],
    infoBanner:
      "Bütün sənədlər PDF formatında mövcuddur. Başqa format və ya əlavə məlumat lazımdır? Bizimlə əlaqə saxlayın, məmnuniyyətlə kömək edərik.",
    taropakMeet: (name: string) => `${name}-da bizimlə görüşün`,
    taropakTagline: "Poly Cleaner komandası ilə rPET fleks ehtiyaclarınızı müzakirə edin və əməkdaşlıq imkanlarını kəşf edin.",
    taropakButton: "Görüş Sorğusu",
    faqTitle: "Tez-tez Verilən Suallar",
    allDocuments: "Hamısı",
    categories: {
      Company: "Şirkət",
      Product: "Məhsul",
      Quality: "Keyfiyyət",
      Sustainability: "Dayanıqlılıq",
    } as Record<string, string>,
    buyerPackTitle: "Fərdi alıcı paketi əldə edin",
    buyerPackDescription:
      "Ehtiyaclarınıza uyğun, paylaşılmaya hazır əsas sənədlər paketi ilə vaxta qənaət edin.",
    buyerPackButton: "Alıcı Paketi İstə",
    buyerPackFootnote: "Sürətli • Etibarlı • Tam",
  },

  documentList: [
    { name: "Şirkət Profili", description: "Şirkət strukturu, fəaliyyət tarixçəsi və ümumi imkanlar." },
    { name: "Məhsul Təklifi Vərəqəsi", description: "Növlər, rənglər və kommersiya təklifi xülasəsi." },
    { name: "Texniki Məlumat Vərəqəsi (TDS)", description: "Fiziki və kimyəvi xüsusiyyətlər, spesifikasiyalar və tətbiq qeydləri." },
    { name: "İzlənəbilənlik Qeydi", description: "Xammalın zəncirvari izlənəbilənliyi və partiya izləməsi." },
    { name: "Proses İcmalı", description: "İstehsal və keyfiyyət prosesimizin addım-addım icmalı." },
    { name: "Dayanıqlılıq Qeydi", description: "Məsuliyyətli təchizat və ekoloji təsir yanaşmamız." },
  ],

  documentsFaq: [
    {
      q: "Nümunəni necə sifariş edə bilərəm?",
      a: "Bu səhifədəki və ya Əlaqə səhifəsindəki \"Nümunə İstə\" düyməsindən istifadə edin, satış komandamız qiymətləndirməniz üçün nümunə hazırlayacaq.",
    },
    {
      q: "TDS və ya COA sənədini necə tələb edə bilərəm?",
      a: "Bu səhifədəki sənəd sorğusu formu vasitəsilə və ya birbaşa satış komandamızla əlaqə saxlayaraq Texniki Məlumat Vərəqi və ya Analiz Sertifikatı tələb edin.",
    },
    {
      q: "İxrac sənədləri təqdim edirsiniz?",
      a: "Bəli. Sifariş təsdiqləndikdən sonra hər göndəriş üçün beynəlxalq ticarət üçün lazım olan kommersiya və göndəriş sənədlərini hazırlayırıq.",
    },
    {
      q: "Sənədləri başqa dildə əldə edə bilərəmmi?",
      a: "Sənədlərin əksəriyyəti ingilis dilində mövcuddur. Başqa dillər üçün komandamızla əlaqə saxlayın, sorğunuzu qəbul etməyə çalışacağıq.",
    },
  ],

  documentRequestForm: {
    heading: "Fərdi sənəd paketi lazımdır?",
    subtext: "Nəyə ehtiyacınız olduğunu bizə bildirin, sizin üçün fərdi paket hazırlayaq.",
    documentTypeLabel: "Sənəd Növü",
    notesLabel: "Əlavə Qeydlər",
    notesPlaceholder: "Sorğunuz haqqında daha ətraflı məlumat verin",
    submit: "Alıcı Sənədlərini İstə",
    footnote: "Məlumatlarınız təhlükəsizdir • 24 saat ərzində cavab",
    successTitle: "Sorğu qəbul edildi.",
    successDescription: "Komandamız tezliklə sənəd paketinizi hazırlayacaq.",
    sendAnother: "Yeni sorğu göndər",
    documentTypeOptions: ["Qablaşdırma Vərəqəsi (Packing List)", "CMR", "Mənşə Sertifikatı", "Hesab-faktura (Invoice)", "Satınalma Sifarişi", "Keyfiyyət Pasportu"],
    fullName: "Ad Soyad",
    fullNamePlaceholder: "Ad və soyadınızı daxil edin",
    company: "Şirkət",
    companyPlaceholder: "Şirkətinizin adını daxil edin",
    email: "Email",
    emailPlaceholder: "Email ünvanınızı daxil edin",
  },

  contact: {
    heroTitle: "Poly Cleaner ilə",
    heroTitleAccent: "Əlaqə",
    heroDescription:
      "Yüksək keyfiyyətli rPET həlləri və etibarlı xidmətlə biznesinizi dəstəkləməyə hazırıq. Sorğular, nümunələr, təkliflər və əməkdaşlıq imkanları üçün komandamızla əlaqə saxlayın.",
    heroItems: [
      { title: "Etibarlı Keyfiyyət", description: "Etibar edə biləcəyiniz sabit rPET keyfiyyəti." },
      { title: "Uzunmüddətli Tərəfdaşlıq", description: "Etimad üzərində qurulmuş şəffaf əməkdaşlıq." },
      { title: "Qlobal Dəstək", description: "Harada olursunuzsa olun, operativ xidmət." },
    ],
    formTitle: "Bizə Mesaj Göndərin",
    formIntro: "Aşağıdakı formu doldurun, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.",
    infoTitle: "Əlaqə Məlumatları",
    findUsTitle: "Bizi Tapın",
    findUsDescription:
      "Müəssisəmiz Balaxanı Sənaye Parkında yerləşir, effektiv logistika və qlobal göndəriş üçün strateji baxımdan əlverişli mövqedədir.",
    getDirections: "Yol Göstər",
    directionsHint: "Telefonda tətbiq birbaşa açılır.",
    coordinates: "Koordinatlar",
    copy: "Kopyala",
    copied: "Kopyalandı",
    mapView: "Xəritə",
    satelliteView: "Peyk",
    quickCards: [
      { title: "Təklif İstə", description: "Tələb olunan rPET fleks spesifikasiyalarınız üçün fərdi təklif alın.", cta: "rPET Fleks Təklifi İstə" },
      { title: "Nümunə İstə", description: "rPET fleks keyfiyyətimizi qiymətləndirmək üçün nümunə alın.", cta: "Nümunə İstə" },
      { title: "TAROPAK Görüşü Təyin Et", description: "Poznań, Polşada TAROPAK 2026-da bizimlə görüşün.", cta: "Görüş Təyin Et" },
    ],
  },

  contactInfo: [
    { label: "Satış Email", sub: "Adətən 24 saat ərzində cavab veririk." },
    { label: "Telefon / WhatsApp", sub: "B.e – C, 09:00 – 18:00 (GMT+4)" },
    { label: "Yerləşmə", sub: "Zavod və Baş Ofis" },
    { label: "Veb sayt", sub: "Məhsul və xidmətlərimiz haqqında daha çox." },
    { label: "İş Dilləri", value: "İngilis • Rus • Türk • Azərbaycan", sub: "Sizin dilinizdə dəstək oluruq." },
  ],

  inquiryTypes: [
    { value: "offer", label: "rPET Fleks Təklifi İstə" },
    { value: "sample", label: "Nümunə İstə" },
    { value: "taropak", label: "TAROPAK Görüşü Təyin Et" },
    { value: "amiExpo", label: "AMI Expo Görüşü Təyin Et" },
    { value: "documents", label: "Alıcı Sənədlərini İstə" },
    { value: "general", label: "Ümumi / Satış Komandası ilə Əlaqə" },
    { value: "partner", label: "Tərəfdaş Olun" },
  ],

  inquiryModal: {
    offerTitle: "rPET Fleks Təklifi İstə",
    offerSubtitle: "Tələblərinizi bizə bildirin, satış komandamız şirkətiniz üçün fərdi təklif hazırlasın.",
    defaultSubtitle: "Aşağıdakı formu doldurun, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.",
    fallbackTitle: "Sorğu Göndər",
  },

  forms: {
    fullName: "Ad Soyad",
    fullNamePlaceholder: "Adınız və soyadınız",
    companyName: "Şirkət Adı",
    companyNamePlaceholder: "Şirkətinizin adı",
    companyNamePlaceholder2: "Şirkət MMC",
    country: "Ölkə",
    countryPlaceholder: "Ölkənizi seçin",
    countryPlaceholder2: "Ölkə seçin",
    email: "Email",
    emailAddress: "Email Ünvanı",
    emailPlaceholder: "ad@sirket.com",
    phone: "Telefon / WhatsApp",
    phonePlaceholder: "+00 000 000 0000",
    phonePlaceholder2: "+48 123 456 789",
    productInterest: "Məhsul Maraqı",
    selectProduct: "Məhsul seçin",
    monthlyVolume: "Aylıq Həcm",
    monthlyVolumePlaceholder: "məs. 20-40 MT",
    requiredVolume: "Tələb Olunan Həcm",
    selectVolume: "Həcm seçin",
    application: "Tətbiq Sahəsi",
    selectApplication: "Tətbiq seçin",
    deliveryDestination: "Çatdırılma Ölkəsi",
    deliveryDestinationPlaceholder: "Polşa, Almaniya, Niderland, Türkiyə və s.",
    deliveryAddress: "Çatdırılma Ünvanı",
    deliveryAddressPlaceholder: "Küçə, şəhər, poçt indeksi, ölkə",
    sampleType: "Nümunə Növü",
    selectSampleType: "Nümunə növünü seçin",
    courierAccount: "Kuryer Hesabı",
    courierAccountPlaceholder: "məs. DHL Hesab #123456789",
    attachments: "Əlavələr",
    attachmentsHint: "Şəkil, PDF, Word və ya Excel — maksimum 3 fayl, hər biri 5MB-a qədər.",
    chooseFiles: "Yükləmək üçün klikləyin və ya faylı bura sürükləyin",
    tooManyFiles: "Maksimum 3 fayl əlavə edə bilərsiniz.",
    fileTooLarge: "Hər bir fayl 5MB-dan az olmalıdır.",
    fileTypeNotAllowed: "Şəkil, PDF, Word və ya Excel faylı əlavə edə bilərsiniz.",
    companyOrganisation: "Şirkət / Təşkilat",
    city: "Şəhər",
    cityPlaceholder: "Şəhəriniz",
    emailOrPhoneNote: "Zəhmət olmasa email ünvanı və ya telefon nömrəsi qeyd edin.",
    partnershipInterest: "Əməkdaşlıq Növü",
    selectPartnershipType: "Əməkdaşlıq növünü seçin",
    partnershipInterestOptions: [
      "PET butulka təchizatı",
      "Tullantıların toplanması üzrə əməkdaşlıq",
      "Logistika və daşınma",
      "Distribütorluq və satış tərəfdaşlığı",
      "Digər əməkdaşlıq",
    ],
    message: "Mesaj",
    messageOptional: "(könüllü)",
    messagePlaceholder: "Tələbləriniz haqqında bizə bildirin...",
    messagePlaceholderOffer: "Tələb etdiyiniz məhsulu, hədəf həcmi, çatdırılma şərtlərini və ya xüsusi spesifikasiyaları təsvir edin.",
    selectOption: "Bir seçim edin",
    searchPlaceholder: "Axtar...",
    noMatches: "Nəticə tapılmadı",
    consentPrivacy: "Məxfilik Siyasətinə uyğun olaraq şəxsi məlumatlarımın emalına razılıq verirəm.",
    consentContact: "Poly Cleaner-in sorğum barəsində mənimlə əlaqə saxlamasına razılıq verirəm.",
    consentDataUse: "Məlumatlarınız yalnız sorğunuza cavab vermək üçün istifadə olunacaq.",
    secureNote: "Məlumatlarınız təhlükəsizdir və yalnız sorğunuza cavab vermək üçün istifadə olunacaq.",
    requiredNote: "* ilə işarələnmiş bütün sahələr məcburidir.",
    cancel: "Ləğv Et",
    sendMessage: "Mesaj Göndər",
    sendRequest: "Sorğu Göndər",
    sendAnotherInquiry: "Yeni sorğu göndər",
    inquiryDetails: "Sorğu Məlumatları",
    referenceLabel: "Sorğu nömrəsi",
    sendAnotherRequest: "Yeni sorğu göndər",
    thankYouInquiry: "Təşəkkür edirik — sorğunuz göndərildi.",
    thankYouInquirySub: "Komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq.",
    thankYouOffer: "Təşəkkür edirik. Sorğunuz qəbul edildi.",
    thankYouOfferSub: "Satış komandamız tezliklə sizinlə əlaqə saxlayacaq.",
    genericError: "Nəsə səhv getdi. Zəhmət olmasa yenidən cəhd edin.",
    genericErrorContact: "Nəsə səhv getdi. Zəhmət olmasa yenidən cəhd edin və ya birbaşa email ilə bizimlə əlaqə saxlayın.",
    productInterestOptions: [
      "Şəffaf rPET Fleks",
      "Açıq Mavi rPET Fleks",
      "Yaşıl rPET Fleks",
      "Qarışıq Rənglər rPET Fleks",
      "Xüsusi Spesifikasiya",
      "Ümumi Sorğu",
    ],
    offerProductInterestOptions: [
      "Şəffaf rPET Fleks",
      "Açıq Mavi rPET Fleks",
      "Yaşıl rPET Fleks",
      "Qarışıq Rəng rPET Fleks",
      "Bir Neçə Məhsul",
      "Hələ Əmin Deyiləm",
    ],
    offerVolumeOptions: ["Yalnız nümunə", "1–5 MT", "20–25 MT Sınaq Sifarişi", "50–100 MT", "Müntəzəm aylıq təchizat", "Digər"],
    offerApplicationOptions: ["PET Lövhə / Termoformalaşdırma", "Qablaşdırma Çəmbəri", "Polyester Lif", "Qida Qablaşdırma", "Qeyri-Qida Qablaşdırma", "Ticarət / Distribusiya", "Digər"],
    sampleTypeOptions: ["500q Nümunə", "1kq Nümunə", "2kq Nümunə", "5kq Nümunə", "Fərdi Miqdar"],
  },

  notFound: {
    title: "Səhifə tapılmadı",
    description: "Axtardığınız səhifə mövcud deyil və ya köçürülüb.",
  },

  legal: {
    privacyTitle: "Məxfilik Siyasəti",
    privacyParagraph1:
      "Poly Cleaner (\"biz\") sizin məxfiliyinizə hörmət edir. Əlaqə və sorğu formaları vasitəsilə təqdim olunan məlumatlar (ad, şirkət, email, telefon və mesaj) yalnız sorğunuza cavab vermək üçün istifadə olunur və marketinq məqsədilə üçüncü tərəflərə satılmır və ya paylaşılmır.",
    privacyParagraph2:
      "Bu saytı işlətmək üçün zəruri çərəzlərdən (cookie), aktiv olduqda isə sayt istifadəsini anlamaq üçün analitik çərəzlərdən istifadə edirik. Çərəz tərcihlərinizi brauzer parametrləriniz vasitəsilə idarə edə bilərsiniz.",
    privacyContactPrefix: "Məlumatlarınızın necə idarə olunduğu barədə suallarınız varsa, bizimlə əlaqə saxlayın:",
    termsTitle: "İstifadə Şərtləri",
    termsParagraph1:
      "Bu saytdan istifadə edərək, onu yalnız qanuni məqsədlər üçün istifadə etməyə razılıq verirsiniz. Göstərilən məzmun, spesifikasiyalar və qiymətlər məlumat xarakterlidir və Poly Cleaner ilə rəsmi təklif və ya müqavilədə təsdiqlənməlidir.",
    termsParagraph2:
      "Bu saytdakı bütün ticarət nişanları, loqolar və məzmun, əks halda qeyd olunmayıbsa, Poly Cleaner-nin mülkiyyətidir və əvvəlcədən yazılı razılıq olmadan çoxaldıla bilməz.",
    termsContactPrefix: "Bu şərtlərlə bağlı suallarınız üçün bizimlə əlaqə saxlayın:",
  },
} satisfies typeof en;

export const translations: Record<Locale, typeof en> = { en, az };

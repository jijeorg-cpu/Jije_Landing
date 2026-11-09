/** User-supplied public domain; never derive public canonicals from preview hosts. */
export const SITE_ORIGIN = "https://jije.ca";
export const SOCIAL_IMAGE = `${SITE_ORIGIN}/jije-social.png`;
export const SITE_NAME = "Jíjé";
export const STRUCTURED_DATA_ID = "jije-site-identity";

// Add sameAs only for profiles whose ownership has been confirmed by Jíjé.
export const OFFICIAL_SOCIAL_PROFILES: string[] = [];

export function siteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Jíjé Group",
        legalName: "Jíjé Group Inc.",
        alternateName: ["Jíjé", "Jije", "Jije Group", "Jije Group Inc.", "JÍJÉ Group Inc."],
        url: `${SITE_ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}/jije-icon-v2.png`,
        },
        brand: [
          { "@type": "Brand", name: "Jíjé Marketplace", alternateName: "Jije Marketplace", url: `${SITE_ORIGIN}/marketplace` },
          { "@type": "Brand", name: "Jíjé Intelligence", alternateName: "Jije Intelligence", url: `${SITE_ORIGIN}/intelligence` },
        ],
        ...(OFFICIAL_SOCIAL_PROFILES.length ? { sameAs: OFFICIAL_SOCIAL_PROFILES } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: SITE_NAME,
        alternateName: ["Jije", "Jíjé Group", "Jije Group"],
        url: `${SITE_ORIGIN}/`,
        inLanguage: "en-CA",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
    ],
  };
}

/** Safe inside an HTML script block as well as with DOM textContent. */
export function serializedSiteStructuredData() {
  return JSON.stringify(siteStructuredData()).replace(/</g, "\\u003c");
}

export interface SiteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  index: boolean;
}

export const sitePages: Record<string, Omit<SiteMetadata, "canonicalPath" | "index">> = {
  "/": {
    title: "Jíjé Group | African & Afro-Caribbean Food and Culture",
    description: "Discover Jíjé Group Inc. (Jije), the company behind Jíjé Marketplace and Jíjé Intelligence, connecting African and Afro-Caribbean food, culture and technology.",
  },
  "/about": {
    title: "About Jíjé Group Inc. | Our Mission, Vision and Culture",
    description: "Learn about Jíjé Group Inc., our mission and vision, and how Jíjé Marketplace and Jíjé Intelligence connect African and Afro-Caribbean food culture and knowledge.",
  },
  "/marketplace": {
    title: "Jíjé Marketplace | African & Afro-Caribbean Food Pilot",
    description: "Explore Jíjé Marketplace's planned Toronto/GTA pilot for African and Afro-Caribbean food and groceries. Join the waitlist or register business or delivery interest.",
  },
  "/intelligence": {
    title: "Jíjé Intelligence | Food Knowledge, Culture and Research",
    description: "Explore Jíjé Intelligence, a developing initiative for African and Afro-Caribbean food knowledge, nutritional context, culturally aware discovery and research.",
  },
  "/contact": {
    title: "Contact Jíjé Group | Partnerships and General Inquiries",
    description: "Contact Jíjé Group for community, research, technology and partnership inquiries, or find business and delivery interest forms for the Toronto/GTA Marketplace pilot.",
  },
  "/vendors": {
    title: "Grow Your Business with JÍJÉ | Vendor Pilot",
    description: "Register your Toronto/GTA restaurant or grocery store's interest in the JÍJÉ Marketplace pilot. Chefs and caterers can register for future opportunities.",
  },
  "/drivers": {
    title: "Deliver with JÍJÉ | Driver Pilot",
    description: "Register your interest in the JÍJÉ Marketplace delivery pilot in Toronto and the GTA. Learn about eligibility and next steps; submitting interest is not approval.",
  },
  "/privacy": {
    title: "Privacy Policy | JÍJÉ",
    description: "Read the approved JÍJÉ Group Inc. Privacy Policy and download the PDF. Learn how personal information and interest-form submissions are handled.",
  },
  "/terms": {
    title: "Terms of Service | JÍJÉ",
    description: "Read the approved JÍJÉ Group Inc. Terms of Service and download the PDF for the website, Marketplace, and interest forms.",
  },
};

export function getSiteMetadata(pathname: string): SiteMetadata {
  const path = ["/partners", "/partnerships"].includes(pathname) ? "/contact" : pathname;
  const page = sitePages[path];
  return page
    ? { ...page, canonicalPath: path, index: true }
    : {
      title: "Page Not Found | JÍJÉ",
      description: "This page could not be found. Explore JÍJÉ, JÍJÉ Marketplace, or JÍJÉ Intelligence.",
      canonicalPath: pathname,
      index: false,
    };
}

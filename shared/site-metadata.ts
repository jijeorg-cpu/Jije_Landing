/** User-supplied public domain; never derive public canonicals from preview hosts. */
export const SITE_ORIGIN = "https://jije.ca";
export const SOCIAL_IMAGE = `${SITE_ORIGIN}/jije-social.png`;

export interface SiteMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  index: boolean;
}

export const sitePages: Record<string, Omit<SiteMetadata, "canonicalPath" | "index">> = {
  "/": {
    title: "JÍJÉ | Rooted in Culture. Powered by Intelligence.",
    description: "JÍJÉ connects African and Afro-Caribbean food, cultural knowledge, commerce, and technology through JÍJÉ Marketplace and JÍJÉ Intelligence.",
  },
  "/about": {
    title: "About JÍJÉ | Our Mission and Vision",
    description: "Meet JÍJÉ Group Inc., the parent company behind JÍJÉ Marketplace and the developing JÍJÉ Intelligence initiative. Explore our mission, vision, and approach.",
  },
  "/marketplace": {
    title: "JÍJÉ Marketplace | Your Culture, Delivered.",
    description: "JÍJÉ Marketplace is preparing its Toronto/GTA pilot for African and Afro-Caribbean groceries, meals, and food businesses. Join the waitlist or register vendor and delivery interest.",
  },
  "/intelligence": {
    title: "JÍJÉ Intelligence | Cultural Knowledge. Real-World Intelligence.",
    description: "Explore JÍJÉ Intelligence, a developing initiative focused on African and Afro-Caribbean food knowledge, culturally aware discovery, research, and future technology.",
  },
  "/partnerships": {
    title: "Partnerships | Build with JÍJÉ",
    description: "Explore vendor, delivery partner, community, research, and technology partnership inquiries with JÍJÉ and its Toronto/GTA Marketplace pilot.",
  },
  "/contact": {
    title: "Contact JÍJÉ | General and Partnership Inquiries",
    description: "Contact JÍJÉ through our existing partnership inquiry form, or register your interest as a Marketplace vendor or delivery partner.",
  },
  "/vendors": {
    title: "Grow Your Business with JÍJÉ | Vendor Pilot",
    description: "Register your Toronto/GTA food business's interest in the JÍJÉ Marketplace pilot. For African and Afro-Caribbean restaurants, markets, chefs, and caterers.",
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
  const path = pathname === "/partners" ? "/partnerships" : pathname;
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

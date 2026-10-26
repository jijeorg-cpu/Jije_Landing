import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  ArrowDown,
  ArrowRight,
  CircleCheck,
  ClipboardList,
  Compass,
  Handshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Store,
  Truck,
  Utensils,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export type RecruitmentRole = "vendor" | "driver";

type RecruitmentCopy = {
  eyebrow: string;
  headline: string;
  emphasis: string;
  intro: string;
  audience: string;
  benefits: { title: string; body: string; icon: typeof Store }[];
  steps: { title: string; body: string }[];
  formTitle: string;
  formIntro: string;
  pageTitle: string;
  metaDescription: string;
};

const copy: Record<RecruitmentRole, RecruitmentCopy> = {
  vendor: {
    eyebrow: "Toronto & GTA food businesses",
    headline: "Grow Your Business",
    emphasis: "with Jíjé",
    intro: "Bring your African and Afro-Caribbean food, groceries, and products to more customers. We're inviting restaurants, grocery stores, chefs, and caterers across Toronto and the GTA to join Jíjé.",
    audience: "Restaurants, grocery and market owners, chefs, caterers, and other food businesses.",
    benefits: [
      { title: "Reach new customers", body: "Connect with people looking for authentic African and Afro-Caribbean foods and products.", icon: Compass },
      { title: "Grow your visibility", body: "Help more customers discover your business through a marketplace built around this community.", icon: Utensils },
      { title: "Get onboarding support", body: "If invited to continue, the Jíjé team will guide you through initial onboarding and store setup.", icon: Handshake },
      { title: "Prepare for online ordering", body: "Explore access to online ordering and delivery opportunities as these features launch in your area.", icon: Store },
    ],
    steps: [
      { title: "Submit your business details", body: "Tell us about your business, what you offer, and where you are located." },
      { title: "Our team reviews your interest", body: "We’ll follow up about your application and share any questions or next steps." },
      { title: "Complete onboarding when invited", body: "If invited to continue, work with our team on onboarding and business setup." },
      { title: "Prepare for service launch", body: "Get ready to reach customers when the service launches in your area." },
    ],
    formTitle: "List your business",
    formIntro: "Tell us a little about your business. This is an expression of interest in the Toronto/GTA pilot, not a commitment.",
    pageTitle: "Grow Your Business with Jíjé | Vendor Pilot",
    metaDescription: "Introduce your Toronto or GTA food business to Jíjé. Share your interest in the African and Afro-Caribbean food marketplace pilot.",
  },
  driver: {
    eyebrow: "Delivery partners · Toronto & GTA",
    headline: "Deliver",
    emphasis: "with Jíjé",
    intro: "Explore flexible delivery opportunities while helping connect people with the African and Afro-Caribbean food and groceries they love. We're inviting delivery partners in Toronto and the GTA to register their interest.",
    audience: "For people interested in helping local food businesses bring orders to their neighbours.",
    benefits: [
      { title: "Flexible opportunities", body: "Share your availability and explore delivery opportunities as the Toronto/GTA pilot takes shape.", icon: Compass },
      { title: "Potential to earn per delivery", body: "The model is still being developed; details will be shared before any onboarding or commitment.", icon: Truck },
      { title: "Support local communities", body: "Help connect people with the African and Afro-Caribbean businesses in their neighbourhoods.", icon: Store },
      { title: "Guidance through onboarding", body: "Our team will explain eligibility requirements and next steps if you’re invited to continue.", icon: ShieldCheck },
    ],
    steps: [
      { title: "Register your interest", body: "Tell us how to reach you, where you’re based, and your vehicle type." },
      { title: "Our team reviews your application", body: "We’ll consider your information and follow up about next steps." },
      { title: "Complete eligibility checks and onboarding", body: "Vehicle eligibility and onboarding depend on local rules and the type of delivery work." },
      { title: "Deliver when approved and active", body: "Begin accepting deliveries only once you’re approved and service is active in your area." },
    ],
    formTitle: "Start your driver application",
    formIntro: "Share a few details so we can understand your interest in the Toronto/GTA delivery pilot. No sensitive ID or financial information is requested.",
    pageTitle: "Deliver with Jíjé | Driver Pilot",
    metaDescription: "Register your interest in delivering with Jíjé in Toronto and the GTA. Learn about the community-first delivery partner pilot.",
  },
};

type AnalyticsEvent = "page_view" | "recruitment_cta" | "recruitment_form_start" | "recruitment_application_success";
type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: AnalyticsEvent, parameters: Record<string, string>) => void;
  dataLayer?: Array<Record<string, string>>;
};

function track(eventName: AnalyticsEvent, role: RecruitmentRole, action?: string) {
  if (typeof window === "undefined") return;
  const event = { event: eventName, application_type: role, ...(action ? { action } : {}) };
  const analyticsWindow = window as AnalyticsWindow;
  try {
    if (typeof analyticsWindow.gtag === "function") {
      analyticsWindow.gtag("event", eventName, { application_type: role, ...(action ? { action } : {}) });
    } else if (Array.isArray(analyticsWindow.dataLayer)) analyticsWindow.dataLayer.push(event);
  } catch {
    // Analytics is optional; it must never interrupt an application.
  }
}

export function trackRecruitmentCTA(role: RecruitmentRole, action: string) {
  track("recruitment_cta", role, action);
}

function readServerMessage(responseText: string) {
  if (!responseText.trim()) return "";
  try {
    const parsed: unknown = JSON.parse(responseText);
    if (typeof parsed === "string") return parsed;
    if (parsed && typeof parsed === "object") {
      const candidate = parsed as { message?: unknown; error?: unknown };
      if (typeof candidate.message === "string") return candidate.message;
      if (typeof candidate.error === "string") return candidate.error;
    }
  } catch {
    return responseText.trim();
  }
  return "";
}

function optionalValue(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value ? value : undefined;
}

function makePayload(role: RecruitmentRole, formData: FormData) {
  const shared = {
    applicationType: role,
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    cityArea: String(formData.get("cityArea") ?? "").trim(),
    contactConsent: formData.get("contactConsent") === "true",
    faxNumber: "",
  };

  if (role === "vendor") {
    return {
      ...shared,
      applicationType: "vendor" as const,
      businessName: String(formData.get("businessName") ?? "").trim(),
      businessType: String(formData.get("businessType") ?? ""),
      businessAddress: optionalValue(formData, "businessAddress"),
      websiteOrInstagram: optionalValue(formData, "websiteOrInstagram"),
      businessDescription: optionalValue(formData, "businessDescription"),
      currentOperations: optionalValue(formData, "currentOperations"),
      additionalComments: optionalValue(formData, "additionalComments"),
      marketingConsent: false,
    };
  }

  const preferredAvailability = formData.getAll("preferredAvailability").map(String);
  return {
    ...shared,
    applicationType: "driver" as const,
    vehicleType: String(formData.get("vehicleType") ?? ""),
    isAtLeast18: formData.get("isAtLeast18") === "true",
    deliveryExperience: optionalValue(formData, "deliveryExperience"),
    ...(preferredAvailability.length ? { preferredAvailability } : {}),
    deliveryInterest: optionalValue(formData, "deliveryInterest"),
    additionalComments: optionalValue(formData, "additionalComments"),
  };
}

function InterestForm({ role, title, intro }: { role: RecruitmentRole; title: string; intro: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);

  function markFormStarted() {
    if (started.current) return;
    started.current = true;
    track("recruitment_form_start", role);
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    trackRecruitmentCTA(role, role === "vendor" ? "List Your Business" : "Start Delivering");
    const form = event.currentTarget;
    const payload = makePayload(role, new FormData(form));

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const responseText = await response.text();
      const serverMessage = readServerMessage(responseText);
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            serverMessage
              ? `${serverMessage} If you already applied, you don’t need to submit again.`
              : "An application may already exist for these details. If you already applied, you don’t need to submit again.",
          );
        }
        throw new Error(serverMessage || "We couldn’t submit your application. Please try again.");
      }
      setSubmitted(true);
      form.reset();
      track("recruitment_application_success", role);
    } catch (caught) {
      setError(caught instanceof TypeError
        ? "We couldn’t reach Jíjé just now. Check your connection and try again."
        : caught instanceof Error
          ? caught.message
          : "We couldn’t submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const confirmation =
      role === "vendor"
        ? "Thank you for your interest in partnering with Jíjé. We've received your information and our team will be in touch regarding next steps."
        : "Thanks for your interest in delivering with Jíjé! Your application has been received. Our team will reach out about eligibility and next steps.";
    return (
      <div className="rounded-2xl border border-primary/15 bg-[#f4f6ed] p-7 md:p-9" role="status" aria-live="polite">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CircleCheck aria-hidden="true" size={24} />
        </div>
        <p className="recruit-eyebrow text-primary">Application received</p>
        <h3 className="mt-3 text-3xl recruit-display">{confirmation}</h3>
        <Button type="button" variant="outline" className="mt-6 rounded-full border-primary/30" onClick={() => setSubmitted(false)}>
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submitApplication} onFocusCapture={markFormStarted} onChangeCapture={markFormStarted} className="space-y-5" aria-label={`${role} application form`}>
      <div>
        <p className="recruit-eyebrow text-primary">A quick introduction</p>
        <h3 className="mt-2 text-3xl recruit-display">{title}</h3>
        <p className="mt-3 leading-relaxed text-foreground/65">{intro}</p>
      </div>
      {error && (
        <div role="alert" className="rounded-xl border border-[#bd694d]/50 bg-[#fbefea] px-4 py-3 text-sm text-[#713a2a]">
          <p>{error}</p>
          <p className="mt-1">Your form details are still here. Review them, then try again.</p>
        </div>
      )}

      {role === "vendor" ? <VendorFields /> : <DriverFields />}

      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-foreground/75">
        <input className="mt-1 h-4 w-4 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" type="checkbox" name="contactConsent" value="true" required />
        <span>I agree that Jíjé may use the information I provide to review my application and contact me about the Toronto/GTA pilot. I understand this is not a partnership or work guarantee, and I can ask Jíjé to stop contacting me.</span>
      </label>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${role}-faxNumber`}>Fax number</label>
        <input id={`${role}-faxNumber`} name="faxNumber" type="text" tabIndex={-1} autoComplete="off" value="" readOnly />
      </div>

      <Button type="submit" disabled={submitting} className="h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-8">
        {submitting ? "Submitting…" : role === "vendor" ? "List Your Business" : "Start Delivering"}
        {!submitting && <ArrowRight aria-hidden="true" size={17} />}
      </Button>
      <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
        <p>Jíjé is preparing its Toronto/GTA pilot. Submitting this form does not create a partnership, employment relationship, or obligation.</p>
        <p>The Jíjé privacy policy link is not available on the current website. Please review this before launch.</p>
        {role === "driver" && <p>We will not ask for a government ID, SIN, banking details, or other financial information on this interest form.</p>}
      </div>
    </form>
  );
}

function VendorFields() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Business name" name="businessName" required placeholder="The name customers know" />
        <SelectField label="Business type" name="businessType" required options={["Restaurant", "Grocery/Market", "Chef", "Caterer", "Other"]} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" placeholder="First name" />
        <Field label="Last name" name="lastName" required autoComplete="family-name" placeholder="Last name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email address" name="email" type="email" required autoComplete="email" placeholder="you@business.ca" />
        <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" placeholder="For a follow-up" />
      </div>
      <Field label="City or area" name="cityArea" required placeholder="e.g. Scarborough" />
      <Field label="Business address (optional)" name="businessAddress" autoComplete="street-address" placeholder="Street address" />
      <Field label="Website or Instagram (optional)" name="websiteOrInstagram" placeholder="https://" />
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Current operations (optional)</span>
        <select className="recruit-field" name="currentOperations" defaultValue="">
          <option value="">Select an option</option>
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
          <option value="Both">Both</option>
        </select>
      </label>
      <TextArea label="Business description (optional)" name="businessDescription" rows={3} placeholder="What do you make, sell, or serve?" />
      <TextArea label="Additional comments (optional)" name="additionalComments" rows={3} placeholder="Anything else you would like us to know?" />
    </>
  );
}

function DriverFields() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" placeholder="First name" />
        <Field label="Last name" name="lastName" required autoComplete="family-name" placeholder="Last name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email address" name="email" type="email" required autoComplete="email" placeholder="you@example.ca" />
        <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" placeholder="For a follow-up" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City or area" name="cityArea" required placeholder="e.g. North York" />
        <SelectField label="Vehicle type" name="vehicleType" required options={["Car", "Bicycle", "E-bike", "Scooter/Motorcycle", "Other"]} />
      </div>
      <fieldset className="rounded-xl border border-primary/10 bg-[#f4f2e9] p-4">
        <legend className="px-1 text-sm font-semibold">Availability (optional)</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {["Weekdays", "Weekends", "Evenings", "Flexible"].map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-foreground/75">
              <input type="checkbox" name="preferredAvailability" value={option} className="h-4 w-4 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Delivery experience (optional)" name="deliveryExperience" options={["Yes", "No"]} />
        <SelectField label="Delivery interest (optional)" name="deliveryInterest" options={["Delivery only", "Shopping and delivery", "Either"]} />
      </div>
      <TextArea label="Additional comments (optional)" name="additionalComments" rows={3} placeholder="Anything else you would like us to know?" />
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary/10 bg-[#f4f2e9] p-4 text-sm leading-relaxed text-foreground/75">
        <input className="mt-1 h-4 w-4 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" type="checkbox" name="isAtLeast18" value="true" required />
        <span>I confirm that I am at least 18 years old.</span>
      </label>
    </>
  );
}

function Field(props: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{props.label}{props.required && <span aria-hidden="true" className="text-primary"> *</span>}</span>
      <input className="recruit-field" name={props.name} type={props.type ?? "text"} required={props.required} placeholder={props.placeholder} autoComplete={props.autoComplete} />
    </label>
  );
}

function SelectField({ label, name, options, required = false }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}{required && <span aria-hidden="true" className="text-primary"> *</span>}</span>
      <select className="recruit-field" name={name} required={required} defaultValue="">
        <option value="">{required ? "Select an option" : "Prefer not to say"}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TextArea(props: { label: string; name: string; required?: boolean; rows: number; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{props.label}{props.required && <span aria-hidden="true" className="text-primary"> *</span>}</span>
      <textarea className="recruit-field min-h-24 resize-y" name={props.name} required={props.required} rows={props.rows} placeholder={props.placeholder} />
    </label>
  );
}

export function CourierIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 500" role="img" aria-labelledby="courier-title courier-desc">
      <title id="courier-title">Jíjé delivery partner illustration</title>
      <desc id="courier-desc">A cheerful courier rides a bicycle with a Jíjé delivery bag through a warm, abstract city scene.</desc>
      <circle cx="293" cy="240" r="193" fill="#D9BF78" />
      <path d="M67 375c49-69 111-103 187-103 82 0 137 35 198 102H67Z" fill="#557A57" />
      <path d="M85 179h88v156H85zM102 147h54v32h-54zM403 212h65v125h-65zM414 179h44v33h-44z" fill="#F5EBD3" />
      <path d="M105 205h16v24h-16zm38 0h16v24h-16zm-38 47h16v24h-16zm38 0h16v24h-16zm274-12h14v20h-14zm31 0h14v20h-14zm-31 39h14v20h-14zm31 0h14v20h-14z" fill="#B9674C" />
      <circle cx="167" cy="387" r="51" fill="#F4E9D0" stroke="#174D32" strokeWidth="10" />
      <circle cx="384" cy="387" r="51" fill="#F4E9D0" stroke="#174D32" strokeWidth="10" />
      <path d="m167 387 68-95 56 95H167Zm68-95 54 3 95 92H291m-56-95-15-25m99 28 15-26" fill="none" stroke="#174D32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
      <circle cx="274" cy="207" r="42" fill="#8C503E" />
      <path d="M232 207c4-36 22-56 48-56 28 0 42 19 45 45-21-12-45-17-72-12l-21 23Z" fill="#174D32" />
      <path d="m244 247 42 12 39 73-35 42-65-31-9-46 28-50Z" fill="#BD694D" />
      <path d="m253 258 47 17 26 54-40 20-41-32 8-59Z" fill="#E4BE72" />
      <path d="m249 263-32 49-25 1m99-38 39 22 17 37" fill="none" stroke="#8C503E" strokeLinecap="round" strokeWidth="15" />
      <rect x="327" y="251" width="72" height="67" rx="9" transform="rotate(12 327 251)" fill="#174D32" />
      <path d="m347 270 28 6-3 15-28-6z" fill="#E4BE72" />
      <path d="m278 359-14 43m48-35 16 38" stroke="#8C503E" strokeLinecap="round" strokeWidth="17" />
      <path d="m275 403-23 7m82-7 21 8" stroke="#174D32" strokeLinecap="round" strokeWidth="11" />
      <path d="M75 114c31-20 57-23 79-9M393 97c19-13 41-14 65-3" fill="none" stroke="#F5EBD3" strokeLinecap="round" strokeWidth="9" />
      <circle cx="365" cy="151" r="6" fill="#BD694D" />
      <circle cx="201" cy="112" r="8" fill="#174D32" />
    </svg>
  );
}

function RecruitmentFooter() {
  return (
    <footer className="border-t border-primary/10 bg-[#f4f1e8] py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-foreground/65 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <Link href="/" className="font-semibold text-primary">Jíjé <span className="font-normal text-foreground/60">· Culture. Commerce. Community.</span></Link>
        <p>Toronto / GTA pilot · © {new Date().getFullYear()} Jíjé Group Inc.</p>
      </div>
    </footer>
  );
}

export function RecruitmentPage({ role }: { role: RecruitmentRole }) {
  const content = copy[role];
  const isVendor = role === "vendor";
  const pageViewTracked = useRef<RecruitmentRole | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const createdDescription = !description;
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    const previousDescription = description.content;
    const socialTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const socialDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const previousSocialTitle = socialTitle?.content;
    const previousSocialDescription = socialDescription?.content;
    document.title = content.pageTitle;
    description.content = content.metaDescription;
    if (socialTitle) socialTitle.content = content.pageTitle;
    if (socialDescription) socialDescription.content = content.metaDescription;
    if (pageViewTracked.current !== role) {
      pageViewTracked.current = role;
      track("page_view", role);
    }
    return () => {
      document.title = previousTitle;
      if (createdDescription) description.remove();
      else description.content = previousDescription;
      if (socialTitle && previousSocialTitle !== undefined) socialTitle.content = previousSocialTitle;
      if (socialDescription && previousSocialDescription !== undefined) {
        socialDescription.content = previousSocialDescription;
      }
    };
  }, [content.metaDescription, content.pageTitle, role]);

  function onCta(action: string) {
    trackRecruitmentCTA(role, action);
  }

  return (
    <main className="recruit-page min-h-[100dvh]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#e9eee3] pt-28 md:pt-36">
        <div className="recruit-grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 md:grid-cols-[1.05fr_.95fr] md:px-10 md:pb-24">
          <div className="relative z-10">
            <p className="recruit-eyebrow recruit-rise text-primary">{content.eyebrow}</p>
            <h1 className="recruit-display recruit-rise recruit-delay-1 mt-5 max-w-3xl text-5xl leading-[.98] text-primary sm:text-6xl md:text-[5.2rem]">
              {content.headline}<br /><span className="text-[#bd694d]">{content.emphasis}</span>
            </h1>
            <p className="recruit-rise recruit-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-foreground/75 md:text-xl">{content.intro}</p>
            <p className="mt-5 max-w-lg border-l-2 border-[#bd694d] pl-4 text-sm leading-relaxed text-foreground/70">{content.audience}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#apply"
                onClick={() => onCta(isVendor ? "List Your Business" : "Start Delivering")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {isVendor ? "List Your Business" : "Start Delivering"} <ArrowDown aria-hidden="true" size={17} />
              </a>
              <a
                href="#how-it-works"
                onClick={() => onCta("How It Works")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 px-7 font-semibold text-primary hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                How It Works
              </a>
            </div>
            <p className="mt-5 text-xs font-medium tracking-wide text-foreground/55">TORONTO / GTA PILOT · CURRENTLY IN PREPARATION</p>
          </div>
          <div className="relative mx-auto w-full max-w-[34rem] md:justify-self-end">
            {isVendor ? (
              <div className="relative aspect-[.92] overflow-hidden rounded-[48%_48%_2rem_2rem] bg-primary">
                <img src="/attached_assets/jije_jollof.JPEG" alt="African meal served with rice, vegetables, and plantain" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#143c2a]/85 via-[#143c2a]/10 to-[#143c2a]/10" />
                <div className="absolute bottom-[11%] left-[10%] right-[10%] rounded-[2rem] border border-white/25 bg-[#f9f4e6]/95 p-5 shadow-xl backdrop-blur-sm md:p-6">
                  <p className="recruit-eyebrow text-primary">Rooted in the GTA</p>
                  <p className="mt-2 font-display text-xl font-semibold leading-tight text-primary md:text-2xl">Good food deserves to be known.</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground/60"><MapPin size={15} aria-hidden="true" /> Toronto & surrounding communities</div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[2rem] bg-[#e7d49a] p-2">
                <CourierIllustration className="relative z-10 w-full" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-[#f9f4e6]/95 p-4 shadow-lg md:left-8 md:right-8">
                  <p className="font-display text-xl font-semibold text-primary">A neighbourhood connection, made tangible.</p>
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground/60"><MapPin size={15} aria-hidden="true" /> Toronto & surrounding communities</div>
                </div>
              </div>
            )}
            <div className="absolute -bottom-4 -left-1 hidden rounded-full bg-[#d6b965] px-5 py-3 text-sm font-semibold text-primary shadow-lg sm:block">A pilot built with community</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24" aria-labelledby="benefits-title">
        <div className="mb-10 max-w-2xl">
          <p className="recruit-eyebrow text-[#bd694d]">Why Jíjé</p>
          <h2 id="benefits-title" className="recruit-display mt-3 text-4xl text-primary md:text-5xl">{isVendor ? "A marketplace that sees the whole table." : "A delivery experience shaped with care."}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/65">We’re building with local voices, not making promises before the details are in place.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title} className={`group rounded-2xl border border-primary/10 bg-[#fbf9f3] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7 ${index % 2 ? "md:translate-y-7" : ""}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8eddf] text-primary"><Icon size={21} aria-hidden="true" /></span>
                <h3 className="mt-6 text-2xl font-semibold text-primary">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/65">{benefit.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-primary py-16 text-primary-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="recruit-eyebrow text-[#e3c979]">The process</p>
              <h2 className="recruit-display mt-3 text-4xl leading-tight text-primary-foreground md:text-5xl">An open door, not a fine-print surprise.</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-primary-foreground/70">The pilot is taking shape. Here’s what sharing your interest means.</p>
            </div>
            <div className="space-y-0">
              {content.steps.map((step, index) => (
                <div key={step.title} className="flex gap-5 border-b border-white/15 py-6 first:pt-0 last:border-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e3c979]/60 font-mono text-sm text-[#e3c979]">0{index + 1}</span>
                  <div><h3 className="text-xl font-semibold text-primary-foreground">{step.title}</h3><p className="mt-2 max-w-lg leading-relaxed text-primary-foreground/70">{step.body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[.8fr_1.2fr] md:px-10">
          <aside className="md:pt-4">
            <p className="recruit-eyebrow text-[#bd694d]">Start a conversation</p>
            <h2 className="recruit-display mt-3 text-4xl text-primary md:text-5xl">There’s room at the table.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-foreground/65">We’re listening to Toronto and GTA businesses and delivery partners as we prepare. Share what you’d like us to know.</p>
            {role === "driver" && (
              <div className="mt-6 rounded-xl border border-primary/10 bg-[#f0eee4] p-4 text-sm leading-relaxed text-foreground/65">
                Vehicle eligibility and onboarding depend on local rules and delivery type. We’ll confirm details during the process. This form does not request sensitive ID or financial information.
              </div>
            )}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/10 bg-[#f0eee4] p-4 text-sm leading-relaxed text-foreground/65">
              <ClipboardList className="mt-0.5 shrink-0 text-primary" size={19} aria-hidden="true" />
              <span>Your application is used to review your interest and contact you about this pilot. Contact consent is required; marketing consent is not requested.</span>
            </div>
            <Link href={isVendor ? "/drivers" : "/vendors"} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              {isVendor ? "Interested in delivering instead?" : "Are you a food business?"} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>
          <div className="rounded-[1.5rem] border border-primary/10 bg-[#fbf9f3] p-5 shadow-[0_24px_70px_-48px_rgba(26,77,46,.4)] sm:p-8 md:p-10">
            <InterestForm role={role} title={content.formTitle} intro={content.formIntro} />
          </div>
        </div>
      </section>
      <RecruitmentFooter />
    </main>
  );
}

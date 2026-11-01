import {
  ArrowRight,
  BookOpen,
  CircleDot,
  Database,
  Lightbulb,
  Network,
  Search,
  Utensils,
} from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

const focusAreas = [
  {
    number: "01",
    title: "Cultural Knowledge",
    description: "Food names, ingredients, regional variations, and the cultural context that connects them.",
    icon: Utensils,
    note: "Food · language · place",
  },
  {
    number: "02",
    title: "Intelligent Discovery",
    description: "Culturally aware search and contextual recommendations for more relevant food discovery.",
    icon: Search,
    note: "Search · recommendations · relevance",
  },
  {
    number: "03",
    title: "Research, Insights & Applied Technology",
    description: "Structured data and research, with future possibilities such as AI assistants, integrations, and insight for commerce and enterprise decisions.",
    icon: Database,
    note: "Research · technology · insight",
  },
];

const audiences = [
  "Food businesses and manufacturers",
  "Researchers and institutions",
  "Technology and AI companies",
  "Cultural and community organizations",
  "Strategic partners",
];

export function IntelligencePage() {
  return (
    <main className="min-h-[100dvh] bg-white text-foreground">
      <Navbar />
      <section className="relative overflow-hidden bg-white pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="absolute -right-12 top-16 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
        <div className="absolute right-10 top-28 h-[23rem] w-[23rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center md:px-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-primary"><CircleDot size={12} /> Developing initiative · Not a public product yet.</p>
            <h1 className="mt-7 max-w-2xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.025em] md:text-7xl">Cultural Knowledge.<br /><span className="text-[#c32d39]">Real-World</span><br />Intelligence.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/70">JÍJÉ Intelligence is developing the cultural knowledge and technology infrastructure to help digital systems better understand African and Afro-Caribbean foods, ingredients, and traditions.</p>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-primary/15" />
            <div className="absolute inset-14 rounded-full border border-primary/15" />
            <div className="absolute inset-24 rounded-full border border-primary/15" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary text-[#ffcc33] shadow-xl"><Network size={42} strokeWidth={1.3} /></div>
            <span className="absolute left-7 top-[27%] flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm"><BookOpen size={22} /></span>
            <span className="absolute bottom-[18%] right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffcc33] text-primary shadow-sm"><Lightbulb size={22} /></span>
            <span className="absolute right-[12%] top-[13%] h-3 w-3 rounded-full bg-[#c32d39]" />
          </div>
        </div>
      </section>
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">Areas of Focus</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map(({ number, title, description, icon: Icon, note }) => (
              <article key={number} className={`group pt-5 ${number === "01" ? "border-t-0" : "border-t border-primary/20"}`}>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-[#c32d39]">{number}</span>
                  <Icon className="text-primary/70 transition-transform duration-300 group-hover:-translate-y-1" size={21} strokeWidth={1.6} />
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold leading-tight">{title}</h3>
                <p className="mt-3 leading-7 text-foreground/65">{description}</p>
                <p className="mt-5 border-t border-primary/10 pt-3 text-[.68rem] font-semibold uppercase tracking-[.12em] text-primary/60">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.82fr_1.18fr] md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Who We're Building For</p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">For a wider food ecosystem.</h2>
          </div>
          <div className="grid content-start gap-0 sm:grid-cols-2 sm:gap-x-8">
            {audiences.map((audience, index) => (
              <div key={audience} className="flex items-center gap-4 border-b border-primary/15 py-5">
                <span className="font-mono text-xs text-[#c32d39]">0{index + 1}</span>
                <span className="font-medium leading-6 text-foreground/80">{audience}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 pb-12 md:px-10 md:pb-16">
        <div className="container mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-7 py-10 text-primary-foreground md:px-12 md:py-14">
          <div className="grid gap-9 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">Start a conversation</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-.04em] text-primary-foreground md:text-5xl">Help shape what comes next.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-primary-foreground/75">Working in food, research, culture, or technology? Let’s talk.</p>
            </div>
            <Link href="/partnerships" className="inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-full bg-[#ffcc33] px-6 font-semibold text-primary transition-transform hover:-translate-y-0.5 md:self-end">Explore a Partnership <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl border-t border-primary/10 px-5 pt-8 md:px-10">
          <h2 className="font-display text-2xl font-semibold">Commerce is where we begin.</h2>
          <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <p className="max-w-xl leading-6 text-foreground/65">Marketplace is JÍJÉ’s first business.</p>
            <Link href="/marketplace" className="inline-flex min-h-12 w-fit shrink-0 items-center gap-3 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Explore JÍJÉ Marketplace <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

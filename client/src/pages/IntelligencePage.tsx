import {
  ArrowRight,
  BookOpen,
  CircleDot,
  Compass,
  Database,
  Lightbulb,
  Network,
  Search,
  Sparkles,
  Utensils,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { PageMeta } from "@/components/PageMeta";

const focusAreas = [
  {
    number: "01",
    title: "Cultural Food Knowledge",
    description:
      "Organizing food names, ingredients, regional variations, culinary relationships, and cultural context.",
    icon: Utensils,
    note: "Names · ingredients · context",
  },
  {
    number: "02",
    title: "Intelligent Discovery",
    description:
      "Exploring culturally aware search, contextual recommendations, and more meaningful food discovery.",
    icon: Search,
    note: "Search · relevance · discovery",
  },
  {
    number: "03",
    title: "Data and Research",
    description:
      "Developing structured knowledge that may support researchers, food businesses, institutions, and technology organizations.",
    icon: Database,
    note: "Structure · research · insight",
  },
  {
    number: "04",
    title: "Applied AI and Technology",
    description:
      "Exploring AI-powered tools, intelligent assistants, knowledge systems, and future integrations.",
    icon: Sparkles,
    note: "Tools · systems · applications",
  },
  {
    number: "05",
    title: "Enterprise and Ecosystem Intelligence",
    description:
      "Investigating how cultural data and commerce insights could support better decisions and innovation.",
    icon: Compass,
    note: "Decisions · commerce · innovation",
  },
];

const audiences = [
  "Food businesses",
  "Researchers and academic institutions",
  "Food manufacturers",
  "Technology and AI companies",
  "Cultural and community organizations",
  "Potential strategic partners",
];

export function IntelligencePage() {
  return (
    <main className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <PageMeta title="JÍJÉ Intelligence | Cultural Knowledge. Real-World Intelligence." description="JÍJÉ Intelligence is a developing initiative building cultural knowledge and intelligent technology for African and Afro-Caribbean food understanding." />
      <Navbar />
      <section className="relative overflow-hidden bg-[#e9eee3] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="absolute -right-12 top-16 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
        <div className="absolute right-10 top-28 h-[23rem] w-[23rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center md:px-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-[#f9f7f2]/75 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#a75c43]"><CircleDot size={12} /> Developing initiative</p>
            <h1 className="mt-7 max-w-2xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">Cultural Knowledge.<br /><span className="text-[#a75c43]">Real-World</span><br />Intelligence.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/70">African and Afro-Caribbean food knowledge spans languages, regions, communities, ingredients, and generations. Yet much of this knowledge remains difficult to organize, search, and connect across digital systems.</p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-foreground/70">JÍJÉ Intelligence is developing the knowledge infrastructure and intelligent technology needed to make this information more accessible, connected, and useful.</p>
            <p className="mt-4 text-sm font-medium text-primary/65">This is an initiative in development, not a currently available public product.</p>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-primary/15" />
            <div className="absolute inset-14 rounded-full border border-primary/15" />
            <div className="absolute inset-24 rounded-full border border-primary/15" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary text-[#e3c979] shadow-xl"><Network size={42} strokeWidth={1.3} /></div>
            <span className="absolute left-7 top-[27%] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f9f7f2] text-primary shadow-sm"><BookOpen size={22} /></span>
            <span className="absolute bottom-[18%] right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3c979] text-primary shadow-sm"><Lightbulb size={22} /></span>
            <span className="absolute right-[12%] top-[13%] h-3 w-3 rounded-full bg-[#a75c43]" />
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.72fr_1.28fr] md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">The opportunity</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">Make cultural context legible.</h2>
            <p className="mt-5 max-w-sm leading-7 text-foreground/60">A research-led initiative at the meeting point of food culture and technology.</p>
          </div>
          <div className="space-y-5 text-lg leading-8 text-foreground/70">
            <p>Food knowledge lives across languages, ingredients, local names, family practice, and place. Technology often lacks the context to connect these details meaningfully.</p>
            <p>Our developing work explores how structured cultural knowledge and intelligent systems might improve discovery, understanding, and decision-making—while respecting the nuance within the culture.</p>
            <p>Research, data connections, and future AI applications are ambitions for this initiative. They are not being presented as live services today.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#f1e9d7] py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">In the making</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">Areas of Focus</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-foreground/65">These are developing areas of inquiry—not a list of currently available products or services.</p>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map(({ number, title, description, icon: Icon, note }) => (
              <article key={number} className="group border-t border-primary/20 pt-5">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-[#a75c43]">{number}</span>
                  <Icon className="text-primary/70 transition-transform duration-300 group-hover:-translate-y-1" size={21} strokeWidth={1.6} />
                </div>
                <h3 className="mt-7 font-display text-2xl font-semibold leading-tight">{title}</h3>
                <p className="mt-3 min-h-[5.25rem] leading-7 text-foreground/65">{description}</p>
                <p className="mt-5 border-t border-primary/10 pt-3 text-[.68rem] font-semibold uppercase tracking-[.12em] text-primary/60">{note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.82fr_1.18fr] md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">Who We're Building For</p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">Knowledge that can serve a wider ecosystem.</h2>
            <p className="mt-5 max-w-md leading-7 text-foreground/65">We are exploring how better-connected cultural food knowledge could be useful across research, commerce, technology, and community work.</p>
          </div>
          <div className="grid content-start gap-0 sm:grid-cols-2 sm:gap-x-8">
            {audiences.map((audience, index) => (
              <div key={audience} className="flex items-center gap-4 border-b border-primary/15 py-5">
                <span className="font-mono text-xs text-[#a75c43]">0{index + 1}</span>
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
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e3c979]">Start a conversation</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-.04em] text-primary-foreground md:text-5xl">Help shape what comes next.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-primary-foreground/75">If your work connects with African and Afro-Caribbean food knowledge, research, or technology, we welcome a conversation about potential partnership.</p>
            </div>
            <Link href="/partnerships" className="inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-full bg-[#e3c979] px-6 font-semibold text-primary transition-transform hover:-translate-y-0.5 md:self-end">Explore a Partnership <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container mx-auto flex max-w-7xl flex-col gap-6 border-t border-primary/10 px-5 pt-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9eee3] text-primary"><UsersRound size={19} /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">The first business</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Commerce is where we begin.</h2>
              <p className="mt-2 max-w-xl leading-6 text-foreground/65">JÍJÉ Marketplace is the first business in the wider JÍJÉ ecosystem.</p>
            </div>
          </div>
          <Link href="/marketplace" className="inline-flex min-h-12 items-center gap-3 self-start rounded-full border border-primary/20 px-6 font-semibold text-primary transition-colors hover:bg-[#e9eee3] sm:self-center">Explore JÍJÉ Marketplace <ArrowRight size={17} /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

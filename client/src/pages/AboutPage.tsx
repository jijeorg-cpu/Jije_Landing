import { ArrowRight, BookOpen, Compass, HeartHandshake } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { PageMeta } from "@/components/PageMeta";

const officialMission = "To preserve, connect and advance African and Afro-Caribbean food culture by building the digital and intelligence infrastructure that strengthens cultural preservation, expands access to its foods, knowledge and traditions, and makes them more understandable to technology.";

export function AboutPage() {
  return (
    <main className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <PageMeta title="About JÍJÉ | Our Mission and Story" description="Learn why JÍJÉ exists and how we connect African and Afro-Caribbean food culture, commerce, knowledge, and technology." />
      <Navbar />
      <header className="relative overflow-hidden bg-[#f1e9d7] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="absolute -right-28 -top-12 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">About JÍJÉ Group</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.03] tracking-[-.06em] md:text-7xl">Culture has always held the knowledge.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">We are building the connections that help African and Afro-Caribbean food culture travel further—through commerce, knowledge, and technology.</p>
        </div>
      </header>
      <section id="mission" className="scroll-mt-24 bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[.62fr_1.38fr] md:px-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-[#e3c979]">Our Mission</h2>
            <span className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#e3c979]"><Compass size={23} /></span>
          </div>
          <p className="font-display text-2xl font-medium leading-[1.5] tracking-[-.025em] text-white md:text-4xl">{officialMission}</p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.7fr_1.3fr] md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">Our Story</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">A living culture deserves better systems.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-foreground/70">
            <p>African and Afro-Caribbean food and cultural knowledge are rich, diverse, and deeply connected to identity and community. Yet the systems used to discover, organize, understand, and distribute them remain fragmented.</p>
            <p>JÍJÉ is working to connect these worlds through commerce, structured knowledge, and intelligent technology. We are starting with food commerce through JÍJÉ Marketplace while building a broader foundation for cultural intelligence, research, and future technology applications.</p>
            <p>This work is grounded in respect for the people, traditions, and expertise that carry culture forward. Our ambition is to make those connections more visible, useful, and durable.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#e9eee3] py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">Our approach</p>
          <div className="mt-7 grid gap-7 md:grid-cols-3">
            {[
              { icon: HeartHandshake, heading: "Rooted in people", copy: "Culture is lived, shared, and carried by communities. We build with that reality at the centre." },
              { icon: BookOpen, heading: "Knowledge with care", copy: "Culturally specific foods and traditions deserve context, clarity, and thoughtful representation." },
              { icon: Compass, heading: "Progress with purpose", copy: "We are developing practical ways for commerce and intelligent technology to serve meaningful cultural connections." },
            ].map(({ icon: Icon, heading, copy }) => (
              <article key={heading} className="border-t border-primary/20 pt-6">
                <Icon size={22} className="text-[#a75c43]" />
                <h3 className="mt-5 font-display text-2xl font-semibold">{heading}</h3>
                <p className="mt-3 max-w-sm leading-7 text-foreground/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">The work in motion</p><p className="mt-3 font-display text-3xl font-semibold">Explore the JÍJÉ ecosystem.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link href="/marketplace" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground">Marketplace <ArrowRight size={17} /></Link>
            <Link href="/intelligence" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/20 px-6 font-semibold text-primary">Intelligence <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

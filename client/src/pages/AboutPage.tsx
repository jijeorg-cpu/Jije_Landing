import { ArrowRight, BookOpen, Compass, HeartHandshake } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

const officialMission = "To preserve, connect and advance African and Afro-Caribbean food culture by building the digital and intelligence infrastructure that strengthens cultural preservation, expands access to its foods, knowledge and traditions, and makes them more understandable to technology.";

export function AboutPage() {
  return (
    <main className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <Navbar />
      <header className="relative overflow-hidden bg-[#f0f4e6] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="absolute -right-28 -top-12 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#705335]">About JÍJÉ Group</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.03] tracking-[-.06em] md:text-7xl">Rooted in Culture. Powered by Intelligence.</h1>
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-foreground/70">
            <p>JÍJÉ is building the infrastructure to connect African and Afro-Caribbean food, cultural knowledge, commerce, and innovation.</p>
            <p>Our work begins with making culturally relevant food and commerce more accessible. Our larger vision is to help organize, understand, and unlock the value of cultural knowledge through technology.</p>
          </div>
        </div>
      </header>
      <section id="mission" className="scroll-mt-24 bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[.62fr_1.38fr] md:px-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">Our Mission</h2>
            <span className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#ffcc33]"><Compass size={23} /></span>
          </div>
          <p className="font-display text-2xl font-medium leading-[1.5] tracking-[-.025em] text-white md:text-4xl">{officialMission}</p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.7fr_1.3fr] md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#705335]">Our Vision</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">A world where cultural knowledge connects.</h2>
          </div>
          <div className="flex items-start gap-5 text-lg leading-8 text-foreground/70">
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e9eee3] text-primary"><BookOpen size={22} /></span>
            <p>A world where culturally specific foods, businesses, and knowledge are easier to discover, understand, and connect across communities and industries.</p>
          </div>
        </div>
      </section>
        <section className="bg-[#e9eee3] py-20 md:py-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#705335]">Our Approach</p>
          <p className="mt-4 max-w-3xl font-display text-2xl font-medium leading-relaxed tracking-[-.02em] md:text-3xl">We bring together commerce, community knowledge, and intelligent technology.</p>
          <div className="mt-7 grid gap-7 md:grid-cols-3">
            {[
              { icon: HeartHandshake, heading: "Rooted in people", copy: "Culture is lived, shared, and carried by communities. We build with that reality at the centre." },
              { icon: BookOpen, heading: "Knowledge with care", copy: "Culturally specific foods and traditions deserve context, clarity, and thoughtful representation." },
              { icon: Compass, heading: "Progress with purpose", copy: "We are developing practical ways for commerce and intelligent technology to serve meaningful cultural connections." },
            ].map(({ icon: Icon, heading, copy }) => (
              <article key={heading} className="border-t border-primary/20 pt-6">
                <Icon size={22} className="text-[#705335]" />
                <h3 className="mt-5 font-display text-2xl font-semibold">{heading}</h3>
                <p className="mt-3 max-w-sm leading-7 text-foreground/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#705335]">Our Businesses</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Two businesses, one cultural foundation.</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <article className="flex flex-col items-start border-t border-primary/15 pt-5">
              <h3 className="font-display text-2xl font-semibold">JÍJÉ Marketplace</h3>
              <p className="mt-3 max-w-lg leading-7 text-foreground/65">JÍJÉ’s first business, beginning with culturally relevant food and commerce.</p>
              <Link href="/marketplace" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground">Explore Marketplace <ArrowRight size={17} /></Link>
            </article>
            <article className="flex flex-col items-start border-t border-primary/15 pt-5">
              <h3 className="font-display text-2xl font-semibold">JÍJÉ Intelligence</h3>
              <p className="mt-3 max-w-lg leading-7 text-foreground/65">A developing initiative exploring cultural food knowledge, research, and intelligent technology.</p>
              <Link href="/intelligence" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/20 px-6 font-semibold text-primary">Explore Intelligence <ArrowRight size={17} /></Link>
            </article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

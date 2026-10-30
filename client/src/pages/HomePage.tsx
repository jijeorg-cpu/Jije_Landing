import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Layers3, Network, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { PageMeta } from "@/components/PageMeta";

export function HomePage() {
  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f9f7f2] text-foreground">
      <PageMeta title="JÍJÉ Group | Rooted in Culture. Powered by Intelligence." description="JÍJÉ is building an ecosystem that connects African and Afro-Caribbean food, cultural knowledge, commerce, and innovation." />
      <Navbar />
      <section className="relative min-h-[720px] bg-[#f5f0df] pt-28 md:min-h-[770px] md:pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-28 top-14 h-[35rem] w-[35rem] rounded-full border border-primary/10 md:right-[-2rem]" />
          <div className="absolute -right-8 top-28 h-[27rem] w-[27rem] rounded-full border border-primary/10" />
          <div className="absolute bottom-0 right-0 h-[70%] w-[60%] opacity-20" style={{ backgroundImage: "radial-gradient(#1a4d2e 0.7px, transparent 0.7px)", backgroundSize: "14px 14px" }} />
        </div>
        <div className="container relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 md:grid-cols-[1.05fr_.95fr] md:px-10 md:pb-24">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-[#a75c43]">
              <span className="h-px w-9 bg-[#a75c43]" /> JÍJÉ Group Inc. · Toronto / GTA
            </p>
            <h1 className="font-display text-[3.5rem] font-semibold leading-[.99] tracking-[-.065em] text-primary sm:text-7xl lg:text-[5.6rem]">
              Rooted in <span className="text-[#a75c43]">Culture.</span><br />Powered by<br />Intelligence.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/75 md:text-xl">
              JÍJÉ is building an ecosystem that connects African and Afro-Caribbean food, cultural knowledge, commerce, and innovation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/marketplace" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Explore JÍJÉ Marketplace <ArrowRight size={18} />
              </Link>
              <Link href="/intelligence" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-primary/25 bg-[#f9f7f2]/75 px-7 font-semibold text-primary transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Discover JÍJÉ Intelligence <ArrowUpRight size={17} />
              </Link>
            </div>
            <p className="mt-7 text-xs font-medium tracking-wide text-foreground/50">A company for culture, commerce and what comes next.</p>
          </div>
          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="relative aspect-[.92] overflow-hidden rounded-t-[48%] rounded-b-[2rem] bg-[#d9dfc9] shadow-[0_30px_80px_rgba(26,77,46,.12)]">
              <img src="/attached_assets/jije_jollof.JPEG" alt="A shared platter of jollof rice and accompaniments" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3020]/55 via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e7ce86]">Culture is the beginning</p>
                  <p className="mt-2 font-display text-2xl font-semibold">Food carries a world.</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50"><ArrowDown size={18} /></span>
              </div>
            </div>
            <div className="absolute -left-3 top-[18%] flex items-center gap-3 rounded-full border border-primary/10 bg-[#f9f7f2] px-4 py-3 shadow-sm sm:-left-10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eddf] text-primary"><Compass size={18} /></span>
              <span className="text-sm font-semibold text-primary">Commerce meets knowledge</span>
            </div>
          </div>
        </div>
      </section>

      <section id="businesses" className="scroll-mt-24 bg-[#f9f7f2] py-24 md:py-32">
        <span id="spotlight" className="scroll-mt-24" />
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">One company · two connected ventures</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-6xl">Our Businesses</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-foreground/65">Marketplace pilot preparation, alongside a developing intelligence initiative—two businesses within one JÍJÉ ecosystem.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-11">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-7 -top-7 h-48 w-48 rounded-full border border-white/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e3c979] text-primary"><Layers3 size={23} /></span>
              <p className="relative mt-9 text-xs font-bold uppercase tracking-[.2em] text-[#e3c979]">JÍJÉ Marketplace</p>
              <h3 className="relative mt-3 font-display text-3xl font-semibold text-white md:text-4xl">Your Culture, Delivered.</h3>
              <p className="relative mt-4 max-w-lg leading-7 text-white/75">A culturally connected marketplace making African and Afro-Caribbean groceries, meals, and food businesses easier to discover and access.</p>
              <Link href="/marketplace" className="relative mt-auto inline-flex w-fit items-center gap-3 pt-8 font-semibold text-[#e3c979] transition-colors hover:text-white">Explore Marketplace <ArrowRight size={17} /></Link>
            </article>
            <article className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-[#e9eee3] p-8 md:p-11">
              <div className="absolute -bottom-24 -right-12 h-80 w-80 rounded-full border border-primary/10" />
              <div className="absolute -bottom-12 right-0 h-56 w-56 rounded-full border border-primary/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-[#e3c979]"><Sparkles size={23} /></span>
              <p className="relative mt-9 text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">JÍJÉ Intelligence · Developing initiative</p>
              <h3 className="relative mt-3 font-display text-3xl font-semibold text-primary md:text-4xl">Cultural Knowledge.<br className="hidden md:block" /> Real-World Intelligence.</h3>
              <p className="relative mt-4 max-w-lg leading-7 text-foreground/70">Building the cultural knowledge and intelligent technology infrastructure to improve food discovery, understanding, and decision-making.</p>
              <Link href="/intelligence" className="relative mt-auto inline-flex w-fit items-center gap-3 pt-8 font-semibold text-primary transition-colors hover:text-[#a75c43]">Explore Intelligence <ArrowRight size={17} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section id="mission" className="scroll-mt-24 bg-[#f1e9d7] py-24 md:py-32">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.72fr_1.28fr] md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">The reason we build</p>
            <h2 className="mt-4 max-w-sm font-display text-4xl font-semibold leading-tight tracking-[-.05em] md:text-5xl">Why JÍJÉ Exists</h2>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#a75c43]">Read our story <ArrowRight size={16} /></Link>
          </div>
          <div className="max-w-3xl">
            <p className="font-display text-2xl leading-[1.45] tracking-[-.025em] text-primary md:text-4xl">African and Afro-Caribbean food and cultural knowledge are rich, diverse, and deeply connected to identity and community.</p>
            <p className="mt-7 text-lg leading-8 text-foreground/70">Yet the systems used to discover, organize, understand, and distribute them remain fragmented. JÍJÉ is working to connect these worlds through commerce, structured knowledge, and intelligent technology.</p>
            <p className="mt-5 text-lg leading-8 text-foreground/70">We are starting with food commerce through JÍJÉ Marketplace while building a broader foundation for cultural intelligence, research, and future technology applications.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-[#f9f7f2] py-24 md:py-28">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">An evolving ecosystem</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">Different work.<br />One shared foundation.</h2>
          </div>
          <div className="grid gap-0 border-y border-primary/15 md:grid-cols-3">
            {[
              { number: "01", title: "Commerce, in the real world", copy: "Marketplace connects people, merchants, products, and real-world commerce.", icon: Layers3 },
              { number: "02", title: "Knowledge with context", copy: "Intelligence develops the knowledge and technology to understand culturally specific foods, ingredients, terminology, and relationships.", icon: Sparkles },
              { number: "03", title: "A connected future", copy: "Together, these initiatives create opportunities for consumers, businesses, researchers, and technology partners.", icon: Network },
            ].map(({ number, title, copy, icon: Icon }) => (
              <article key={number} className="border-b border-primary/15 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 first:md:pl-0 last:md:border-r-0 last:pb-0">
                <div className="flex items-center justify-between text-primary/55"><span className="font-mono text-sm">{number}</span><Icon size={20} className="text-[#a75c43]" /></div>
                <h3 className="mt-10 font-display text-2xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-sm leading-7 text-foreground/65">{copy}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-foreground/60">Our ecosystem is evolving. Planned data integrations and AI products are still in development, not publicly available services.</p>
        </div>
      </section>

      <section id="join" className="scroll-mt-24 bg-primary py-20 text-primary-foreground md:py-24">
        <div className="container mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-center md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e3c979]">Come build with us</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-.04em] text-white md:text-5xl">The next chapter is built together.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/partners" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e3c979] px-6 font-semibold text-primary hover:bg-[#edd995]">Explore Partnerships <ArrowRight size={17} /></Link>
            <Link href="/marketplace#pilot" id="pilot" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 font-semibold text-white hover:bg-white/10">Join the Pilot</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}


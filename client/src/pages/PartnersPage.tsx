import { ArrowRight, BriefcaseBusiness, ChefHat, Truck } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

const partnerInquiry = "https://tally.so/r/rjKA6p";

export function PartnersPage() {
  return (
    <main className="min-h-[100dvh] bg-white text-foreground">
      <Navbar />
      <header className="bg-white pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">Partnerships begin with people.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">Choose the right path for Marketplace opportunities or a broader company inquiry.</p>
        </div>
      </header>
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="mt-7 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <section aria-labelledby="marketplace-partners-heading">
              <h2 id="marketplace-partners-heading" className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-primary">JÍJÉ Marketplace</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <article className="flex min-h-[330px] flex-col rounded-[1.75rem] bg-primary p-7 text-primary-foreground md:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#ffcc33]"><ChefHat size={23} /></span>
                  <h3 className="mt-7 font-display text-3xl font-semibold text-white">Food businesses</h3>
                  <p className="mt-4 leading-7 text-white/75">For African and Afro-Caribbean food businesses interested in Marketplace.</p>
                  <Link href="/vendors" className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-[#ffcc33]">List Your Business <ArrowRight size={17} /></Link>
                </article>
                <article className="flex min-h-[330px] flex-col rounded-[1.75rem] border border-primary/10 bg-[#e9eee3] p-7 md:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-[#ffcc33]"><Truck size={23} /></span>
                  <h3 className="mt-7 font-display text-3xl font-semibold">Delivery partners</h3>
                  <p className="mt-4 leading-7 text-foreground/65">For delivery partners interested in Marketplace.</p>
                  <Link href="/drivers" className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-primary">Start Delivering <ArrowRight size={17} /></Link>
                </article>
              </div>
            </section>
            <section aria-labelledby="company-inquiry-heading">
              <h2 id="company-inquiry-heading" className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Beyond the Marketplace</h2>
              <article className="flex min-h-[330px] flex-col rounded-[1.75rem] border border-primary/10 bg-white p-7 md:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9eee3] text-primary"><BriefcaseBusiness size={23} /></span>
                <h3 className="mt-7 font-display text-3xl font-semibold">Research, technology & company inquiries</h3>
                <p className="mt-4 leading-7 text-foreground/65">Use our existing inquiry for research, technology, community partnerships, or general company matters.</p>
                <a href={partnerInquiry} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-primary">Partnership Inquiry <ArrowRight size={17} /></a>
              </article>
            </section>
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-foreground/55">The Toronto/GTA Marketplace pilot is in preparation. Submitting interest is not an offer of work, service agreement, or partnership commitment.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

import { ArrowRight, BriefcaseBusiness, ChefHat, Truck } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { PageMeta } from "@/components/PageMeta";

const partnerInquiry = "https://tally.so/r/rjKA6p";

export function PartnersPage() {
  return (
    <main className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <PageMeta title="Partnerships | Build with JÍJÉ" description="Explore vendor, delivery partner, and broader partnership opportunities connected to JÍJÉ Marketplace and the wider JÍJÉ ecosystem." />
      <Navbar />
      <header className="bg-[#f1e9d7] pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">Make meaningful connections</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">Partnerships begin with people.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">Whether you are a food business, delivery partner, or exploring a broader collaboration, find the right way to connect with JÍJÉ.</p>
        </div>
      </header>
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">Choose your path</p>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            <article className="flex min-h-[330px] flex-col rounded-[1.75rem] bg-primary p-7 text-primary-foreground md:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#e3c979]"><ChefHat size={23} /></span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[#e3c979]">JÍJÉ Marketplace</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white">Food businesses</h2>
              <p className="mt-4 leading-7 text-white/75">Share your interest in bringing your African or Afro-Caribbean food business to the Marketplace pilot.</p>
              <Link href="/vendors" className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-[#e3c979]">List Your Business <ArrowRight size={17} /></Link>
            </article>
            <article className="flex min-h-[330px] flex-col rounded-[1.75rem] border border-primary/10 bg-[#e9eee3] p-7 md:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-[#e3c979]"><Truck size={23} /></span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[#a75c43]">JÍJÉ Marketplace</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Delivery partners</h2>
              <p className="mt-4 leading-7 text-foreground/65">Register your interest in the delivery partner pilot and learn about possible next steps.</p>
              <Link href="/drivers" className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-primary">Start Delivering <ArrowRight size={17} /></Link>
            </article>
            <article className="flex min-h-[330px] flex-col rounded-[1.75rem] border border-primary/10 bg-[#fbf9f3] p-7 md:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f1e9d7] text-[#a75c43]"><BriefcaseBusiness size={23} /></span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[#a75c43]">Beyond the Marketplace</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">Other partnerships</h2>
              <p className="mt-4 leading-7 text-foreground/65">For research, technology, community, and other partnership enquiries, use our existing enquiry form.</p>
              <a href={partnerInquiry} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 pt-7 font-semibold text-primary">Partnership Inquiry <ArrowRight size={17} /></a>
            </article>
          </div>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-foreground/55">The Toronto/GTA Marketplace pilot is in preparation. Submitting interest is not an offer of work, service agreement, or partnership commitment.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SectionHeading } from "@/components/SectionHeading";
import { trackRecruitmentCTA } from "@/components/Recruitment";
import storeOwnerKaya from "@/assets/kaya/store-owner.webp";
import bicycleKaya from "@/assets/kaya/bicycle.webp";
import multiKaya from "@/assets/kaya/multi-kaya.webp";
import { 
  Utensils, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  ChefHat, 
  Users,
  Truck,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

// --- Sub-components for sections ---

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 text-left lg:order-1"
          >
          <h1 className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm animate-in fade-in zoom-in duration-700 delay-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            JÍJÉ Marketplace
          </h1>
          
          <p className="text-xl text-foreground/75 mb-8 max-w-lg leading-relaxed">A culturally connected marketplace making African and Afro-Caribbean groceries, meals, and food businesses easier to discover and access.</p>

          <WaitlistForm />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            className="order-1 mx-auto w-full max-w-2xl bg-white lg:order-2"
          >
            <img
              src={multiKaya}
              alt="Six Kaya characters representing a chef, storekeeper, shopper, bicycle courier, driver, and caterer"
              width={1024}
              height={768}
              className="h-auto max-h-[460px] w-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


function SolutionSection() {
  return (
    <section id="mission" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="The Marketplace"
          title="One Place for Culture & Community"
          description="Jíjé brings the entire ecosystem together. Eat, shop, and connect without the hassle."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Card 1: Food */}
          <motion.div
            whileHover={{ y: -8 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Unsplash: Jollof rice */}
            {/* <!-- https://unsplash.com/photos/top-view-delicious-food-table-xMh_ww8k6yo --> */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('/attached_assets/jije_jollof.JPEG')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17271d]/85 via-[#17271d]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <Utensils className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold mb-2 text-white">Authentic Food</h3>
              <p className="text-white/90">Explore meals from African and Afro-Caribbean restaurants and food businesses.</p>
            </div>
          </motion.div>

          {/* Card 2: Discovery */}
          <motion.div
            whileHover={{ y: -8 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17271d]/85 via-[#17271d]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <ShoppingBag className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold mb-2 text-white">Grocery Discovery</h3>
              <p className="text-white/90">Shop cultural ingredients, spices, and essentials.</p>
            </div>
          </motion.div>

          {/* Card 3: Events */}
          <motion.div
            whileHover={{ y: -8 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Unsplash: Concert/Festival */}
            {/* <!-- https://unsplash.com/photos/people-raising-hands-in-concert-hzgs56Ze49s --> */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: `url('/jije_cultural.JPG')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17271d]/85 via-[#17271d]/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <Calendar className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold mb-2 text-white">Cultural Events</h3>
              <p className="text-white/90">Never miss a concert, festival, or community meetup again.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "1", title: "Discover", desc: "Explore African and Afro-Caribbean foods, ingredients, and food businesses." },
    { num: "2", title: "Find your fit", desc: "Learn about the vendors and offerings shaping a culturally connected marketplace." },
    { num: "3", title: "Stay connected", desc: "Follow the Marketplace as the Toronto/GTA pilot takes shape." }
  ];

  

  return (
    <section id="how-it-works" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[.08]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #f9f9f9 1px, transparent 0)", backgroundSize: "18px 18px" }} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="How It Works"
          title="Bringing Culture Closer"
          description="A marketplace vision grounded in the everyday foodways that bring people together."
          centered
          inverse
        />
        
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative text-center"
            >
              <div className="text-8xl font-display font-black text-white/10 absolute -top-12 left-1/2 -translate-x-1/2 z-0">
                {step.num}
              </div>
              <div className="relative z-10 mt-8">
                <h3 className="text-2xl font-bold mb-4 bg-[transparent] text-white">{step.title}</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-lg">{step.desc}</p>
              </div>
              
              {/* Connector line for desktop */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-[2px] bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function AudienceSection() {
  return (
    <section id="spotlight" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Who It's For"
          title="Building the Ecosystem"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              role: "For You",
              title: "The Community",
              desc: "Explore culturally relevant food discovery built around the flavours and traditions of home.",
              icon: <Users className="w-6 h-6" />
            },
            {
              role: "For Businesses",
              title: "Vendors & Chefs",
              desc: "Share what you make and help shape a marketplace rooted in African and Afro-Caribbean food.",
              icon: <ChefHat className="w-6 h-6" />
            },
            {
              role: "For Creators",
              title: "Event Organizers",
              desc: "Bring people together around African and Afro-Caribbean food culture.",
              icon: <Calendar className="w-6 h-6" />
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-background p-8 rounded-3xl shadow-sm border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                <div className="p-2 bg-primary/10 rounded-lg">{card.icon}</div>
                <span className="font-semibold text-sm uppercase tracking-wide opacity-70">{card.role}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">{card.title}</h3>
              <p className="text-foreground/75">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruitmentSection() {
  return (
    <section id="pilot" className="relative overflow-hidden bg-white py-20 md:py-28" aria-labelledby="pilot-title">
      <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-primary/10 md:h-[30rem] md:w-[30rem]" />
      <div className="container relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Toronto / GTA pilot</p>
          <h2 id="pilot-title" className="mt-3 text-4xl font-display font-bold leading-tight text-primary md:text-6xl">Let’s build the next chapter together.</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground/70">We’re meeting the people who make the local food community what it is. Share your interest as a business or delivery partner.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="group overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground shadow-sm">
            <div className="relative flex h-56 items-center justify-center overflow-hidden bg-white px-8 md:h-64">
              <div className="absolute -right-8 -top-12 h-52 w-52 rounded-full border border-primary/10" />
              <img
                src={storeOwnerKaya}
                alt="Kaya welcoming customers as a JÍJÉ food business owner"
                width={1024}
                height={1024}
                className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-7 md:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#ffcc33]"><ChefHat size={24} aria-hidden="true" /></span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">For vendors & food businesses</p>
              <h3 className="mt-2 max-w-md text-3xl font-display font-semibold text-primary-foreground md:text-4xl">Grow with JÍJÉ</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/80">Reach more customers and grow your business with JÍJÉ.</p>
              <Link href="/vendors" onClick={() => trackRecruitmentCTA("vendor", "List Your Business")} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ffcc33] px-6 font-semibold text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                List Your Business <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
          <article className="group overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-sm">
            <div className="relative flex h-56 items-center justify-center overflow-hidden bg-white px-8 md:h-64">
              <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-[#c32d39]/15 transition-transform duration-500 group-hover:scale-110" />
              <img
                src={bicycleKaya}
                alt="Kaya riding a bicycle to deliver a JÍJÉ order"
                width={1024}
                height={1024}
                className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="relative p-7 md:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8eddf] text-primary"><Truck size={24} aria-hidden="true" /></span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">For delivery partners</p>
              <h3 className="mt-2 max-w-md text-3xl font-display font-semibold text-primary md:text-4xl">Deliver with JÍJÉ</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-foreground/65">Join our growing delivery community and explore flexible earning opportunities.</p>
              <Link href="/drivers" onClick={() => trackRecruitmentCTA("driver", "Start Delivering")} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-primary/20 px-6 font-semibold text-primary transition-transform hover:-translate-y-0.5 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Start Delivering <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-foreground/55">The Toronto/GTA pilot is in preparation. Interest forms are not offers of work, service agreements, or commitments.</p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="join" className="py-24 bg-primary relative overflow-hidden text-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Follow the Marketplace pilot</h2>
          <div className="bg-white p-2 rounded-[2rem] shadow-2xl">
            <div className="bg-secondary/30 rounded-[1.5rem] p-6 md:p-8">
              <WaitlistForm />
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-primary-foreground/70">
            Waitlist submissions are subject to our{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</Link>
            {" "}and <Link href="/terms" className="underline underline-offset-2 hover:text-white">Terms of Service</Link>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function MarketplacePage() {
  return (
    <main className="min-h-screen font-sans bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <HeroSection />
      <SolutionSection />
      <HowItWorksSection />
      <AudienceSection />
      <RecruitmentSection />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

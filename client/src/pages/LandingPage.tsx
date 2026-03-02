import { Navbar } from "@/components/Navbar";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { 
  Utensils, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  ChefHat, 
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

// --- Sub-components for sections ---

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#F9F7F2]">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-primary mb-8 animate-in fade-in zoom-in duration-700 delay-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Coming Soon to Your City
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6 tracking-tight text-[#008431]">
            Culture. Commerce. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600 text-center">
              Community.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">The marketplace for authentic African & Afro-Carribean food, groceries, and cultural events. Connect with home, wherever you are.</p>

          <WaitlistForm />
        </motion.div>

      </div>
    </section>
  );
}


function SolutionSection() {
  return (
    <section className="py-24 bg-[#F9F7F2]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="The Solution"
          title="One Place for Culture & Community"
          description="Jijé brings the entire ecosystem together. Eat, shop, and connect without the hassle."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Card 1: Food */}
          <motion.div
            whileHover={{ y: -8 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Unsplash: Jollof rice */}
            {/* <!-- https://unsplash.com/photos/top-view-delicious-food-table-xMh_ww8k6yo --> */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?q=80&w=1974&auto=format&fit=crop')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <Utensils className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold mb-2">Authentic Food</h3>
              <p className="text-white/80">Order meals from top rated African chefs and restaurants near you.</p>
            </div>
          </motion.div>

          {/* Card 2: Discovery */}
          <motion.div
            whileHover={{ y: -8 }}
            className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
          >
            {/* Unsplash: Spices market */}
            {/* <!-- https://unsplash.com/photos/variety-of-spices-on-brown-wooden-spoons-U-k7v2P3nKQ --> */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <ShoppingBag className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold mb-2">Grocery Discovery</h3>
              <p className="text-white/80">Find rare ingredients, spices, and fabrics delivered to your door.</p>
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
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <Calendar className="mb-4 h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold mb-2">Cultural Events</h3>
              <p className="text-white/80">Never miss a concert, festival, or community meetup again.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Browse", desc: "Explore curated menus, grocery lists, and event calendars tailored to your culture." },
    { num: "02", title: "Order / Book", desc: "Seamlessly purchase meals, groceries, or tickets in just a few taps." },
    { num: "03", title: "Experience", desc: "Enjoy authentic delivery or head out to connect with your community." }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          label="How It Works"
          title="Bringing Culture Closer"
          description="We've made it simple to access the things that make you feel at home."
          centered
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
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-[#9AC31C] bg-[transparent]">{step.title}</h3>
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
    <section className="py-24 bg-[#F9F7F2]">
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
              desc: "Reconnect with the flavors and vibes you miss. Easy access to everything that feels like home.",
              icon: <Users className="w-6 h-6" />
            },
            {
              role: "For Businesses",
              title: "Vendors & Chefs",
              desc: "Reach customers who are actively searching for what you offer. Grow your business with purpose.",
              icon: <ChefHat className="w-6 h-6" />
            },
            {
              role: "For Creators",
              title: "Event Organizers",
              desc: "Sell tickets and manage events seamlessly. Fill the room with the right crowd.",
              icon: <Calendar className="w-6 h-6" />
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                <div className="p-2 bg-primary/10 rounded-lg">{card.icon}</div>
                <span className="font-semibold text-sm uppercase tracking-wide opacity-70">{card.role}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>
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
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Be First When Jíjé Launches</h2>
          <p className="text-xl text-primary-foreground/90 mb-10">We're launching city by city. Join the waitlist to bring Jíjé to your area and get exclusive early access perks.</p>

          <div className="bg-white p-2 rounded-[2rem] shadow-2xl">
            <div className="bg-secondary/30 rounded-[1.5rem] p-6 md:p-8">
              <WaitlistForm />
            </div>
          </div>
          
          <p className="mt-8 text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Jijé Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen font-sans bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <HeroSection />
      <SolutionSection />
      <HowItWorksSection />
      <AudienceSection />
      <FinalCTA />
    </main>
  );
}

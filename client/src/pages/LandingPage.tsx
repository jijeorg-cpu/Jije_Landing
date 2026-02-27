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
  Users, 
  ArrowRight,
  Sparkles,
  Globe
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
      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
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
          
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-primary leading-[1.1] mb-6 tracking-tight">
            Culture. Commerce. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600 text-center">
              Community.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            The marketplace for authentic African food, groceries, and cultural events. 
            Connect with home, wherever you are.
          </p>

          <WaitlistForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Hero Image / Collage Placeholder */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            {/* Main Image */}
            <div className="absolute inset-0 bg-gray-200 rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 ease-out z-10">
              {/* Unsplash: African food feast */}
              {/* <!-- https://unsplash.com/photos/a-table-topped-with-plates-of-food-and-bowls-of-food-V8kR70-p8r8 --> */}
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
                alt="Delicious Jollof Rice and Plantains" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold text-lg">Authentic Flavors</p>
                <p className="text-sm opacity-90">From local chefs to your table</p>
              </div>
            </div>

            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 max-w-[200px]"
            >
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <ShoppingBag size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Hard-to-find</p>
                <p className="text-xs text-muted-foreground">Groceries & Spices</p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 max-w-[200px]"
            >
              <div className="bg-green-100 p-2 rounded-lg text-primary">
                <Calendar size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Cultural Events</p>
                <p className="text-xs text-muted-foreground">Festivals & Meetups</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeading
            label="The Problem"
            title="Finding Home Isn't Easy"
            description="Scattered WhatsApp groups. Overpriced imports. Events you only hear about after they happen. The diaspora experience shouldn't be this fragmented."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="w-8 h-8 text-red-500" />,
              title: "Scattered Sources",
              desc: "You have to visit 5 different shops just to find the right ingredients for one meal."
            },
            {
              icon: <Users className="w-8 h-8 text-orange-500" />,
              title: "Disconnected Community",
              desc: "Missing out on cultural festivals and gatherings because there's no central hub."
            },
            {
              icon: <ShoppingBag className="w-8 h-8 text-primary" />,
              title: "Inconsistent Access",
              desc: "Relying on suitcases from home to get the authentic products you love."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-secondary/30 border border-secondary hover:border-primary/20 transition-all duration-300"
            >
              <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
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
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
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

function SpotlightSection() {
  return (
    <section id="spotlight" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              {/* Unsplash: Art/Fashion */}
              {/* <!-- https://unsplash.com/photos/woman-wearing-multicolored-dress-holding-brown-handbag-L0yK3w2T9Bw --> */}
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
                alt="Cultural Fashion and Art" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-yellow-500" size={18} />
                  <span className="font-bold text-sm">More Than Food</span>
                </div>
                <p className="text-xs text-muted-foreground">Discover fashion, art, and music that celebrates heritage.</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <SectionHeading
              label="Culture Spotlight"
              title="A Platform for Creators"
              description=""
              centered={false}
            />
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Jijé isn't just a delivery app. It's a stage for the chefs, artists, and organizers who keep our culture alive. 
              We're building a digital home where creators can thrive and the community can discover the next big thing.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Promote your events to a targeted audience",
                "Sell products to people looking for authenticity",
                "Build a following that values your craft"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="bg-green-100 p-1 rounded-full text-primary">
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" className="rounded-full px-8 h-12 text-primary border-primary hover:bg-primary/5">
              Learn about selling on Jijé
            </Button>
          </div>
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
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Be First When Jijé Launches
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10">
            We're launching city by city. Join the waitlist to bring Jijé to your area and get exclusive early access perks.
          </p>

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
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <SpotlightSection />
      <AudienceSection />
      <FinalCTA />
    </main>
  );
}

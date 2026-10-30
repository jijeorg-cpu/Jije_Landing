import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MarketplacePage } from "@/pages/LandingPage";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { IntelligencePage } from "@/pages/IntelligencePage";
import { PartnersPage } from "@/pages/PartnersPage";
import { ContactPage } from "@/pages/ContactPage";
import { VendorsPage } from "@/pages/VendorsPage";
import { DriversPage } from "@/pages/DriversPage";
import { LegalPage } from "@/pages/LegalPage";
import { PageMeta } from "@/components/PageMeta";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    const scrollToContent = () => {
      const hash = window.location.hash;
      // Existing shared homepage links continue to reach Marketplace content.
      if (window.location.pathname === "/" && ["#mission", "#how-it-works", "#spotlight", "#join", "#pilot"].includes(hash)) {
        navigate(`/marketplace${hash}`, { replace: true });
        return;
      }
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    };
    let frame = requestAnimationFrame(scrollToContent);
    const scheduleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scrollToContent);
    };
    // Wouter dispatches these events for same-page hash navigation as well.
    const events = ["hashchange", "pushState", "replaceState", "popstate"];
    events.forEach((event) => window.addEventListener(event, scheduleScroll));
    return () => {
      cancelAnimationFrame(frame);
      events.forEach((event) => window.removeEventListener(event, scheduleScroll));
    };
  }, [location, navigate]);
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/marketplace" component={MarketplacePage} />
      <Route path="/intelligence" component={IntelligencePage} />
      <Route path="/partners" component={PartnersPage} />
      <Route path="/partnerships" component={PartnersPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/vendors" component={VendorsPage} />
      <Route path="/drivers" component={DriversPage} />
      <Route path="/privacy">{() => <LegalPage kind="privacy" />}</Route>
      <Route path="/terms">{() => <LegalPage kind="terms" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PageMeta />
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

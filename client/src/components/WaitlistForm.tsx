import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WaitlistForm() {
  return (
    <Button
      onClick={() => window.open("https://tally.so/r/Ek1QWA", "_blank")}
      className="h-14 rounded-full text-lg font-bold hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0 w-full bg-[#008431]"
    >
      Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}
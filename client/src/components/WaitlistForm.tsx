import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateWaitlistEntry } from "@/hooks/use-waitlist";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Extend schema for client-side valid email messages
const formSchema = insertWaitlistEntrySchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useCreateWaitlistEntry();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle2 size={24} strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">You're on the list!</h3>
            <p className="text-muted-foreground">
              Thank you for joining our community. We'll notify you as soon as Jijé launches in your city.
            </p>
            <Button 
              variant="ghost" 
              className="mt-4 text-primary hover:text-primary/80"
              onClick={() => setIsSuccess(false)}
            >
              Add another email
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="relative">
              <Input
                {...form.register("email")}
                placeholder="Enter your email address"
                className="h-14 px-6 rounded-full bg-white border-2 border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/10 shadow-lg text-lg transition-all"
                disabled={isPending}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 ml-4 font-medium animate-in slide-in-from-top-1">
                {form.formState.errors.email.message}
              </p>
            )}
            
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 rounded-full text-lg font-bold hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0 w-full bg-[#008431]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Join 2,000+ others waiting for authentic flavors. No spam, ever.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useMutation } from "@tanstack/react-query";
import { api, type WaitlistEntryInput, type WaitlistEntryResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateWaitlistEntry() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: WaitlistEntryInput) => {
      // Validate locally first (optional, but good practice if using zod locally too)
      const validated = api.waitlist.create.input.parse(data);

      const res = await fetch(api.waitlist.create.path, {
        method: api.waitlist.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 409) {
          const error = api.waitlist.create.responses[409].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 400) {
           const error = api.waitlist.create.responses[400].parse(await res.json());
           throw new Error(error.message || "Invalid input");
        }
        throw new Error("Failed to join waitlist. Please try again.");
      }

      return api.waitlist.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Jijé!",
        description: "You've successfully joined the waitlist. We'll be in touch soon.",
        variant: "default", // You might want to style a 'success' variant in toaster
        className: "bg-primary text-primary-foreground border-none"
      });
    },
    onError: (error) => {
      toast({
        title: "Couldn't join waitlist",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

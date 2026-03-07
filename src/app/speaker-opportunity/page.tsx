"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  expertise: z.string().min(5, { message: "Please tell us a bit more about your expertise." }),
  abstract: z.string().min(20, { message: "Please provide a short abstract of what you'd like to speak about." }),
});

export default function SpeakerOpportunity() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      expertise: "",
      abstract: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Interest Submitted",
      description: "Thank you for your interest. Our team will review your application and get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="space-y-4 mb-8">
        <h1 className="font-headline text-4xl text-foreground">Speak at InnovateHub</h1>
        <p className="text-muted-foreground leading-relaxed">
          We're always looking for fresh voices and groundbreaking ideas. Fill out the form below to let us know you're interested in presenting at one of our upcoming events.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area of Expertise</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Fintech, Sustainable Energy, Biotech" {...field} />
                </FormControl>
                <FormDescription>What is your primary field of innovation?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="abstract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposed Talk Abstract</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe what you'd like to share with the community..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Submit Interest</Button>
        </form>
      </Form>
    </div>
  );
}

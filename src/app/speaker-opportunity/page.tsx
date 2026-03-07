"use client"

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: "name", label: "Name", placeholder: "Enter name" },
  { id: "industry", label: "Industry", placeholder: "Enter industry" },
  { id: "country", label: "Country", placeholder: "Enter country" },
  { id: "organization", label: "Organization", placeholder: "Enter organization type" },
  { id: "orgName", label: "Organization's name", placeholder: "Enter organization's name" },
  { id: "email", label: "Email", placeholder: "Enter email" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  industry: z.string().min(2, "Industry is required"),
  country: z.string().min(2, "Country is required"),
  organization: z.string().min(2, "Organization type is required"),
  orgName: z.string().min(2, "Organization name is required"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function SpeakerOpportunity() {
  const [activeStep, setActiveStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const handsImage = PlaceHolderImages.find(img => img.id === "hands-connection");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      country: "",
      organization: "",
      orgName: "",
      email: "",
    },
  });

  const currentField = steps[activeStep].id as keyof FormData;

  const handleNext = async () => {
    const isStepValid = await form.trigger(currentField);
    if (isStepValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const onSubmit = (data: FormData) => {
    toast({
      title: "Success",
      description: "We've received your information. Let's schedule a time.",
    });
    // Redirect to schedule meeting page
    setTimeout(() => router.push("/schedule-meeting"), 1500);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-6 py-12 md:px-[60px]">
      <h1 className="font-headline text-3xl md:text-4xl mb-8 animate-fade-up">
        Let's get acquainted
      </h1>

      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden bg-muted mb-0 animate-fade-in [animation-delay:0.25s]">
        <div className="relative h-[340px] w-full">
          <Image
            src={handsImage?.imageUrl || "https://i.ibb.co/q3kMym7J/mage-2.jpg"}
            alt="Connecting hands"
            fill
            className="object-cover"
            priority
            data-ai-hint="connecting hands"
          />
        </div>
      </div>

      <div className="w-full max-w-[920px] bg-muted flex items-center px-7 py-6 mb-1 animate-fade-up [animation-delay:0.4s]">
        <input
          {...form.register(currentField)}
          type={currentField === "email" ? "email" : "text"}
          placeholder={steps[activeStep].placeholder}
          className="flex-1 bg-transparent border-none outline-none text-lg font-light placeholder:text-muted-foreground focus:ring-0"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (activeStep === steps.length - 1) {
                form.handleSubmit(onSubmit)();
              } else {
                handleNext();
              }
            }
          }}
        />
        <span 
          className="text-muted-foreground text-2xl cursor-pointer hover:text-foreground transition-colors select-none"
          onClick={() => activeStep === steps.length - 1 ? form.handleSubmit(onSubmit)() : handleNext()}
        >
          &#x21B5;
        </span>
      </div>

      <div className="w-full max-w-[920px] flex flex-wrap items-center px-7 py-6 animate-fade-up [animation-delay:0.5s]">
        <div className="flex flex-wrap gap-y-4">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => index < activeStep && setActiveStep(index)}
              className={cn(
                "text-[0.88rem] mr-11 whitespace-nowrap transition-colors",
                index === activeStep ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
                index > activeStep && "cursor-default opacity-50"
              )}
            >
              {step.label}
            </button>
          ))}
        </div>
        <button
          onClick={form.handleSubmit(onSubmit)}
          className="ml-auto italic text-[0.88rem] text-muted-foreground hover:text-foreground transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

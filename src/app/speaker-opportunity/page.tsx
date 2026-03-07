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

  const handleManualSubmit = () => {
    toast({
      title: "Submitting...",
      description: "Redirecting you to the schedule page.",
    });
    router.push("/schedule-meeting");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-8 md:py-12 md:px-[60px]">
      <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-10 animate-fade-up">
        Let&apos;s get acquainted
      </h1>

      {/* Image Container */}
      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden bg-muted mb-8 md:mb-10 animate-fade-in [animation-delay:0.25s]">
        <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
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

      {/* Form Container */}
      <div className="w-full max-w-[920px] flex-1 flex flex-col">
        {/* Current Field Label */}
        <div className="mb-4 md:mb-5">
          <label className="block text-sm md:text-base text-muted-foreground font-medium mb-2">
            {steps[activeStep].label}
          </label>
        </div>

        {/* Input Field */}
        <div className="mb-8 md:mb-10">
          <div className="w-full bg-muted flex items-center px-5 md:px-7 py-5 md:py-6 rounded-lg">
            <input
              {...form.register(currentField)}
              type={currentField === "email" ? "email" : "text"}
              placeholder={steps[activeStep].placeholder}
              className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-body placeholder:text-muted-foreground focus:ring-0"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (activeStep === steps.length - 1) {
                    handleManualSubmit();
                  } else {
                    handleNext();
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => activeStep === steps.length - 1 ? handleManualSubmit() : handleNext()}
              className="text-muted-foreground text-2xl md:text-3xl hover:text-foreground transition-colors p-2 flex-shrink-0"
              aria-label="Next step"
            >
              &#x21B5;
            </button>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => index < activeStep && setActiveStep(index)}
                className={cn(
                  "text-[0.8rem] md:text-[0.9rem] px-3 md:px-4 py-2 md:py-2.5 rounded-full transition-colors",
                  index === activeStep
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  index > activeStep && "cursor-default opacity-50"
                )}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-1" />

        {/* Submit Button */}
        <div className="pt-8 md:pt-10 border-t border-border animate-fade-up [animation-delay:0.5s]">
          <button
            onClick={handleManualSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 md:py-5 px-6 md:px-8 text-base md:text-lg font-medium rounded-lg transition-all duration-200 active:scale-95"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}

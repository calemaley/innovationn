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

const organizationTypes = [
  "Non-Profit / NGO",
  "Government / Public Sector",
  "Private Corporation",
  "Educational Institution",
  "Tech Startup",
  "Consulting Firm",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Media / Publishing",
  "Retail",
  "Telecommunications",
  "Energy / Utilities",
  "Hospitality / Tourism",
  "Other",
];

const steps = [
  { id: "name", label: "Name", placeholder: "Enter name" },
  { id: "industry", label: "Industry", placeholder: "Enter industry" },
  { id: "country", label: "Country", placeholder: "Enter country" },
  { id: "organization", label: "Organization Type", placeholder: "Select organization type" },
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
      } else if (activeStep === steps.length - 1) {
        // All fields complete, trigger submit
        await handleFinalSubmit();
      }
    }
  };

  const handleFinalSubmit = async () => {
    const isFormValid = await form.trigger();
    if (isFormValid) {
      toast({
        title: "Submitting...",
        description: "Redirecting you to the schedule page.",
      });
      setTimeout(() => {
        router.push("/schedule-meeting");
      }, 1000);
    }
  };

  const handleManualSubmit = async () => {
    const isFormValid = await form.trigger();
    if (isFormValid) {
      toast({
        title: "Submitting...",
        description: "Redirecting you to the schedule page.",
      });
      setTimeout(() => {
        router.push("/schedule-meeting");
      }, 1000);
    }
  };

  // Check if all fields are filled
  const formValues = form.watch();
  const allFieldsFilled = steps.every(
    (step) => formValues[step.id as keyof FormData]?.toString().trim() !== ""
  );
  const isSubmitButtonEnabled = allFieldsFilled;

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
        <div className="mb-3 md:mb-5">
          <label className="block text-sm md:text-lg text-muted-foreground font-medium mb-3 md:mb-2">
            {steps[activeStep].label}
          </label>
        </div>

        {/* Input Field */}
        <div className="mb-10 md:mb-12">
          <div className="w-full bg-muted flex items-center px-5 md:px-7 py-6 md:py-7 rounded-lg">
            {currentField === "organization" ? (
              <>
                <select
                  {...form.register(currentField)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl font-body text-muted-foreground focus:ring-0 appearance-none cursor-pointer"
                  onChange={async (e) => {
                    form.setValue(currentField, e.target.value);
                    const isStepValid = await form.trigger(currentField);
                    if (isStepValid && activeStep < steps.length - 1) {
                      setTimeout(() => setActiveStep(activeStep + 1), 300);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                >
                  <option value="">
                    {steps[activeStep].placeholder}
                  </option>
                  {organizationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-muted-foreground text-2xl md:text-3xl hover:text-foreground transition-colors p-2 flex-shrink-0"
                  aria-label="Next step"
                >
                  &#x21B5;
                </button>
              </>
            ) : (
              <>
                <input
                  {...form.register(currentField)}
                  type={currentField === "email" ? "email" : "text"}
                  placeholder={steps[activeStep].placeholder}
                  className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl font-body placeholder:text-muted-foreground focus:ring-0"
                  autoComplete="off"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-muted-foreground text-2xl md:text-3xl hover:text-foreground transition-colors p-2 flex-shrink-0"
                  aria-label="Next step"
                >
                  &#x21B5;
                </button>
              </>
            )}
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => index < activeStep && setActiveStep(index)}
                className={cn(
                  "text-[0.85rem] md:text-[0.95rem] px-4 md:px-5 py-2.5 md:py-3 rounded-full transition-colors",
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
        <div className="pt-10 md:pt-12 border-t border-border animate-fade-up [animation-delay:0.5s]">
          <button
            onClick={handleManualSubmit}
            disabled={!isSubmitButtonEnabled}
            className={cn(
              "w-full py-5 md:py-6 px-6 md:px-8 text-lg md:text-xl font-medium rounded-lg transition-all duration-200 active:scale-95",
              isSubmitButtonEnabled
                ? "bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            )}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}

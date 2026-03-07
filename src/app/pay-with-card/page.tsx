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
  { id: "cardNumber", label: "Card number", placeholder: "Card number" },
  { id: "expiry", label: "Card expiry", placeholder: "MM/YY" },
  { id: "cvv", label: "CVV", placeholder: "CVV" },
];

const formSchema = z.object({
  cardNumber: z.string().min(16, "Invalid card number"),
  expiry: z.string().min(5, "Format MM/YY"),
  cvv: z.string().min(3, "Invalid CVV"),
});

type FormData = z.infer<typeof formSchema>;

export default function PayWithCardPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const cardHeroImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const currentField = steps[activeStep].id as keyof FormData;

  const formatCard = (value: string) => {
    let val = value.replace(/\D/g, '').substring(0, 16);
    return val.match(/.{1,4}/g)?.join(' ') || val;
  };

  const handleNext = async () => {
    const isStepValid = await form.trigger(currentField);
    if (isStepValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        handleFinalSubmit();
      }
    }
  };

  const handleFinalSubmit = () => {
    toast({
      title: "Success",
      description: "Payment processed successfully. Thank you!",
    });
    setTimeout(() => router.push("/thank-you"), 1500);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-6 py-8 md:py-12 md:px-[60px]">
      <h1 className="font-headline text-xl md:text-2xl lg:text-[1.9rem] mb-4 md:mb-6 animate-fade-up text-[#111110]">
        Pay with Card
      </h1>

      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden bg-muted mb-0 animate-fade-in [animation-delay:0.2s]">
        <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
          <Image
            src={cardHeroImage?.imageUrl || "https://i.ibb.co/JW3pfWWG/mage-4.jpg"}
            alt="Payment"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-[920px] bg-[#eeede9] flex items-center px-4 md:px-7 py-4 md:py-[22px] mt-[2px] mb-[2px] animate-fade-up [animation-delay:0.35s]">
        <input
          {...form.register(currentField, {
            onChange: (e) => {
              if (currentField === "cardNumber") {
                e.target.value = formatCard(e.target.value);
              }
            }
          })}
          type="text"
          placeholder={steps[activeStep].placeholder}
          className="flex-1 bg-transparent border-none outline-none text-base md:text-lg font-light text-[#111110] placeholder:text-[#aaa9a6] focus:ring-0 tracking-[0.05em]"
          autoComplete="off"
          maxLength={currentField === "cardNumber" ? 19 : currentField === "cvv" ? 4 : 5}
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
          className="text-[#aaa9a6] text-lg md:text-[1.1rem] hover:text-[#111110] transition-colors p-1 flex-shrink-0"
          aria-label="Next"
        >
          &#x21B5;
        </button>
      </div>

      <div className="w-full max-w-[920px] flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 px-1 py-4 md:py-5 animate-fade-up [animation-delay:0.45s]">
        <div className="flex flex-wrap gap-3 md:gap-0">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => index < activeStep && setActiveStep(index)}
              className={cn(
                "text-[0.75rem] md:text-[0.88rem] md:mr-8 lg:mr-11 transition-colors",
                index === activeStep ? "text-[#2255e0] font-medium" : "text-[#aaa9a6] hover:text-[#111110]",
                index > activeStep && "cursor-default opacity-50"
              )}
            >
              {step.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="italic text-[0.75rem] md:text-[0.88rem] text-[#aaa9a6] hover:text-[#111110] transition-colors md:ml-auto"
        >
          Pay
        </button>
      </div>
    </div>
  );
}

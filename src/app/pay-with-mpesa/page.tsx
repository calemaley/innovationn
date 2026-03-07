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

const formSchema = z.object({
  phoneNumber: z.string().min(10, "Invalid phone number"),
});

type FormData = z.infer<typeof formSchema>;

export default function PayWithMpesaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const mpesaHeroImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "M-Pesa STK Push Sent",
      description: "Please check your phone to complete the payment.",
    });
    setTimeout(() => router.push("/thank-you"), 2000);
  };

  const formatMpesa = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d+]/g, '');
    if (val.startsWith('+')) {
      val = '+' + val.slice(1).replace(/\D/g, '');
    }
    e.target.value = val;
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-6 py-8 md:py-12 md:px-[60px]">
      <h1 className="font-headline text-2xl md:text-3xl lg:text-[2.1rem] mb-6 md:mb-8 animate-fade-up text-[#111110]">
        Pay with M-Pesa
      </h1>

      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden bg-muted mb-0 animate-fade-in [animation-delay:0.2s]">
        <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
          <Image
            src={mpesaHeroImage?.imageUrl || "https://i.ibb.co/JW3pfWWG/mage-4.jpg"}
            alt="M-Pesa Payment"
            fill
            className="object-cover object-[center_30%]"
            priority
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[920px]">
        <div className="w-full bg-[#eeede9] flex items-center px-5 md:px-7 py-5 md:py-6 mt-[2px] mb-[2px] animate-fade-up [animation-delay:0.35s] rounded-[2px]">
          <input
            {...register("phoneNumber", { onChange: formatMpesa })}
            type="tel"
            placeholder="Enter M-pesa number"
            className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-light text-[#111110] placeholder:text-[#aaa9a6] focus:ring-0"
            autoComplete="off"
            maxLength={13}
          />
          <button type="submit" className="text-[#aaa9a6] text-xl md:text-2xl hover:text-[#111110] transition-colors p-1 flex-shrink-0 bg-transparent border-none cursor-pointer" aria-label="Submit">
            &#x21B5;
          </button>
        </div>
      </form>

      <div className="w-full max-w-[920px] flex flex-col items-center gap-6 md:gap-8 px-1 py-6 md:py-8 animate-fade-up [animation-delay:0.45s]">
        <button className="text-[0.85rem] md:text-[0.95rem] text-[#2255e0] font-medium">
          M-pesa number
        </button>
        <button
          onClick={handleSubmit(onSubmit)}
          className="italic text-[0.85rem] md:text-[0.95rem] text-[#aaa9a6] hover:text-[#111110] transition-colors"
        >
          Pay
        </button>
      </div>
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm mt-4 max-w-[920px] mx-auto w-full px-1">{errors.phoneNumber.message}</p>
      )}
    </div>
  );
}

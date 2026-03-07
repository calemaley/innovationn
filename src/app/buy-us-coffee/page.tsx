"use client"

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

export default function BuyUsCoffeePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [usdAmount, setUsdAmount] = useState("50");
  const [paymentMethod, setPaymentMethod] = useState("Pay with card");
  const coffeeImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");
  
  const exchangeRate = 129;
  const kesAmount = (parseFloat(usdAmount) * exchangeRate).toLocaleString('en-KE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });

  const handleBuyCoffee = () => {
    if (paymentMethod === "Pay with card") {
      router.push("/pay-with-card");
    } else if (paymentMethod === "Pay with M-Pesa") {
      router.push("/pay-with-mpesa");
    } else {
      toast({
        title: "Processing...",
        description: `Initiating ${paymentMethod} payment for USD ${usdAmount}.`,
      });
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in">
      {/* Main Image Container */}
      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-0 opacity-0 animate-fade-in [animation-delay:0.1s] [animation-fill-mode:forwards]">
        <div className="relative w-full aspect-[16/9] md:aspect-[4/3]">
          <Image
            src={coffeeImage?.imageUrl || "https://i.ibb.co/JW3pfWWG/mage-4.jpg"}
            alt="Support InnovationZ"
            fill
            className="object-cover object-top"
            priority
            data-ai-hint="city skyline"
          />
        </div>
      </div>

      {/* Caption */}
      <p className="w-full max-w-[920px] px-2 md:px-[2px] py-3 md:py-3.5 text-[0.9rem] md:text-[1rem] font-light italic text-[#111110] opacity-0 animate-fade-up [animation-delay:0.3s] [animation-fill-mode:forwards]">
        Our media partners publish our case studies synthesized from our webinars to 2.2M daily readers
      </p>

      {/* Peek Strip */}
      <div className="w-full max-w-[920px] h-12 md:h-16 overflow-hidden rounded-[2px] mb-4 md:mb-3 opacity-0 animate-fade-in [animation-delay:0.35s] [animation-fill-mode:forwards]">
        <div className="relative h-full w-full">
          <Image
            src={coffeeImage?.imageUrl || "https://i.ibb.co/JW3pfWWG/mage-4.jpg"}
            alt=""
            fill
            className="object-cover object-bottom"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Controls Container */}
      <div className="w-full max-w-[920px] opacity-0 animate-fade-up [animation-delay:0.45s] [animation-fill-mode:forwards]">
        {/* Controls Row */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 md:gap-3 mb-4 md:mb-0">

          {/* Payment Method Select */}
          <div className="relative flex-1">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-12 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
            >
              <option>Pay with card</option>
              <option>Pay with M-Pesa</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
          </div>

          {/* Amount Select */}
          <div className="relative flex-1">
            <select
              value={usdAmount}
              onChange={(e) => setUsdAmount(e.target.value)}
              className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-12 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
            >
              <option value="10">USD 10</option>
              <option value="25">USD 25</option>
              <option value="50">USD 50</option>
              <option value="100">USD 100</option>
              <option value="250">USD 250</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
          </div>

          {/* Amount Display */}
          <div className="flex-1 bg-white border border-[#eeede9] flex items-center justify-center md:justify-start px-4 md:px-6 py-4 md:py-[18px] text-[0.95rem] md:text-[1.05rem] italic text-[#111110] rounded-[2px]">
            <span>Approximately</span>
            <span className="ml-1 font-medium">KES {kesAmount}</span>
          </div>

          {/* CTA Button - Desktop */}
          <button
            onClick={handleBuyCoffee}
            className="hidden md:flex bg-[#2255e0] hover:bg-[#1a44c8] text-white py-4 md:py-[18px] px-6 md:px-8 text-[0.95rem] md:text-[1.05rem] font-medium items-center justify-center gap-2 md:gap-3 rounded-[2px] transition-colors"
          >
            Buy us coffee
            <span className="flex items-center justify-center w-[24px] md:w-[26px] h-[24px] md:h-[26px] rounded-full border-[1.5px] border-white/60 text-[0.75rem] md:text-[0.85rem]">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* CTA Button - Mobile */}
        <button
          onClick={handleBuyCoffee}
          className="md:hidden w-full bg-[#2255e0] hover:bg-[#1a44c8] text-white py-4 px-6 text-[0.95rem] font-medium flex items-center justify-center gap-2 rounded-[2px] transition-colors mt-4"
        >
          Buy us coffee
          <span className="flex items-center justify-center w-[24px] h-[24px] rounded-full border-[1.5px] border-white/60 text-[0.75rem]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>
    </main>
  );
}

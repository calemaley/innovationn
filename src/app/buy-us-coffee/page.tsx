"use client"

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

export default function BuyUsCoffeePage() {
  const { toast } = useToast();
  const [usdAmount, setUsdAmount] = useState("50");
  const coffeeImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");
  
  const exchangeRate = 129;
  const kesAmount = (parseFloat(usdAmount) * exchangeRate).toLocaleString('en-KE', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });

  const handleBuyCoffee = () => {
    toast({
      title: "Processing...",
      description: `Initiating payment for USD ${usdAmount}. Thank you for your support!`,
    });
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-16 pt-0 animate-fade-in">
      {/* Main Image Container */}
      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-0 opacity-0 animate-fade-in [animation-delay:0.1s] [animation-fill-mode:forwards]">
        <div className="relative h-[400px] w-full">
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
      <p className="w-full max-w-[920px] px-[2px] py-3.5 text-[0.92rem] font-light italic text-[#111110] opacity-0 animate-fade-up [animation-delay:0.3s] [animation-fill-mode:forwards]">
        Our media partners publish our case studies synthesized from our webinars to 2.2M daily readers
      </p>

      {/* Peek Strip */}
      <div className="w-full max-w-[920px] h-[64px] overflow-hidden rounded-[2px] mb-3 opacity-0 animate-fade-in [animation-delay:0.35s] [animation-fill-mode:forwards]">
        <div className="relative h-[400px] w-full -mt-[336px]">
          <Image
            src={coffeeImage?.imageUrl || "https://i.ibb.co/JW3pfWWG/mage-4.jpg"}
            alt=""
            fill
            className="object-cover object-bottom"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Controls Row */}
      <div className="w-full max-w-[920px] flex flex-col lg:flex-row items-stretch gap-2 opacity-0 animate-fade-up [animation-delay:0.45s] [animation-fill-mode:forwards]">
        
        {/* Payment Method Select */}
        <div className="relative flex-1 lg:flex-none">
          <select 
            className="w-full lg:min-w-[180px] appearance-none bg-[#eeede9] border-none py-[18px] pl-6 pr-12 text-[0.95rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body"
          >
            <option>Pay with card</option>
            <option>Pay with M-Pesa</option>
            <option>Pay with PayPal</option>
            <option>Pay with crypto</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
        </div>

        {/* Amount Select */}
        <div className="relative flex-1 lg:flex-none">
          <select 
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            className="w-full lg:min-w-[150px] appearance-none bg-[#eeede9] border-none py-[18px] pl-6 pr-12 text-[0.95rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body"
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
        <div className="flex-1 bg-white border border-[#eeede9] flex items-center px-6 py-[18px] text-[0.95rem] italic text-[#111110] rounded-[2px] whitespace-nowrap">
          Approximately KES {kesAmount}
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleBuyCoffee}
          className="bg-[#2255e0] hover:bg-[#1a44c8] text-white py-[18px] px-8 text-[0.95rem] font-medium flex items-center justify-center lg:justify-start gap-3 rounded-[2px] transition-colors whitespace-nowrap"
        >
          Buy us coffee
          <span className="flex items-center justify-center w-[26px] h-[26px] rounded-full border-[1.5px] border-white/60 text-[0.85rem]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>

      </div>
    </main>
  );
}

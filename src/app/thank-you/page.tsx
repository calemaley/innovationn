"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ThankYouPage() {
  const router = useRouter();
  const thankYouImage = PlaceHolderImages.find(img => img.id === "thank-you-hero");

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-16 pt-5 animate-fade-in">
      {/* Heading Row */}
      <div className="w-full max-w-[920px] flex items-center gap-3 mb-7 opacity-0 animate-fade-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
        <h1 className="font-headline text-[1.9rem] text-[#111110] leading-tight tracking-tight">
          Check for incoming mail
        </h1>
        <div className="relative -top-1">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 32 L34 8 L20 36 L17 26 Z" fill="none" stroke="#111110" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M17 26 L34 8" stroke="#111110" strokeWidth="1.5"/>
            <path d="M10 36 Q6 30 10 26 Q14 22 10 18" stroke="#111110" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="w-full max-w-[920px] relative rounded-[4px] overflow-hidden opacity-0 animate-fade-in [animation-delay:0.2s] [animation-fill-mode:forwards]">
        <div className="relative h-[360px] w-full">
          <Image
            src={thankYouImage?.imageUrl || "https://i.ibb.co/NnZXqjh2/mage-5.jpg"}
            alt="Thank you"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Text */}
          <div className="absolute bottom-24 left-1/2 -translate-x-[20%] font-body text-[1rem] text-[#111110] pointer-events-none">
            Thank you
          </div>
        </div>
      </div>

      {/* Bottom Question Row */}
      <div className="w-full max-w-[920px] flex flex-col sm:flex-row items-center gap-3 pt-4 opacity-0 animate-fade-up [animation-delay:0.4s] [animation-fill-mode:forwards]">
        <p className="flex-1 text-[0.95rem] font-light text-[#111110]">
          Would you like updates on industry specific student innovations?
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => router.push("/")}
            className="bg-[#e8e7e3] hover:bg-[#dddcd8] text-[#111110] py-[18px] px-9 text-[0.95rem] rounded-[2px] transition-colors whitespace-nowrap"
          >
            No
          </button>
          
          <button 
            onClick={() => router.push("/")}
            className="bg-[#2255e0] hover:bg-[#1a44c8] text-white py-[18px] px-8 text-[0.95rem] font-medium flex items-center justify-center gap-3 rounded-[2px] transition-colors whitespace-nowrap"
          >
            Yes please
            <span className="flex items-center justify-center w-[26px] h-[26px] rounded-full border-[1.5px] border-white/60 text-[0.85rem]">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

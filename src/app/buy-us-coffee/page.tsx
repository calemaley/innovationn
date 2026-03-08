'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight, AlertCircle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

export default function BuyUsCoffeePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [usdAmount, setUsdAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [customAmountError, setCustomAmountError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay with card");
  const coffeeImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");

  const exchangeRate = 129;
  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : parseFloat(usdAmount);
  const kesAmount = (finalAmount * exchangeRate).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'other') {
      setIsCustom(true);
      setUsdAmount('other');
      setCustomAmount("");
      setCustomAmountError("");
    } else {
      setIsCustom(false);
      setUsdAmount(value);
      setCustomAmountError("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        setCustomAmount(value);
        const numericValue = parseFloat(value);
        if (numericValue < 50) {
            setCustomAmountError("Custom amount must be at least USD 50.");
        } else {
            setCustomAmountError("");
        }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!/\S+@\S+\.\S+/.test(value)) {
        setEmailError("Please enter a valid email address.");
    } else {
        setEmailError("");
    }
  };

  const handleBuyCoffee = () => {
    if (emailError || !email) {
        toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
        return;
    }
    if (isCustom && (customAmountError || !customAmount)) {
        toast({ title: "Invalid Amount", description: "Please enter a custom amount of at least USD 50.", variant: "destructive" });
        return;
    }

    const amountInKes = (finalAmount * exchangeRate).toFixed(2);

    const queryParams = new URLSearchParams({
        amount: amountInKes,
        email: email,
    });

    if (paymentMethod === "Pay with card") {
      router.push(`/pay-with-card?${queryParams.toString()}`);
    } else if (paymentMethod === "Pay with M-Pesa") {
      router.push(`/pay-with-mpesa?${queryParams.toString()}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in">
      {/* Image Container */}
      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-3 opacity-0 animate-fade-in [animation-delay:0.1s] [animation-fill-mode:forwards]">
        <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
          <Image
            src={coffeeImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'}
            alt="Buy us a coffee"
            fill
            className="object-cover"
            priority
            data-ai-hint="buy us a coffee hero image"
          />
        </div>
      </div>

      {/* Controls Container */}
      <div className="w-full max-w-[920px] opacity-0 animate-fade-up [animation-delay:0.35s] [animation-fill-mode:forwards]">
        {/* Email Input */}
        <div className="flex-1 mb-3">
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`w-full bg-[#eeede9] border-none py-4 md:py-[18px] px-6 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none font-body transition-colors focus:ring-2 ${emailError ? 'focus:ring-red-500/50' : 'focus:ring-primary/20'}`}
            />
            {emailError && (
                <p className="flex items-center text-red-600 text-xs mt-2 ml-1">
                    <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                    {emailError}
                </p>
            )}
        </div>

        {/* Controls Row */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 md:gap-3 mb-4 md:mb-0">
          {/* Amount Select/Input */}
          <div className="flex-1">
            <div className="relative">
                <select
                    value={usdAmount}
                    onChange={handleAmountChange}
                    className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-12 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
                >
                    <option value="50">USD 50</option>
                    <option value="100">USD 100</option>
                    <option value="250">USD 250</option>
                    <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
            </div>
            {isCustom && (
                <div className="mt-3">
                    <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter amount (min 50)"
                        className={`w-full bg-[#eeede9] border-none py-4 md:py-[18px] px-6 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none font-body transition-colors focus:ring-2 ${customAmountError ? 'focus:ring-red-500/50' : 'focus:ring-primary/20'}`}
                    />
                    {customAmountError && (
                        <p className="flex items-center text-red-600 text-xs mt-2 ml-1">
                            <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                            {customAmountError}
                        </p>
                    )}
                </div>
            )}
          </div>
          
          {/* KES Display */}
          <div className="flex-1 bg-[#eeede9] flex items-center justify-center md:justify-start px-4 md:px-6 py-4 md:py-[18px] text-[0.95rem] md:text-[1.05rem] text-[#5a5a58] rounded-[2px]">
            <span>KES {kesAmount}</span>
          </div>

          {/* Payment Method Select */}
          <div className="relative flex-1">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-11 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
            >
              <option>Pay with card</option>
              <option>Pay with M-Pesa</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
          </div>

          {/* CTA Button - Desktop */}
          <button
            onClick={handleBuyCoffee}
            disabled={isCustom && (customAmountError !== "" || customAmount === "")}
            className="hidden md:flex bg-[#2255e0] hover:bg-[#1a44c8] text-white py-4 md:py-[18px] px-6 md:px-8 text-[0.95rem] md:text-[1.05rem] font-medium items-center justify-center gap-2 md:gap-3 rounded-[2px] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Buy us a coffee
            <span className="flex items-center justify-center w-[24px] md:w-[26px] h-[24px] md:h-[26px] rounded-full border-[1.5px] border-white/60 text-[0.75rem] md:text-[0.85rem]">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* CTA Button - Mobile */}
        <button
          onClick={handleBuyCoffee}
          disabled={isCustom && (customAmountError !== "" || customAmount === "")}
          className="md:hidden w-full bg-[#2255e0] hover:bg-[#1a44c8] text-white py-4 px-6 text-[0.95rem] font-medium flex items-center justify-center gap-2 rounded-[2px] transition-colors mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Buy us a coffee
          <span className="flex items-center justify-center w-[24px] h-[24px] rounded-full border-[1.5px] border-white/60 text-[0.75rem]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>
    </main>
  );
}

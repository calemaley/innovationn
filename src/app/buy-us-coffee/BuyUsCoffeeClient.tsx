
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown } from 'lucide-react';

const KES_CONVERSION_RATE = 130;

const BuyButtonArrow = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 15L15 11L11 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 11H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Custom Dropdown Component
const CustomDropdown = ({ options, selected, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full h-[100px] bg-[#E9E9E9] rounded-[5px] px-6 text-2xl font-light flex items-center justify-between"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1 w-full bg-white rounded-[5px] shadow-lg z-10 border border-gray-200">
          {options.map(option => (
            <div 
              key={option.value} 
              onClick={() => handleSelect(option)}
              className="px-6 py-4 text-xl font-light cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default function BuyUsCoffeeClient() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState({ value: 'pay-with-card', label: 'Pay with Card' });
  const [amountOption, setAmountOption] = useState({ value: 100, label: '$100' });
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);


  useEffect(() => {
    const emailFromParams = searchParams.get('email');
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  const heroImage = PlaceHolderImages.find(img => img.id === 'buy-us-coffee-hero');

  const meetingParams = {
      month: searchParams.get('month'),
      day: searchParams.get('day'),
      time: searchParams.get('time'),
      timezone: searchParams.get('timezone'),
  };
  
  const finalAmount = useMemo(() => {
    if (isCustomAmount) {
      const parsedAmount = parseFloat(customAmount);
      return isNaN(parsedAmount) ? 0 : parsedAmount;
    }
    return amountOption.value;
  }, [amountOption, customAmount, isCustomAmount]);

  const handleProceed = () => {
    if (finalAmount < 50) {
      toast({ title: "Invalid Amount", description: "The minimum amount is $50.", variant: "destructive" });
      return;
    }
    if (!email) {
      toast({ title: "Email Not Found", description: "We couldn't find your email. Please go back and try again.", variant: "destructive" });
      return;
    }

    const queryParams = new URLSearchParams({
        amount: String(finalAmount),
        email,
        ...(meetingParams.month && { month: meetingParams.month }),
        ...(meetingParams.day && { day: meetingParams.day }),
        ...(meetingParams.time && { time: meetingParams.time }),
        ...(meetingParams.timezone && { timezone: meetingParams.timezone }),
    }).toString();

    router.push(`/${paymentMethod.value}?${queryParams}`);
  };

  const paymentOptions = [
    { value: 'pay-with-card', label: 'Pay with Card' },
    { value: 'pay-with-mpesa', label: 'Pay with M-Pesa' }
  ];

  const amountOptions = [
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
    { value: 'other', label: 'Other' }
  ];

  const handleAmountSelect = (option) => {
    if (option.value === 'other') {
      setIsCustomAmount(true);
      setAmountOption(option);
      setCustomAmount('');
    } else {
      setIsCustomAmount(false);
      setAmountOption(option);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in font-['Inter']">
      
      {/* Image Section */}
      <div className="w-full flex flex-col items-center mb-8">
        <div className="relative w-[315px] h-[376px] md:w-full md:max-w-[1164px] md:h-[654px] rounded-[4px] overflow-hidden">
            <Image
              src={heroImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'}
              alt="Support Us"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1165px] h-auto md:h-[66px] bg-white/90 backdrop-blur-sm items-center justify-center p-4">
              <p className="text-black text-center text-lg md:text-xl italic font-normal">
                Our media partners publish our case studies synthesized from our webinars to 2.2M daily readers
              </p>
            </div>
        </div>
        <div className="md:hidden mt-4 w-[315px]">
          <p className="text-black text-[15px] font-light leading-normal">
            A case study for 2 million newspaper readers
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="w-full max-w-[1164px] flex flex-wrap items-center justify-center md:justify-between gap-4">

        {/* Payment Method Dropdown */}
        <div className="w-full md:w-[268px]">
          <CustomDropdown
            options={paymentOptions}
            selected={paymentMethod}
            onSelect={setPaymentMethod}
            placeholder="Select Payment Method"
          />
        </div>

        {/* Amount Dropdown / Input */}
        <div className="w-full md:w-auto flex items-center gap-4">
          <div className="w-full md:w-[200px]">
            <CustomDropdown
              options={amountOptions}
              selected={isCustomAmount ? amountOptions.find(o => o.value === 'other') : amountOption}
              onSelect={handleAmountSelect}
              placeholder="Select Amount"
            />
          </div>
          {isCustomAmount && (
            <input
              type="number"
              placeholder="Amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              onBlur={(e) => {
                if (parseFloat(e.target.value) < 50) {
                  toast({ title: "Invalid Amount", description: "Minimum amount is $50.", variant: "destructive" });
                }
              }}
              className="h-[100px] w-full md:w-[150px] bg-[#E9E9E9] border-none rounded-[5px] px-6 text-2xl font-light text-black outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition"
            />
          )}
        </div>

        {/* KES Approximation */}
        <div className="h-[100px] flex items-center justify-center p-4 text-center md:text-left">
            <p className="text-black font-light italic text-2xl">
              ~ KES {(finalAmount * KES_CONVERSION_RATE).toLocaleString()}
            </p>
        </div>

        {/* Buy Button */}
        <button onClick={handleProceed} className="w-full md:w-[290px] h-[100px] bg-[#0059FF] hover:bg-blue-700 transition-colors rounded-[5px] flex items-center justify-between md:justify-center px-8 md:px-4 md:gap-4 text-white text-2xl font-normal">
          Buy us coffee
          <BuyButtonArrow />
        </button>

      </div>
    </main>
  );
}

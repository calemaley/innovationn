'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const EnterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="31" viewBox="0 0 44 31" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M42.0758 0.000383682C41.8175 0.00509147 41.5714 0.125149 41.3916 0.334213C41.2117 0.543277 41.1129 0.824225 41.1167 1.11537L41.1351 18.2531H3.37409L11.2513 9.61152C11.3437 9.51105 11.4176 9.39097 11.4688 9.25821C11.5199 9.12545 11.5473 8.98263 11.5493 8.83791C11.5514 8.69319 11.528 8.54944 11.4806 8.41492C11.4332 8.28041 11.3627 8.15778 11.2731 8.05407C11.1836 7.95035 11.0767 7.8676 10.9587 7.81057C10.8407 7.75354 10.7138 7.72333 10.5854 7.72171C10.457 7.7201 10.3296 7.7471 10.2105 7.80115C10.0914 7.85519 9.98289 7.93523 9.89129 8.03666L0.294663 18.5645C0.201453 18.6668 0.127361 18.7892 0.0767545 18.9243C0.0261477 19.0594 5.00371e-05 19.2046 7.18821e-08 19.3512C-4.98934e-05 19.4979 0.0259488 19.6431 0.0764635 19.7782C0.126978 19.9134 0.200987 20.0358 0.294127 20.1382L9.89074 30.6879C9.98241 30.7887 10.0908 30.8681 10.2097 30.9216C10.3286 30.9751 10.4557 31.0017 10.5837 30.9999C10.7117 30.9981 10.8381 30.9678 10.9558 30.9109C11.0734 30.854 11.18 30.7715 11.2694 30.6682C11.3587 30.5648 11.4292 30.4427 11.4767 30.3086C11.5241 30.1746 11.5477 30.0314 11.5461 29.8871C11.5445 29.7428 11.5176 29.6003 11.4671 29.4677C11.4167 29.3351 11.3435 29.215 11.2518 29.1142L3.37029 20.4502H41.9489C42.1003 20.4788 42.2556 20.4666 42.4021 20.4147C42.5486 20.3628 42.6822 20.2727 42.7919 20.1516C42.8018 20.1412 42.8115 20.1306 42.821 20.1197C42.9278 19.9964 43.0074 19.8466 43.0533 19.6823C43.0993 19.518 43.1103 19.3438 43.0855 19.1738L43.0666 1.11272C43.0682 0.965742 43.0437 0.819872 42.9944 0.683768C42.9452 0.547664 42.8722 0.424106 42.7798 0.320365C42.6874 0.216624 42.5775 0.134819 42.4565 0.0798174C42.3356 0.0248155 42.2061 -0.00203632 42.0758 0.000383682Z" fill="#878787"/>
    </svg>
);

const BuyButtonArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L16 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function PayWithCardClient() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const heroImage = PlaceHolderImages.find(img => img.id === 'buy-us-coffee-hero');

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [activeField, setActiveField] = useState('cardNumber');

    const handlePayment = () => {
        if (!cardNumber || !expiry || !cvv) {
            toast({ title: "Incomplete Details", description: "Please fill in all card details.", variant: "destructive" });
            return;
        }
        // Mock payment processing
        toast({ title: "Payment Successful", description: "Thank you for your support!" });
        router.push('/'); 
    };

    return (
        <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-8 font-['Inter'] animate-fade-in">
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col items-center w-full max-w-[1164px]">
                <p className="text-black text-4xl font-light mb-8">Pay with Card</p>
                <div className="relative w-full h-[450px] aspect-video rounded-md overflow-hidden mb-8">
                    <Image 
                        src={heroImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'} 
                        alt="Pay with card hero" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>

                <div className="w-full h-[100px] bg-[#F5F4F0] rounded-[5px] flex items-center px-8 mb-6">
                    <input 
                        type="text"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="flex-grow bg-transparent text-[#878787] text-3xl font-extralight outline-none placeholder:text-[#878787]"
                    />
                    <EnterIcon />
                </div>

                <div className="flex items-center gap-12 text-2xl font-light">
                    <span className="text-[#0059FF]">Card number</span>
                    <span className="text-black">Card expiry</span>
                    <span className="text-black">CVV</span>
                    <span className="text-[#878787] italic">Pay</span>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col items-center p-6 rounded-lg w-full max-w-[420px] mx-auto bg-white">
                <div className="relative w-[315px] h-[376px] rounded-md overflow-hidden mb-6">
                    <Image 
                        src={heroImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'} 
                        alt="Pay with card hero" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
                <p className="text-[#000000] text-[15px] font-light not-italic leading-normal mb-6 w-[315px]">A case study for 2 million newspaper readers</p>

                <div className="w-[315px] flex flex-col gap-4">
                    <input 
                        type="text"
                        placeholder="Card number"
                        className="w-full h-[64px] bg-[#F5F4F0] rounded-[5px] px-4 text-[#878787] text-xl font-light outline-none placeholder:text-[#878787]"
                    />
                    <input 
                        type="text"
                        placeholder="Card expiry"
                        className="w-full h-[64px] bg-[#F5F4F0] rounded-[5px] px-4 text-[#878787] text-xl font-light outline-none placeholder:text-[#878787]"
                    />
                    <input 
                        type="text"
                        placeholder="CVV"
                        className="w-full h-[64px] bg-[#F5F4F0] rounded-[5px] px-4 text-[#878787] text-xl font-light outline-none placeholder:text-[#878787]"
                    />
                </div>

                <button onClick={handlePayment} className="w-[315px] h-[64px] bg-[#0059FF] rounded-[5px] flex items-center justify-between px-6 text-white text-xl font-normal mt-8 mb-4">
                    <span>Buy us coffee</span>
                    <BuyButtonArrow />
                </button>
            </div>
        </main>
    );
}
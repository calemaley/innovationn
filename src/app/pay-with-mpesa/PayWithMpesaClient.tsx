'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormData = z.infer<typeof formSchema>;

export default function PayWithMpesaClient() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const mpesaHeroImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");

    const amount = searchParams.get('amount');
    const email = searchParams.get('email');

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { phone: "" },
    });

    const handleMpesaPayment = async (data: FormData) => {
        if (!amount || !email) {
            toast({ title: "Error", description: "Amount and email are required.", variant: "destructive" });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/paystack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    email,
                    mpesa: {
                        phone: data.phone,
                    },
                }),
            });

            const result = await response.json();

            if (response.ok && result.reference) {
                toast({ title: "STK Sent", description: result.display_text || "Check your phone to complete payment." });
                router.push(`/payment-callback?reference=${result.reference}&amount=${amount}&email=${email}`);
            } else {
                toast({ title: "Payment Failed", description: result.error || 'An error occurred.', variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in font-inter">
            <div className="w-full max-w-[1164px] mx-auto">
                {/* Large Screen */}
                <div className="hidden md:block text-center">
                    <h1 className="text-black font-inter text-4xl font-light mb-8">Pay with M-Pesa</h1>
                    <div className="relative w-full h-[450px] aspect-[194/75] mb-8 mx-auto">
                        <Image src={mpesaHeroImage?.imageUrl || ''} alt="Payment" layout="fill" objectFit="cover" priority />
                    </div>
                    <div className="relative w-full h-[100px] bg-[#F5F4F0] rounded-[5px] flex items-center px-6 mb-4 mx-auto">
                        <input
                            type="tel"
                            {...form.register('phone')}
                            placeholder='Enter M-pesa number'
                            className="w-full bg-transparent border-none text-[#878787] font-inter text-3xl font-extralight outline-none placeholder-gray-light"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="31" viewBox="0 0 44 31" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M42.0758 0.000383682C41.8175 0.00509147 41.5714 0.125149 41.3916 0.334213C41.2117 0.543277 41.1129 0.824225 41.1167 1.11537L41.1351 18.2531H3.37409L11.2513 9.61152C11.3437 9.51105 11.4176 9.39097 11.4688 9.25821C11.5199 9.12545 11.5473 8.98263 11.5493 8.83791C11.5514 8.69319 11.528 8.54944 11.4806 8.41492C11.4332 8.28041 11.3627 8.15778 11.2731 8.05407C11.1836 7.95035 11.0767 7.8676 10.9587 7.81057C10.8407 7.75354 10.7138 7.72333 10.5854 7.72171C10.457 7.7201 10.3296 7.7471 10.2105 7.80115C10.0914 7.85519 9.98289 7.93523 9.89129 8.03666L0.294663 18.5645C0.201453 18.6668 0.127361 18.7892 0.0767545 18.9243C0.0261477 19.0594 5.00371e-05 19.2046 7.18821e-08 19.3512C-4.98934e-05 19.4979 0.0259488 19.6431 0.0764635 19.7782C0.126978 19.9134 0.200987 20.0358 0.294127 20.1382L9.89074 30.6879C9.98241 30.7887 10.0908 30.8681 10.2097 30.9216C10.3286 30.9751 10.4557 31.0017 10.5837 30.9999C10.7117 30.9981 10.8381 30.9678 10.9558 30.9109C11.0734 30.854 11.18 30.7715 11.2694 30.6682C11.3587 30.5648 11.4292 30.4427 11.4767 30.3086C11.5241 30.1746 11.5477 30.0314 11.5461 29.8871C11.5445 29.7428 11.5176 29.6003 11.4671 29.4677C11.4167 29.3351 11.3435 29.215 11.2518 29.1142L3.37029 20.4502H41.9489C42.1003 20.4788 42.2556 20.4666 42.4021 20.4147C42.5486 20.3628 42.6822 20.2727 42.7919 20.1516C42.8018 20.1412 42.8115 20.1306 42.821 20.1197C42.9278 19.9964 43.0074 19.8466 43.0533 19.6823C43.0993 19.518 43.1103 19.3438 43.0855 19.1738L43.0666 1.11272C43.0682 0.965742 43.0437 0.819872 42.9944 0.683768C42.9452 0.547664 42.8722 0.424106 42.7798 0.320365C42.6874 0.216624 42.5775 0.134819 42.4565 0.0798174C42.3356 0.0248155 42.2061 -0.00203632 42.0758 0.000383682Z" fill="#878787"/>
                        </svg>
                    </div>
                     <div className="flex items-center space-x-4 justify-center">
                        <span className="text-[#0059FF] font-inter text-2xl font-light">M-pesa number</span>
                        <button onClick={form.handleSubmit(handleMpesaPayment)} disabled={isLoading} className="text-[#878787] font-inter text-2xl italic font-light disabled:text-gray-400">
                            {isLoading ? 'Processing...' : 'Pay'}
                        </button>
                    </div>
                    {form.formState.errors.phone && (
                        <p className="text-red-600 text-xs mt-1">{form.formState.errors.phone?.message}</p>
                    )}
                </div>

                {/* Small Screen */}
                <div className="md:hidden">
                    <div className="relative w-[315px] h-[493px] mx-auto mb-6">
                        <Image src={mpesaHeroImage?.imageUrl || ''} alt="Payment" layout="fill" objectFit="cover" priority />
                    </div>
                    <p className="text-black font-inter text-center text-[15px] font-light mb-6">
                        A case study for 2 million newspaper readers
                    </p>
                    <div className="w-[315px] h-[54px] border border-[#DADADA] rounded-[2px] flex items-center px-4 mx-auto mb-6">
                        <input
                            type="tel"
                            {...form.register('phone')}
                            placeholder='M-Pesa number'
                            className="w-full bg-transparent border-none text-[#878787] font-inter text-xl font-light outline-none"
                        />
                    </div>
                     <button
                        onClick={form.handleSubmit(handleMpesaPayment)}
                        disabled={isLoading}
                        className="w-[315px] h-[64px] bg-[#0059FF] border border-[#DADADA] rounded-[2px] flex items-center justify-between px-6 text-white font-inter text-xl font-normal mx-auto disabled:bg-gray-400 relative"
                    >
                        Buy us coffee
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16L16 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {form.formState.errors.phone && (
                        <p className="text-red-600 text-xs mt-1 text-center">{form.formState.errors.phone?.message}</p>
                    )}
                </div>
            </div>
        </main>
    );
}

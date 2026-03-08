'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormData = z.infer<typeof formSchema>;

export default function PayWithMpesaPage() {
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
                    payment_method: 'mpesa',
                    mpesa: {
                        phone: data.phone,
                    },
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast({ title: "Success", description: "STK push sent to your phone." });
                router.push(`/thank-you?amount=${amount}&email=${email}`);
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
        <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in">
            <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-3">
                <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
                    <Image src={mpesaHeroImage?.imageUrl || ''} alt="Payment" layout="fill" objectFit="cover" priority />
                </div>
            </div>

            <div className="w-full max-w-[920px]">
                <Progress value={100} className="mb-4 h-2 bg-green-400" />
                <div className="bg-[#eeede9] p-6 rounded-[2px]">
                    <h2 className="text-lg font-semibold mb-4">Enter M-Pesa Phone Number</h2>
                    <input
                        type="tel"
                        {...form.register('phone')}
                        placeholder='07xxxxxxxx'
                        className="w-full bg-white border-none py-3 px-4 text-base rounded-[2px] outline-none mb-2"
                    />
                    {form.formState.errors.phone && (
                        <p className="text-red-600 text-xs mt-1">{form.formState.errors.phone?.message}</p>
                    )}
                </div>

                <div className="flex justify-between mt-4">
                    <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-2 rounded-[2px] bg-gray-200">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <button onClick={form.handleSubmit(handleMpesaPayment)} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#2255e0] text-white disabled:bg-gray-400">
                        {isLoading ? 'Processing...' : 'Pay'} <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </main>
    );
}

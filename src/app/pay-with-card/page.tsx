'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  cardNumber: z.string().min(19, 'Card number must be 16 digits'),
  expiry: z.string().length(5, 'Expiry date must be in MM/YY format'),
  cvv: z.string().min(3, 'CVV must be 3 or 4 digits').max(4),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 'cardNumber', label: 'Card Number' },
  { id: 'expiry', label: 'Expiry' },
  { id: 'cvv', label: 'CVV' },
];

export default function PayWithCardPage() {
    const [activeStep, setActiveStep] = useState(0);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const cardHeroImage = PlaceHolderImages.find(img => img.id === "buy-us-coffee-hero");

    const amount = searchParams.get('amount');
    const email = searchParams.get('email');

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { cardNumber: "", expiry: "", cvv: "" },
    });

    const currentField = steps[activeStep].id as keyof FormData;

    const formatCard = (value: string) => {
        let val = value.replace(/\D/g, '').substring(0, 16);
        return val.match(/.{1,4}/g)?.join(' ') || val;
    };

    const formatExpiry = (value: string) => {
        let val = value.replace(/\D/g, '').substring(0, 4);
        if (val.length > 2) {
            return `${val.substring(0, 2)}/${val.substring(2)}`;
        }
        return val;
    };

    const handleFinalSubmit = async (data: FormData) => {
        if (!amount || !email) {
            toast({ title: "Error", description: "Amount and email are required.", variant: "destructive" });
            return;
        }

        const [expiry_month, expiry_year] = data.expiry.split('/');

        try {
            const response = await fetch('/api/paystack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    email,
                    payment_method: 'card',
                    card: {
                        number: data.cardNumber.replace(/\s/g, ''),
                        cvv: data.cvv,
                        expiry_month,
                        expiry_year,
                    },
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast({ title: "Success", description: "Payment successful!" });
                router.push(`/thank-you?amount=${amount}&email=${email}`);
            } else {
                toast({ title: "Payment Failed", description: result.error || 'An error occurred.', variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        }
    };

    const handleNext = async () => {
        const isStepValid = await form.trigger(currentField);
        if (isStepValid) {
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            } else {
                form.handleSubmit(handleFinalSubmit)();
            }
        }
    };

    const handleBack = () => activeStep > 0 && setActiveStep(activeStep - 1);

    const progress = ((activeStep + 1) / steps.length) * 100;

    return (
        <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in">
            <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-3">
                <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
                    <Image src={cardHeroImage?.imageUrl || ''} alt="Payment" layout="fill" objectFit="cover" priority />
                </div>
            </div>

            <div className="w-full max-w-[920px]">
                <Progress value={progress} className="mb-4 h-2" />
                <div className="bg-[#eeede9] p-6 rounded-[2px]">
                    <h2 className="text-lg font-semibold mb-4">{steps[activeStep].label}</h2>
                    <input
                        type="text"
                        value={form.watch(currentField)}
                        onChange={(e) => {
                            let value = e.target.value;
                            if (currentField === 'cardNumber') value = formatCard(value);
                            if (currentField === 'expiry') value = formatExpiry(value);
                            form.setValue(currentField, value, { shouldValidate: true });
                        }}
                        placeholder={currentField === 'cardNumber' ? '0000 0000 0000 0000' : (currentField === 'expiry' ? 'MM/YY' : '123')}
                        className="w-full bg-white border-none py-3 px-4 text-base rounded-[2px] outline-none mb-2"
                    />
                    {form.formState.errors[currentField] && (
                        <p className="text-red-600 text-xs mt-1">{form.formState.errors[currentField]?.message}</p>
                    )}
                </div>

                <div className="flex justify-between mt-4">
                    <button onClick={handleBack} disabled={activeStep === 0} className="flex items-center gap-2 px-4 py-2 rounded-[2px] bg-gray-200 disabled:opacity-50">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#2255e0] text-white">
                        {activeStep === steps.length - 1 ? 'Pay' : 'Next'} <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </main>
    );
}

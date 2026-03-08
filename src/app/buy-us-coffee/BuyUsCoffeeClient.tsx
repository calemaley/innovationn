'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const amounts = [5, 10, 20, 50, 100, 250];

export default function BuyUsCoffeeClient() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const heroImage = PlaceHolderImages.find(img => img.id === 'buy-us-coffee-hero');

  const meetingParams = {
      month: searchParams.get('month'),
      day: searchParams.get('day'),
      time: searchParams.get('time'),
      timezone: searchParams.get('timezone'),
  };

  const handleProceed = () => {
    const finalAmount = selectedAmount ?? parseFloat(customAmount);

    if (!finalAmount || finalAmount <= 0) {
      toast({ title: "Invalid Amount", description: "Please select or enter a valid amount.", variant: "destructive" });
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (!paymentMethod) {
      toast({ title: "No Payment Method", description: "Please select a payment method.", variant: "destructive" });
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

    router.push(`/${paymentMethod}?${queryParams}`);
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in">
        <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-3">
            <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
                <Image
                    src={heroImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'}
                    alt="Support Us"
                    fill
                    style={{objectFit: "cover"}}
                    priority
                />
            </div>
        </div>

        <div className="w-full max-w-[920px]">
            <div className="bg-[#eeede9] p-6 rounded-[2px]">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Select Amount (USD)</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {amounts.map(amt => (
                            <button key={amt} onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-3 px-2 rounded-[2px] border-2 ${selectedAmount === amt ? 'bg-[#2255e0] text-white border-transparent' : 'bg-white border-white'}`}>
                                ${amt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <input
                        type="number"
                        placeholder="Or enter a custom amount"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                        className="w-full bg-white border-none py-3 px-4 text-base rounded-[2px] outline-none"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border-none py-3 px-4 text-base rounded-[2px] outline-none"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                    <div className="space-y-2">
                        <button onClick={() => setPaymentMethod('pay-with-card')} className={`w-full text-left flex items-center gap-3 p-4 rounded-[2px] border-2 ${paymentMethod === 'pay-with-card' ? 'bg-blue-50 border-[#2255e0]' : 'bg-white border-white'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pay-with-card' ? 'border-[#2255e0] bg-[#2255e0]' : 'border-gray-300'}`}>
                                {paymentMethod === 'pay-with-card' && <Check size={12} className="text-white" />}
                            </div>
                            Pay with Card
                        </button>
                        <button onClick={() => setPaymentMethod('pay-with-mpesa')} className={`w-full text-left flex items-center gap-3 p-4 rounded-[2px] border-2 ${paymentMethod === 'pay-with-mpesa' ? 'bg-blue-50 border-[#2255e0]' : 'bg-white border-white'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'pay-with-mpesa' ? 'border-[#2255e0] bg-[#2255e0]' : 'border-gray-300'}`}>
                                {paymentMethod === 'pay-with-mpesa' && <Check size={12} className="text-white" />}
                            </div>
                            Pay with M-Pesa
                        </button>
                    </div>
                </div>

            </div>

            <div className="mt-4">
                <button onClick={handleProceed} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-[2px] bg-[#2255e0] text-white font-semibold">
                    Proceed <ArrowRight size={18} />
                </button>
            </div>
        </div>
    </main>
  );
}

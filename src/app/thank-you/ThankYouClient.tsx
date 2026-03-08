'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function ThankYouClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const amount = searchParams.get('amount');
    const email = searchParams.get('email');

    useEffect(() => {
        if (amount && email) {
            fetch('/api/send-invoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, email }),
            });
        }
    }, [amount, email]);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(`/mail-redirect?email=${email}`);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, [router, email]);

    return (
        <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Thank you for your purchase. An invoice and event details have been sent to your email.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg text-left max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                    <span className="font-medium">Amount Paid:</span>
                    <span>KES {amount ? parseFloat(amount).toFixed(2) : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{email || 'N/A'}</span>
                </div>
            </div>
        </main>
    );
}

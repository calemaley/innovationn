'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

async function sendConfirmationEmails(email: string, amount: string, reference: string, meetingDetails: any) {
    try {
        await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                amount,
                reference,
                ...meetingDetails,
                subject: 'Payment and Meeting Confirmation',
                message: 'Thank you for your payment and scheduling a meeting!'
            }),
        });
    } catch (error) {
        console.error("Failed to send confirmation emails:", error);
    }
}

function PaymentCallbackClientContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [status, setStatus] = useState('Verifying payment...');

    const reference = searchParams.get('reference');
    const email = searchParams.get('email');
    const amount = searchParams.get('amount');
    const meetingDetails = {
        month: searchParams.get('month'),
        day: searchParams.get('day'),
        time: searchParams.get('time'),
        timezone: searchParams.get('timezone'),
    };

    useEffect(() => {
        if (!reference || !email || !amount) {
            toast({ title: "Error", description: "Invalid payment callback URL.", variant: "destructive" });
            router.push('/');
            return;
        }

        const interval = setInterval(async () => {
            try {
                const response = await fetch(`/api/paystack/verify?reference=${reference}`);
                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    clearInterval(interval);
                    toast({ title: "Payment Successful", description: "Thank you for your donation!" });

                    const validMeetingDetails = Object.fromEntries(Object.entries(meetingDetails).filter(([_, v]) => v != null));
                    sendConfirmationEmails(email, amount, reference, validMeetingDetails);

                    const queryParams = new URLSearchParams({
                        email, amount, reference, ...validMeetingDetails
                    }).toString();
                    router.push(`/thank-you?${queryParams}`);

                } else if (response.ok && (data.status === 'failed' || data.status === 'abandoned')) {
                    clearInterval(interval);
                    toast({ title: "Payment Failed", description: data.gateway_response || 'Your payment could not be completed.', variant: "destructive" });
                    router.push('/buy-us-coffee');
                } else {
                    setStatus(`Current status: ${data.status || 'pending'}. Please wait...`);
                }

            } catch (error) {
                console.error("Verification failed:", error);
                setStatus('Could not verify payment. Retrying...');
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [reference, email, amount, router, toast, meetingDetails]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#2255e0]" />
            <h1 className="text-2xl font-bold mb-2">Processing Your Payment</h1>
            <p className="text-gray-600">{status}</p>
            <p className="text-gray-600">Please do not close this window.</p>
        </div>
    );
}

export default function PaymentCallbackClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <PaymentCallbackClientContent />
    </Suspense>
  )
}

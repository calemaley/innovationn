import { Suspense } from 'react';
import PaymentCallbackClient from './PaymentCallbackClient';

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-2xl font-bold mb-2">Loading...</h1>
    </div>}>
      <PaymentCallbackClient />
    </Suspense>
  );
}

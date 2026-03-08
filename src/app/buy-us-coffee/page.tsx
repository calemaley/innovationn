import { Suspense } from 'react';
import BuyUsCoffeeClient from './BuyUsCoffeeClient';

export default function BuyUsCoffeePage() {
  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-2xl font-bold mb-2">Loading...</h1>
    </div>}>
      <BuyUsCoffeeClient />
    </Suspense>
  );
}

import { Suspense } from 'react';
import PayWithCardClient from './PayWithCardClient';

export default function PayWithCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayWithCardClient />
    </Suspense>
  );
}

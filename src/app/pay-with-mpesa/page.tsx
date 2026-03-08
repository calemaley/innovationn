import { Suspense } from 'react';
import PayWithMpesaClient from './PayWithMpesaClient';

export default function PayWithMpesaPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PayWithMpesaClient />
        </Suspense>
    );
}

import { Suspense } from 'react';
import MailRedirectClient from './MailRedirectClient';

export default function MailRedirectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MailRedirectClient />
    </Suspense>
  );
}

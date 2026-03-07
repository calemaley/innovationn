"use client"

import Link from 'next/link';
import { Send } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Only show the footer content on the homepage
  if (pathname !== '/') {
    return <footer className="px-6 md:px-[60px] py-9 pb-12" />;
  }

  return (
    <footer className="px-6 md:px-[60px] py-8 md:py-12 border-t border-border flex items-center gap-2.5 opacity-0 animate-fade-up [animation-delay:0.6s] [animation-fill-mode:forwards]">
      <Link href="mailto:hello@innovationz.com" className="text-[0.85rem] md:text-[0.9rem] text-foreground hover:underline transition-opacity hover:opacity-70">
        Get in touch
      </Link>
      <Send className="w-4 h-4 text-foreground" />
    </footer>
  );
}

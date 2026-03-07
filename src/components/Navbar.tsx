
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/partners', label: 'Our Partners' },
  { href: '/marketplace', label: 'Our Marketplace' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center px-6 md:px-[60px] py-7 bg-background">
      <Link href="/" className="font-headline text-2xl tracking-tight text-foreground">
        InnovationZ
      </Link>
      <ul className="flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "text-[0.9rem] font-normal transition-colors hover:text-primary relative whitespace-nowrap",
                pathname === link.href ? "text-foreground after:content-[''] after:block after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:absolute after:-right-2.5 after:top-1/2 after:-translate-y-1/2" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

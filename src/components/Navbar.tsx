"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/partners', label: 'Our Partners' },
  { href: '/marketplace', label: 'Our Marketplace' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center px-6 md:px-[60px] py-6 md:py-8 bg-background border-b border-border">
        <Link href="/" className="font-headline text-xl md:text-2xl tracking-tight text-foreground">
          InnovationZ
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 lg:gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-[0.85rem] lg:text-[0.9rem] font-normal transition-colors hover:text-primary relative",
                  pathname === link.href ? "text-foreground after:content-[''] after:block after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:absolute after:-right-3 after:top-1/2 after:-translate-y-1/2" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

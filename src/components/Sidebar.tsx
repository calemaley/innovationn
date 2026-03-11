'use client'

import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/partners', label: 'Our Partners' },
  { href: '/marketplace', label: 'Our Marketplace' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:hidden bg-white"
      )}
    >
      <div className="flex flex-col h-full">
        <div>
            <div className="flex justify-between items-center p-6">
                <Link href="/" className="font-headline text-xl tracking-tight text-foreground">
                InnovationZ
                </Link>
                <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Close menu">
                <X className="w-6 h-6 text-foreground" />
                </button>
            </div>
            <ul className="flex flex-col gap-6 p-6 list-none">
                {navLinks.map((link) => (
                <li key={link.href}>
                    <Link href={link.href} className="text-lg font-medium text-foreground hover:text-primary transition-colors" onClick={onClose}>
                    {link.label}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
        <div className="mt-auto p-6">
             <Link href="mailto:hello@innovationz.com" className="bg-[#0059FF] text-white flex items-center justify-center w-full py-4 rounded-lg font-medium text-lg">
                Get in touch
            </Link>
        </div>
      </div>
    </div>
  );
}

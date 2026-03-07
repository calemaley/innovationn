"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ease-in-out',
          isOpen ? 'bg-black/30 opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 h-full w-72 bg-background border-r border-border z-40 shadow-lg transform transition-all duration-300 ease-in-out lg:hidden flex flex-col',
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        )}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-7 border-b border-border bg-background">
          <span className="font-headline text-xl tracking-tight text-foreground">
            InnovationZ
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200 active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'block px-5 py-3.5 rounded-lg text-[0.95rem] font-normal transition-all duration-200',
                    'hover:translate-x-1',
                    pathname === link.href
                      ? 'bg-primary/12 text-primary font-medium shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  )}
                  style={{
                    animationDelay: isOpen ? `${index * 30}ms` : '0ms',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="px-4 py-2">
          <div className="h-px bg-border/40" />
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-6 border-t border-border">
          <Link
            href="mailto:hello@innovationz.com"
            onClick={onClose}
            className="block w-full text-center px-5 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all duration-200 active:scale-95 text-[0.95rem] shadow-sm hover:shadow-md"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}

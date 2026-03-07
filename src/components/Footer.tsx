import Link from 'next/link';
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 md:px-[60px] py-9 pb-12 flex items-center gap-2.5 opacity-0 animate-fade-up [animation-delay:0.6s] [animation-fill-mode:forwards]">
      <Link href="mailto:hello@innovationz.com" className="text-[0.9rem] text-foreground hover:underline">
        Get in touch
      </Link>
      <Send className="w-4 h-4 text-foreground" />
    </footer>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-virtual-conference');

  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 px-6 md:px-[60px] py-10 md:py-16 items-start">
        <div className="flex flex-col gap-10 md:gap-14 pt-0 md:pt-4">
          <p className="text-[0.95rem] md:text-[1.05rem] leading-relaxed font-light opacity-0 animate-fade-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            At InnovationZ we believe in all things innovation and the communities powering them.
          </p>
          <p className="text-[0.95rem] md:text-[1.05rem] leading-relaxed font-light opacity-0 animate-fade-up [animation-delay:0.25s] [animation-fill-mode:forwards]">
            We bring professionals with strong domain expertise to share insights that will help innovators build and bring far more resilient products to the market.
          </p>
          <p className="text-[0.95rem] md:text-[1.05rem] leading-relaxed font-light opacity-0 animate-fade-up [animation-delay:0.4s] [animation-fill-mode:forwards]">
            Together we will bridge the gap between ideas and reality, innovators and industry, potential and opportunity.
          </p>
        </div>
        <div className="relative w-full aspect-[3/2] md:aspect-[4/3] opacity-0 animate-fade-in [animation-delay:0.15s] [animation-fill-mode:forwards]">
          <Image
            src={heroImage?.imageUrl || "https://i.ibb.co/jPYVg55M/mage-1.jpg"}
            alt={heroImage?.description || "InnovationZ Hero"}
            fill
            className="object-cover rounded"
            priority
            data-ai-hint="modern innovation"
          />
        </div>
      </section>

      <div className="px-6 md:px-[60px] py-10 md:py-16 flex flex-wrap items-center gap-2 md:gap-3 text-[0.85rem] md:text-[0.92rem] opacity-0 animate-fade-up [animation-delay:0.5s] [animation-fill-mode:forwards]">
        <span>If you desire to make an impact and speak to a national audience of innovators,</span>
        <Link href="/speaker-opportunity" className="text-primary font-medium hover:underline flex items-center gap-1 transition-opacity hover:opacity-80">
          click to get started
          <span className="flex items-center justify-center w-6 h-6 rounded-full border-[1.5px] border-primary text-primary text-[0.75rem] md:text-[0.85rem]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </div>
  );
}

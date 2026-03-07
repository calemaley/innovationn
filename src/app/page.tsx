import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-virtual-conference');

  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-0 px-6 md:px-[60px] pt-12 items-start">
        <div className="flex flex-col gap-14 pt-2">
          <p className="text-[1.05rem] leading-relaxed font-light max-w-[220px] opacity-0 animate-fade-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            At InnovateHub we believe in all things innovation and the communities powering them.
          </p>
          <p className="text-[1.05rem] leading-relaxed font-light max-w-[220px] opacity-0 animate-fade-up [animation-delay:0.25s] [animation-fill-mode:forwards]">
            We bring professionals with strong domain expertise to share insights that will help innovators build and bring far more resilient products to the market.
          </p>
          <p className="text-[1.05rem] leading-relaxed font-light max-w-[220px] opacity-0 animate-fade-up [animation-delay:0.4s] [animation-fill-mode:forwards]">
            Together we will bridge the gap between ideas and reality, innovators and industry, potential and opportunity.
          </p>
        </div>
        <div className="relative h-[350px] md:h-[520px] w-full opacity-0 animate-fade-in [animation-delay:0.15s] [animation-fill-mode:forwards]">
          <Image
            src={heroImage?.imageUrl || "https://picsum.photos/seed/innovate1/1200/800"}
            alt={heroImage?.description || "Innovation Community"}
            fill
            className="object-cover rounded-[2px]"
            priority
            data-ai-hint="virtual conference"
          />
        </div>
      </section>

      <div className="px-6 md:px-[60px] pt-7 flex flex-wrap items-center gap-1.5 text-[0.92rem] opacity-0 animate-fade-up [animation-delay:0.5s] [animation-fill-mode:forwards]">
        <span>If you desire to make an impact and speak to a national audience of innovators,</span>
        <Link href="/speaker-opportunity" className="text-primary font-medium hover:underline flex items-center gap-1">
          click to get started
          <span className="flex items-center justify-center w-6 h-6 rounded-full border-[1.5px] border-primary text-primary text-[0.85rem] ml-1">
            <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>

      <section className="px-6 md:px-[60px] py-20 mt-12 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-headline text-4xl text-foreground">Discover Your Potential</h2>
          <p className="text-lg text-muted-foreground">
            We provide the tools, the network, and the AI-driven insights to push your projects further. 
            Whether you're looking for a partner, a topic for your next big talk, or a marketplace to showcase your vision, InnovateHub is here.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/topic-suggester" className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-all">
              AI Topic Suggester
            </Link>
            <Link href="/events" className="bg-accent text-foreground px-8 py-3 rounded-md hover:bg-accent/90 transition-all font-medium">
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

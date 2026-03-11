'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16L16 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M21 1.00012L10 12.0001" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 1.00003L14 21L10 12L1 8.00003L21 1.00003Z" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-virtual-conference');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white text-black font-inter">
        <main className="container mx-auto px-6 py-8 md:py-12">
            <h1 className="text-center text-2xl md:text-4xl font-light mb-8 mx-auto md:w-full w-[310px]">
                From insightful webinars to nationwide case studies
            </h1>

            {/* Large Screen */}
            <div className="hidden lg:flex flex-row items-center justify-center gap-12">
                <div className="relative w-[968px] h-[590px]">
                    <Image
                        src={heroImage?.imageUrl || "https://i.ibb.co/jPYVg55M/mage-1.jpg"}
                        alt={heroImage?.description || "InnovationZ Hero"}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="w-[397px] flex flex-col gap-8">
                    <p className="text-2xl italic">
                        Globally innovators struggle with challenges that domain knowledge can alleviate. We want to help innovators build with confidence once again starting with Kenya.
                    </p>
                    <p className="text-2xl italic">
                        Become a part of our global community of domain experts now and share your industry insights to  our community of innovators and help them bring more resilient products to the market.
                    </p>
                    <Link href="/speaker-opportunity" className="w-[358.089px] h-[100px] bg-blue-primary rounded-[5px] flex items-center justify-center text-white text-2xl font-medium gap-4">
                        Click to get started
                        <ArrowIcon />
                    </Link>
                    <Link href="mailto:hello@innovationz.com" className="flex items-center gap-2 text-[#222] text-2xl font-light">
                        Get in touch
                        <SendIcon />
                    </Link>
                </div>
            </div>

            {/* Small Screen */}
            <div className="lg:hidden flex flex-col items-center gap-6">
                <div className="relative w-[315px] h-[360px] mx-auto">
                    <Image
                        src={heroImage?.imageUrl || "https://i.ibb.co/jPYVg55M/mage-1.jpg"}
                        alt={heroImage?.description || "InnovationZ Hero"}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="w-[315px] text-xl italic cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? (
                        <>
                           <p>
                                Globally innovators struggle with challenges that domain knowledge can alleviate. We want to help innovators build with confidence once again starting with Kenya.
                           </p>
                           <p className="mt-2">
                                Become a part of our global community of domain experts now and share your industry insights to our community of innovators and help them bring more resilient products to the market.
                           </p>
                        </>
                    ) : (
                        <p>
                            Become a part of our global community of domain experts now and share your industry insights to our community of innovators and help them bring more resilient products to the market...
                        </p>
                    )}
                </div>
                <Link href="/speaker-opportunity" className="w-[315px] h-[64px] bg-blue-primary rounded-[2px] flex items-center justify-between px-6 text-white text-xl font-normal">
                    Get started
                    <ArrowIcon />
                </Link>
            </div>
        </main>
    </div>
  );
}

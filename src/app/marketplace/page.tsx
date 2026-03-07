import { ShoppingBag } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="px-6 md:px-[60px] py-8 md:py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="bg-white p-4 md:p-6 rounded-full shadow-sm mb-6 md:mb-8">
        <ShoppingBag className="w-8 md:w-12 h-8 md:h-12 text-primary" />
      </div>
      <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4">Our Marketplace</h1>
      <p className="text-muted-foreground text-[0.9rem] md:text-base lg:text-lg max-w-xl leading-relaxed">
        The InnovationZ Marketplace is launching soon! A dedicated space for members to share, sell, and license their groundbreaking solutions, tools, and services.
      </p>
      <div className="mt-6 md:mt-8">
        <button className="border-2 border-primary text-primary px-6 md:px-8 py-2 md:py-2.5 text-[0.85rem] md:text-base rounded-md font-medium hover:bg-primary hover:text-white transition-all">
          Get Notified on Launch
        </button>
      </div>
    </div>
  );
}

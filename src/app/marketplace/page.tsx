import { ShoppingBag } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="px-6 md:px-[60px] py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="bg-white p-6 rounded-full shadow-sm mb-8">
        <ShoppingBag className="w-12 h-12 text-primary" />
      </div>
      <h1 className="font-headline text-4xl text-foreground mb-4">Our Marketplace</h1>
      <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
        The InnovateHub Marketplace is launching soon! A dedicated space for members to share, sell, and license their groundbreaking solutions, tools, and services.
      </p>
      <div className="mt-8">
        <button className="border-2 border-primary text-primary px-8 py-2 rounded-md font-medium hover:bg-primary hover:text-white transition-all">
          Get Notified on Launch
        </button>
      </div>
    </div>
  );
}

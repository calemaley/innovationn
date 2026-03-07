import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const partners = [
  { name: "TechNova", industry: "Cloud Computing", description: "Revolutionizing data centers with modular architecture.", logoId: "partner-1" },
  { name: "EcoStream", industry: "Clean Energy", description: "Providing scalable solar solutions for urban landscapes.", logoId: "partner-2" },
  { name: "BioGenix", industry: "Health Tech", description: "AI-powered diagnostics for early-stage detection.", logoId: "partner-3" },
  { name: "SynthWave", industry: "Media & Arts", description: "The platform for collaborative procedural art.", logoId: "partner-4" },
];

export default function PartnersPage() {
  return (
    <div className="px-6 md:px-[60px] py-12">
      <div className="max-w-4xl mb-16 text-center mx-auto">
        <h1 className="font-headline text-4xl text-foreground mb-4">Our Partners</h1>
        <p className="text-muted-foreground text-lg">
          Collaboration is at the heart of innovation. We work with industry leaders and visionary startups to create a comprehensive ecosystem for our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {partners.map((partner) => {
          const logo = PlaceHolderImages.find(img => img.id === partner.logoId);
          return (
            <Card key={partner.name} className="flex flex-col h-full border-none shadow-none bg-transparent">
              <div className="relative aspect-video w-full mb-6 bg-white rounded-lg p-8 flex items-center justify-center border hover:shadow-md transition-shadow">
                <Image
                  src={logo?.imageUrl || "https://picsum.photos/seed/p1/200/100"}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="object-contain"
                  data-ai-hint="company logo"
                />
              </div>
              <CardContent className="p-0 text-center space-y-2">
                <h3 className="font-bold text-xl">{partner.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">{partner.industry}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-24 p-12 rounded-lg bg-primary text-white text-center space-y-6">
        <h2 className="font-headline text-3xl">Become a Partner</h2>
        <p className="max-w-xl mx-auto opacity-90">
          Want to reach our global audience of innovators and thought leaders? Let's discuss how we can grow together.
        </p>
        <button className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-secondary transition-all">
          Inquire Now
        </button>
      </div>
    </div>
  );
}

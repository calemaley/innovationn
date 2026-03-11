import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function PartnersPage() {
  const partners = PlaceHolderImages.filter(p => p.id.includes('partner'));
  
  // The new design has a 6x3 grid. We'll create an array of 18 cells.
  const totalCells = 18;
  const partnerCells = partners.slice(0, 4); // Based on the 4 logos in the HTML example

  return (
    <main className="flex-1 px-6 md:px-12 py-8">
      <div className="grid grid-cols-6 border-t border-l border-gray-200">
        {[...Array(totalCells)].map((_, index) => {
          const partner = index < partnerCells.length ? partnerCells[index] : null;
          return (
            <div 
              key={partner ? partner.id : `empty-${index}`} 
              className="partner-cell border-r border-b border-gray-200 flex items-center justify-center p-8 min-h-[180px] transition-colors hover:bg-gray-50"
            >
              {partner && partner.imageUrl && (
                <Image
                  src={partner.imageUrl}
                  alt={partner.description}
                  width={120}
                  height={100}
                  className="object-contain max-w-[120px] max-h-[100px]"
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

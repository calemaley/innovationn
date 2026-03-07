import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PartnersPage() {
  const partnerLogos = [
    PlaceHolderImages.find(img => img.id === "partner-images3"),
    PlaceHolderImages.find(img => img.id === "partner-kdk"),
    PlaceHolderImages.find(img => img.id === "partner-zetech"),
    PlaceHolderImages.find(img => img.id === "partner-images5"),
  ];

  // The grid has 18 cells (3 rows of 6)
  const totalCells = 18;
  const gridCells = Array(totalCells).fill(null);
  
  // Place the logos in the first few cells
  partnerLogos.forEach((logo, index) => {
    gridCells[index] = logo || null;
  });

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <main className="flex-1 px-6 md:px-12 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#e2e1dd]">
          {gridCells.map((logo, index) => (
            <div 
              key={logo?.id || `empty-${index}`} 
              className={`flex items-center justify-center p-8 min-h-[180px] border-r border-b border-[#e2e1dd] transition-colors duration-200 ${logo ? 'hover:bg-[#f5f4f0] group' : 'bg-white'}`}
            >
              {logo && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    width={120}
                    height={100}
                    className="object-contain max-w-[120px] max-h-[100px] transition-all duration-300"
                    priority={index < 6}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PartnersPage() {
  const partnerLogos = [
    PlaceHolderImages.find(img => img.id === "partner-images5"),
    PlaceHolderImages.find(img => img.id === "partner-zetech"),
    PlaceHolderImages.find(img => img.id === "partner-images3"),
    PlaceHolderImages.find(img => img.id === "partner-kdk"),
  ];

  // The grid has 18 cells (3 rows of 6) as per the design requirement
  const totalCells = 18;
  const gridCells = Array(totalCells).fill(null);
  
  // Place the logos in the first few cells
  partnerLogos.forEach((logo, index) => {
    if (logo) gridCells[index] = logo;
  });

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <main className="flex-1 px-4 md:px-8 lg:px-12 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#e2e1dd]">
          {gridCells.map((logo, index) => (
            <div
              key={logo?.id || `empty-${index}`}
              className={`flex items-center justify-center p-4 md:p-6 lg:p-8 min-h-[100px] sm:min-h-[120px] lg:min-h-[180px] border-r border-b border-[#e2e1dd] transition-colors duration-200 ${logo ? 'hover:bg-[#f5f4f0]' : 'bg-white'}`}
            >
              {logo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    width={120}
                    height={100}
                    className="object-contain max-w-[80px] sm:max-w-[100px] lg:max-w-[120px] max-h-[80px] sm:max-h-[100px] lg:max-h-[100px]"
                    priority={index < 6}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

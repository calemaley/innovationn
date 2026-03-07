import Image from 'next/image';

export default function PartnersPage() {
  const partnerLogos = [
    { id: "partner-1", imageUrl: "https://i.ibb.co/fVWG7j7R/images-5-1.png", description: "Partner 1" },
    { id: "partner-2", imageUrl: "https://i.ibb.co/XkdnkTdD/Zetech-University-Logo-Vert-w-tag-RGB-1-3-1.png", description: "Zetech University" },
    { id: "partner-3", imageUrl: "https://i.ibb.co/v66sxnvZ/images-3-1.png", description: "Partner 3" },
    { id: "partner-4", imageUrl: "https://i.ibb.co/kgK9HGg4/KDK-logo-1.png", description: "KDK" },
  ];

  // The grid has 18 cells (3 rows of 6) as per the design requirement
  const totalCells = 18;
  const gridCells = Array(totalCells).fill(null);

  // Place the logos in the first few cells
  partnerLogos.forEach((logo, index) => {
    gridCells[index] = logo;
  });

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <main className="flex-1 px-4 md:px-8 lg:px-12 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#e2e1dd]">
          {gridCells.map((logo, index) => (
            <div
              key={logo?.id || `empty-${index}`}
              className={`flex items-center justify-center p-4 md:p-6 lg:p-8 min-h-[100px] sm:min-h-[120px] lg:min-h-[180px] border-r border-b border-[#e2e1dd] transition-colors duration-200 ${logo && logo.imageUrl ? 'hover:bg-[#f5f4f0]' : 'bg-white'}`}
            >
              {logo && logo.imageUrl ? (
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

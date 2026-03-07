export default function CaseStudiesPage() {
  return (
    <div className="px-6 md:px-[60px] py-8 md:py-12 min-h-[60vh] flex flex-col justify-center">
      <div className="max-w-2xl">
        <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 md:mb-6">Case Studies</h1>
        <p className="text-muted-foreground text-[0.9rem] md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8">
          Explore in-depth analyses of successful innovation projects powered by our community. We are currently curating our latest batch of success stories. Check back soon for detailed insights into market disruption and technical excellence.
        </p>
        <div className="w-20 md:w-24 h-1 bg-accent rounded-full"></div>
      </div>
    </div>
  );
}

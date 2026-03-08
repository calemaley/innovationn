
export default function EventsPage() {
  return (
    <div className="px-6 md:px-[60px] py-8 md:py-12">
      <div className="max-w-4xl mb-8 md:mb-12">
        <h1 className="font-headline text-2xl md:text-3xl lg:text-4xl text-foreground mb-3 md:mb-4">Upcoming Events</h1>
        <p className="text-muted-foreground text-[0.9rem] md:text-base lg:text-lg leading-relaxed">
          Join our vibrant community at these curated events. From massive international summits to intimate local workshops, discover your next opportunity to learn and network.
        </p>
      </div>

      <div className="flex justify-center">
        <iframe
          src="https://luma.com/embed/calendar/cal-D2e3OVwMK0D0Mcj/events"
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        ></iframe>
      </div>
    </div>
  );
}

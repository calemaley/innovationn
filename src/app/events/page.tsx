import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "InnovateSummit 2024",
    date: "October 12-14, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco, CA / Virtual",
    tag: "Conference",
    description: "Our flagship event bringing together 5,000+ innovators, venture capitalists, and industry leaders."
  },
  {
    id: 2,
    title: "GreenTech Workshop",
    date: "November 05, 2024",
    time: "1:00 PM - 4:00 PM",
    location: "New York, NY",
    tag: "Workshop",
    description: "Focusing on sustainable engineering and the next generation of eco-friendly materials."
  },
  {
    id: 3,
    title: "FinTech Mixer",
    date: "December 01, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "London, UK / Virtual",
    tag: "Networking",
    description: "Connect with the minds behind the latest digital banking revolutions in an informal setting."
  },
  {
    id: 4,
    title: "AI Ethics Symposium",
    date: "January 15, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Berlin, DE",
    tag: "Symposium",
    description: "Deep dive into the societal impacts of generative AI and the future of creative industries."
  }
];

export default function EventsPage() {
  return (
    <div className="px-6 md:px-[60px] py-12">
      <div className="max-w-4xl mb-12">
        <h1 className="font-headline text-4xl text-foreground mb-4">Upcoming Events</h1>
        <p className="text-muted-foreground text-lg">
          Join our vibrant community at these curated events. From massive international summits to intimate local workshops, discover your next opportunity to learn and network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden group hover:border-primary/50 transition-all duration-300">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="bg-accent/20 text-primary-foreground border-none">
                  {event.tag}
                </Badge>
              </div>
              <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t pt-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary opacity-60">Registration Opening Soon</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

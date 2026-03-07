"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "InnovateSummit 2024",
    date: "October 12-14, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco, CA / Virtual",
    tag: "Conference",
    tagBg: "bg-blue-500",
    description: "Our flagship event bringing together 5,000+ innovators, venture capitalists, and industry leaders."
  },
  {
    id: 2,
    title: "GreenTech Workshop",
    date: "November 05, 2024",
    time: "1:00 PM - 4:00 PM",
    location: "New York, NY",
    tag: "Workshop",
    tagBg: "bg-emerald-500",
    description: "Focusing on sustainable engineering and the next generation of eco-friendly materials."
  },
  {
    id: 3,
    title: "FinTech Mixer",
    date: "December 01, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "London, UK / Virtual",
    tag: "Networking",
    tagBg: "bg-purple-500",
    description: "Connect with the minds behind the latest digital banking revolutions in an informal setting."
  },
  {
    id: 4,
    title: "AI Ethics Symposium",
    date: "January 15, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Berlin, DE",
    tag: "Symposium",
    tagBg: "bg-rose-500",
    description: "Deep dive into the societal impacts of generative AI and the future of creative industries."
  }
];

export default function EventsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="max-w-5xl">
          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 md:mb-4 font-bold">
            Upcoming Events
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Join our vibrant community at these curated events. Discover your next opportunity to learn, network, and grow.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="group relative h-full rounded-xl p-6 md:p-7 border border-slate-200 bg-white overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-slate-300 flex flex-col">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                
                <div className="relative flex-1 flex flex-col">
                  {/* Tag */}
                  <div className="mb-4">
                    <Badge className={`${event.tagBg} text-white hover:opacity-90 text-xs px-3 py-1 font-semibold`}>
                      {event.tag}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground font-medium">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground font-medium">{event.time}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground font-medium">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer - CTA */}
                <button className="flex items-center justify-between w-full pt-4 border-t border-slate-200 text-primary font-semibold text-sm group-hover:text-primary transition-colors duration-300">
                  <span>Learn More</span>
                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hoveredId === event.id ? 'translate-x-1' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

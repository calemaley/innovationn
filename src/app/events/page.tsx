"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "InnovateSummit 2024",
    date: "October 12-14, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco, CA / Virtual",
    tag: "Conference",
    color: "bg-blue-500/10 border-blue-500/20",
    tagBg: "bg-blue-500",
    description: "Our flagship event bringing together 5,000+ innovators, venture capitalists, and industry leaders.",
    featured: true
  },
  {
    id: 2,
    title: "GreenTech Workshop",
    date: "November 05, 2024",
    time: "1:00 PM - 4:00 PM",
    location: "New York, NY",
    tag: "Workshop",
    color: "bg-emerald-500/10 border-emerald-500/20",
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
    color: "bg-purple-500/10 border-purple-500/20",
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
    color: "bg-rose-500/10 border-rose-500/20",
    tagBg: "bg-rose-500",
    description: "Deep dive into the societal impacts of generative AI and the future of creative industries."
  }
];

export default function EventsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const featuredEvent = events.find(e => e.featured);
  const upcomingEvents = events.filter(e => !e.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white">
      {/* Hero Section */}
      <div className="px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Upcoming Events</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-foreground mb-4 md:mb-6 font-bold leading-tight">
            Join Our Community
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover curated events that bring together innovators, leaders, and visionaries. From intimate workshops to massive summits, find your next opportunity to learn, grow, and network.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        {/* Featured Event */}
        {featuredEvent && (
          <div className="mb-16 md:mb-24 animate-fade-up [animation-delay:0.2s]">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Featured Event</p>
            
            <div className={`group relative rounded-2xl p-8 md:p-10 lg:p-12 border-2 ${featuredEvent.color} bg-gradient-to-br from-blue-50/50 to-white overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:shadow-2xl`}>
              {/* Gradient Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8 mb-8 md:mb-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={`${featuredEvent.tagBg} text-white hover:opacity-90 text-sm px-4 py-1.5 font-semibold`}>
                        {featuredEvent.tag}
                      </Badge>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Featured</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {featuredEvent.title}
                    </h2>
                    
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {featuredEvent.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-10">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white/80 transition-all duration-300">
                    <CalendarDays className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                      <p className="text-sm md:text-base font-semibold text-foreground">{featuredEvent.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white/80 transition-all duration-300">
                    <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Time</p>
                      <p className="text-sm md:text-base font-semibold text-foreground">{featuredEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white/80 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm md:text-base font-semibold text-foreground">{featuredEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="group/btn flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 active:scale-95">
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-slate-200 text-foreground font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Events Grid */}
        <div>
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 md:mb-8">Other Events</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`group relative h-full rounded-xl p-6 md:p-7 border-2 ${event.color} bg-white overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-opacity-50 cursor-pointer flex flex-col`}>
                  {/* Subtle Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  <div className="relative flex-1 flex flex-col">
                    {/* Tag and Header */}
                    <div className="mb-4">
                      <Badge className={`${event.tagBg} text-white hover:opacity-90 text-xs px-3 py-1 font-semibold`}>
                        {event.tag}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-3">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-3 text-sm">
                        <CalendarDays className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-muted-foreground font-medium">{event.date}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-muted-foreground font-medium">{event.time}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-muted-foreground font-medium">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer - CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                      {hoveredId === event.id ? "Click to Register" : "Register Soon"}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${hoveredId === event.id ? 'bg-primary scale-110' : ''}`}>
                      <ArrowRight className={`w-4 h-4 transition-all duration-300 ${hoveredId === event.id ? 'text-white translate-x-1' : 'text-primary'}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 animate-fade-up [animation-delay:0.8s]">
          <h3 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-3">
            Can't find your event?
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Subscribe to our newsletter to get notified about new events and exclusive opportunities.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 active:scale-95">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}

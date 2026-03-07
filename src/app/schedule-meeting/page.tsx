"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const timezones = ["EAT", "UTC", "GMT", "EST", "PST", "CET"];

export default function ScheduleMeetingPage() {
  const { toast } = useToast();
  const [days, setDays] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedDay, setSelectedDay] = useState("09");
  const [selectedTimezone, setSelectedTimezone] = useState("EAT");

  const meetingImage = PlaceHolderImages.find(img => img.id === "meeting-hero");

  useEffect(() => {
    const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);
    setDays(daysArray);
  }, []);

  const handleSchedule = () => {
    toast({
      title: "Meeting Scheduled",
      description: `Confirmed for ${selectedMonth} ${selectedDay} at 16:00 ${selectedTimezone}.`,
    });
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-16 pt-0 animate-fade-in">
      {/* Image Container */}
      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-3 opacity-0 animate-fade-in [animation-delay:0.1s] [animation-fill-mode:forwards]">
        <div className="relative h-[350px] md:h-[510px] w-full">
          <Image
            src={meetingImage?.imageUrl || "https://i.ibb.co/6cGDPDrR/mage-3.jpg"}
            alt="Schedule Meeting"
            fill
            className="object-cover"
            priority
            data-ai-hint="meeting schedule"
          />
        </div>
      </div>

      {/* Controls Row */}
      <div className="w-full max-w-[920px] flex flex-col lg:flex-row items-stretch gap-2 opacity-0 animate-fade-up [animation-delay:0.35s] [animation-fill-mode:forwards]">
        
        {/* Month Select */}
        <div className="relative flex-1 lg:flex-none">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full lg:min-w-[140px] appearance-none bg-[#eeede9] border-none py-[18px] pl-6 pr-11 text-[0.95rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body"
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
        </div>

        {/* Day Select */}
        <div className="relative flex-1 lg:flex-none">
          <select 
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full lg:min-w-[110px] appearance-none bg-[#eeede9] border-none py-[18px] pl-6 pr-11 text-[0.95rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body"
          >
            {days.map(d => (
              <option key={d} value={String(d).padStart(2, '0')}>
                {String(d).padStart(2, '0')}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
        </div>

        {/* Timezone Select */}
        <div className="relative flex-1 lg:flex-none">
          <select 
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="w-full lg:min-w-[110px] appearance-none bg-[#eeede9] border-none py-[18px] pl-6 pr-11 text-[0.95rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body"
          >
            {timezones.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
        </div>

        {/* Time Display */}
        <div className="flex-1 bg-[#eeede9] flex items-center px-6 py-[18px] text-[0.95rem] text-[#111110] rounded-[2px] whitespace-nowrap">
          1600 hrs – 1700 hrs
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleSchedule}
          className="bg-[#2255e0] hover:bg-[#1a44c8] text-white py-[18px] px-8 text-[0.95rem] font-medium flex items-center justify-center lg:justify-start gap-3 rounded-[2px] transition-colors whitespace-nowrap"
        >
          Schedule the meeting
          <span className="flex items-center justify-center w-[26px] h-[26px] rounded-full border-[1.5px] border-white/60 text-[0.85rem]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>

      </div>
    </main>
  );
}
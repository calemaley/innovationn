'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const timezones = [
  'Etc/GMT+12', 'Etc/GMT+11', 'Pacific/Midway', 'Pacific/Honolulu', 'America/Anchorage',
  'America/Los_Angeles', 'America/Tijuana', 'America/Denver', 'America/Phoenix', 'America/Chihuahua',
  'America/Mazatlan', 'America/Chicago', 'America/Regina', 'America/Mexico_City', 'America/Guatemala',
  'America/New_York', 'America/Indiana/Indianapolis', 'America/Bogota', 'America/Lima', 'America/Caracas',
  'America/Halifax', 'America/La_Paz', 'America/Santiago', 'America/St_Johns', 'America/Sao_Paulo',
  'America/Argentina/Buenos_Aires', 'America/Godthab', 'Etc/GMT+2', 'Atlantic/Cape_Verde', 'Atlantic/Azores',
  'Europe/London', 'Africa/Casablanca', 'Europe/Dublin', 'Europe/Lisbon', 'Europe/Amsterdam',
  'Europe/Belgrade', 'Europe/Berlin', 'Europe/Bratislava', 'Europe/Brussels', 'Europe/Budapest',
  'Europe/Copenhagen', 'Europe/Ljubljana', 'Europe/Madrid', 'Europe/Paris', 'Europe/Prague',
  'Europe/Rome', 'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Stockholm', 'Europe/Vienna',
  'Europe/Warsaw', 'Europe/Zagreb', 'Africa/Algiers', 'Europe/Bucharest', 'Africa/Cairo',
  'Europe/Helsinki', 'Europe/Istanbul', 'Europe/Athens', 'Asia/Jerusalem', 'Africa/Harare',
  'Europe/Kiev', 'Europe/Minsk', 'Europe/Riga', 'Europe/Sofia', 'Europe/Tallinn',
  'Europe/Vilnius', 'Asia/Baghdad', 'Asia/Kuwait', 'Africa/Nairobi', 'Asia/Riyadh',
  'Europe/Moscow', 'Asia/Tehran', 'Asia/Baku', 'Asia/Dubai', 'Asia/Muscat',
  'Asia/Tbilisi', 'Asia/Yerevan', 'Asia/Kabul', 'Asia/Karachi', 'Asia/Tashkent',
  'Asia/Yekaterinburg', 'Asia/Kolkata', 'Asia/Colombo', 'Asia/Kathmandu', 'Asia/Almaty',
  'Asia/Dhaka', 'Asia/Novosibirsk', 'Asia/Rangoon', 'Asia/Bangkok', 'Asia/Jakarta',
  'Asia/Krasnoyarsk', 'Asia/Hong_Kong', 'Asia/Irkutsk', 'Asia/Kuala_Lumpur', 'Australia/Perth',
  'Asia/Singapore', 'Asia/Taipei', 'Asia/Ulaanbaatar', 'Asia/Seoul', 'Asia/Tokyo',
  'Australia/Adelaide', 'Australia/Darwin', 'Australia/Brisbane', 'Australia/Canberra', 'Australia/Melbourne',
  'Australia/Sydney', 'Pacific/Guam', 'Pacific/Port_Moresby', 'Asia/Yakutsk', 'Australia/Hobart',
  'Asia/Vladivostok', 'Pacific/Auckland', 'Pacific/Fiji', 'Etc/GMT-12', 'Pacific/Tongatapu'
];

export default function ScheduleMeetingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [days, setDays] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedDay, setSelectedDay] = useState('09');
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]);

  const meetingImage = PlaceHolderImages.find(img => img.id === 'meeting-hero');

  useEffect(() => {
    const daysArray = Array.from({ length: 31 }, (_, i) => i + 1);
    setDays(daysArray);
  }, []);

  const handleSchedule = () => {
    toast({
      title: 'Meeting Scheduled',
      description: `Confirmed for ${selectedMonth} ${selectedDay} at 16:00-17:00. Timezone: ${selectedTimezone.replace(/_/g, ' ')}`,
    });
    // Redirect to buy us coffee page after a short delay
    setTimeout(() => {
      router.push('/buy-us-coffee');
    }, 1500);
  };

  return (
    <main className="flex-1 flex flex-col items-center px-6 md:px-12 pb-8 md:pb-16 pt-0 animate-fade-in">
      {/* Image Container */}
      <div className="w-full max-w-[920px] rounded-[4px] overflow-hidden mb-3 opacity-0 animate-fade-in [animation-delay:0.1s] [animation-fill-mode:forwards]">
        <div className="relative w-full aspect-[16/9] md:aspect-[5/3]">
          <Image
            src={meetingImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'}
            alt="Schedule Meeting"
            fill
            className="object-cover"
            priority
            data-ai-hint="meeting schedule"
          />
        </div>
      </div>

      {/* Controls Container */}
      <div className="w-full max-w-[920px] opacity-0 animate-fade-up [animation-delay:0.35s] [animation-fill-mode:forwards]">
        {/* Controls Row */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 md:gap-3 mb-4 md:mb-0">

          {/* Month Select */}
          <div className="relative flex-1">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-11 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
            >
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
          </div>

          {/* Day Select */}
          <div className="relative flex-1">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-11 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
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
          <div className="relative flex-1">
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="w-full appearance-none bg-[#eeede9] border-none py-4 md:py-[18px] pl-6 pr-11 text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px] outline-none cursor-pointer font-body transition-colors focus:ring-2 focus:ring-primary/20"
            >
              {timezones.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[#111110]" />
          </div>

          {/* Time Display */}
          <div className="flex-1 bg-[#eeede9] flex items-center justify-center md:justify-start px-4 md:px-6 py-4 md:py-[18px] text-[0.95rem] md:text-[1.05rem] text-[#111110] rounded-[2px]">
            <span>16:00–17:00 hrs</span>
          </div>

          {/* CTA Button - Desktop */}
          <button
            onClick={handleSchedule}
            className="hidden md:flex bg-[#2255e0] hover:bg-[#1a44c8] text-white py-4 md:py-[18px] px-6 md:px-8 text-[0.95rem] md:text-[1.05rem] font-medium items-center justify-center gap-2 md:gap-3 rounded-[2px] transition-colors"
          >
            Schedule meeting
            <span className="flex items-center justify-center w-[24px] md:w-[26px] h-[24px] md:h-[26px] rounded-full border-[1.5px] border-white/60 text-[0.75rem] md:text-[0.85rem]">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* CTA Button - Mobile */}
        <button
          onClick={handleSchedule}
          className="md:hidden w-full bg-[#2255e0] hover:bg-[#1a44c8] text-white py-4 px-6 text-[0.95rem] font-medium flex items-center justify-center gap-2 rounded-[2px] transition-colors mt-4"
        >
          Schedule meeting
          <span className="flex items-center justify-center w-[24px] h-[24px] rounded-full border-[1.5px] border-white/60 text-[0.75rem]">
            <ArrowRight className="w-3 h-3" />
          </span>
        </button>
      </div>
    </main>
  );
}

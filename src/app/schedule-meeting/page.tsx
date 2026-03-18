'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useIsMobile } from '@/hooks/use-mobile';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const timezones = ['EAT', 'UTC', 'GMT', 'EST', 'PST', 'CET', 'IST'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function ScheduleMeetingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedDay, setSelectedDay] = useState('09');
  const [selectedTimezone, setSelectedTimezone] = useState('EAT');
  const [days, setDays] = useState<number[]>([]);

  const meetingImage = PlaceHolderImages.find(img => img.id === 'meeting-hero');

  useEffect(() => {
    const monthIndex = months.indexOf(selectedMonth);
    const numDays = daysInMonth[monthIndex];
    const newDays = Array.from({ length: numDays }, (_, i) => i + 1);
    setDays(newDays);

    if (parseInt(selectedDay, 10) > numDays) {
      setSelectedDay(String(numDays).padStart(2, '0'));
    }
  }, [selectedMonth, selectedDay]);

  const handleSchedule = () => {
    toast({
      title: 'Meeting Details Saved',
      description: `Confirmed for ${selectedMonth} ${selectedDay} at 2000-2100 hrs ${selectedTimezone}. Please proceed to payment.`,
    });

    const queryParams = new URLSearchParams({
      month: selectedMonth,
      day: selectedDay,
      time: '2000-2100',
      timezone: selectedTimezone,
    }).toString();
    router.push(`/buy-us-coffee?${queryParams}`);
  };
  
  if (isMobile === undefined) {
    return null; 
  }

  if (isMobile) {
      return (
          <>
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

              body {
                background: #e8e8e8 !important;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
              }

              .phone-wrap {
                width: 390px;
                background: #ffffff;
                border-radius: 48px;
                box-shadow: 0 30px 80px rgba(0,0,0,0.22);
                overflow: hidden;
                padding-bottom: 40px;
              }

              .top-pad { height: 50px; }

              .navbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 24px 0 24px;
                height: 44px;
              }

              .brand {
                font-size: 16px;
                font-weight: 400;
                color: #111;
                letter-spacing: -0.2px;
              }

              .menu-icon {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 14px;
                width: 22px;
                cursor: pointer;
              }
              .menu-icon span {
                display: block;
                height: 1.5px;
                background: #111;
                border-radius: 2px;
              }
              .menu-icon span:nth-child(2) { width: 75%; }

              .heading {
                padding: 22px 24px 18px;
                font-size: 22px;
                font-weight: 400;
                color: #111;
                letter-spacing: -0.4px;
                text-align: center;
              }

              .hero {
                margin: 0 20px;
                border-radius: 10px;
                overflow: hidden;
                height: 270px;
              }
              .hero img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center 20%;
                display: block;
              }

              .form {
                padding: 20px 20px 0;
                display: flex;
                flex-direction: column;
                gap: 10px;
              }

              .input-field {
                border: 1px solid #d8d8d8;
                border-radius: 8px;
                padding: 15px 16px;
                font-size: 15px;
                font-family: inherit;
                color: #aaa;
                font-weight: 400;
                background: #fff;
                width: 100%;
                outline: none;
                appearance: none;
              }

              .time-row {
                border: 1px solid #d8d8d8;
                border-radius: 8px;
                padding: 15px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .time-row span {
                font-size: 15px;
                color: #aaa;
                font-weight: 400;
              }

              .btn-schedule {
                background: #1a6fe8;
                color: #fff;
                border: none;
                border-radius: 10px;
                padding: 17px 20px;
                font-size: 17px;
                font-family: inherit;
                font-weight: 500;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                letter-spacing: -0.2px;
                margin-top: 4px;
              }

              .btn-schedule:active { opacity: 0.9; }

              .arrow-btn {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                border: 2px solid rgba(255,255,255,0.55);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              }

              .arrow-btn svg {
                width: 15px;
                height: 15px;
              }
            `}</style>
            <div className="phone-wrap">
                <div className="top-pad"></div>

                <nav className="navbar">
                    <span className="brand">InnovationZ</span>
                    <div className="menu-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </nav>

                <div className="heading">Schedule the meeting</div>

                <div className="hero">
                    <Image
                        src={meetingImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'}
                        alt="Schedule a meeting with InnovationZ"
                        width={350}
                        height={270}
                        priority
                    />
                </div>

                <div className="form">
                    <input className="input-field" type="text" placeholder="March" readOnly value={selectedMonth} />
                    <input className="input-field" type="text" placeholder="09" readOnly value={selectedDay} />
                    <div className="time-row">
                        <span>20:00 -21:00</span>
                        <span>{selectedTimezone}</span>
                    </div>
                    <button className="btn-schedule" onClick={handleSchedule}>
                    Schedule
                    <div className="arrow-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="M13 6l6 6-6 6"/>
                        </svg>
                    </div>
                    </button>
                </div>
            </div>
          </>
      )
  }

  return (
    <>
      <style jsx global>{`
        body {
          font-family: 'DM Sans', sans-serif !important;
          background: #ffffff !important;
          color: #111110 !important;
          -webkit-font-smoothing: antialiased;
        }
        .schedule-page-container nav {
          padding: 24px 48px;
        }
        .schedule-page-container .logo {
          font-size: 1rem;
          font-weight: 500;
          color: #111110;
          text-decoration: none;
        }
        .schedule-page-container .page {
          max-width: 940px;
          margin: 0 auto;
          padding: 0 48px 32px;
        }
        .schedule-page-container .hero-image {
          width: 100%;
          max-height: 520px;
          border-radius: 8px;
          overflow: hidden;
          background: #2d5f79;
          margin-bottom: 16px;
          animation: fadeUp 0.6s ease both;
        }
        .schedule-page-container .hero-image img {
          width: 100%;
          height: 100%;
          max-height: 520px;
          object-fit: cover;
          object-position: center 20%;
          display: block;
        }
        .schedule-page-container .controls {
          display: flex;
          align-items: stretch;
          gap: 12px;
          animation: fadeUp 0.6s 0.15s ease both;
        }
        .schedule-page-container .pill {
          background: #efefed;
          border-radius: 6px;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 20px;
          height: 60px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #111110;
          white-space: nowrap;
          transition: background 0.2s;
          position: relative;
        }
        .schedule-page-container .pill:hover { background: #e4e2df; }
        .schedule-page-container .pill select {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #111110;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          width: 100%;
          height: 100%;
          padding-right: 18px; /* Space for chevron */
        }
        .schedule-page-container .chevron {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          pointer-events: none;
        }
        .schedule-page-container .chevron path {
          fill: none;
          stroke: #111110;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .schedule-page-container .pill-time {
          flex: 1;
          justify-content: center;
        }
        .schedule-page-container .pill-time:hover { background: #efefed; cursor: default; }
        .schedule-page-container .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          background: #1a4fff;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          padding: 0 28px;
          height: 60px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .schedule-page-container .cta-btn:hover { background: #1040e8; transform: translateY(-1px); }
        .schedule-page-container .cta-btn:active { transform: translateY(0); }
        .schedule-page-container .cta-circle {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.45);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .schedule-page-container .cta-circle svg {
          width: 13px; height: 13px;
          fill: none; stroke: white;
          stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 700px) {
          .schedule-page-container nav { padding: 20px 24px; }
          .schedule-page-container .page { padding: 0 24px 24px; }
          .schedule-page-container .controls { flex-wrap: wrap; }
          .schedule-page-container .pill { flex-grow: 1; }
          .schedule-page-container .pill-time { flex-basis: 100%; justify-content: center; }
          .schedule-page-container .cta-btn { width: 100%; justify-content: center; }
        }
      `}</style>
      <div className="schedule-page-container">
        <nav>
          <Link href="/" className="logo">InnovationZ</Link>
        </nav>

        <main className="page">
          <div className="hero-image">
            <Image
              src={meetingImage?.imageUrl || 'https://i.ibb.co/6cGDPDrR/mage-3.jpg'}
              alt="Schedule a meeting with InnovationZ"
              width={940}
              height={520}
              priority
            />
          </div>

          <div className="controls">
            <label className="pill">
              <select id="monthSelect" aria-label="Month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <svg className="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </label>

            <label className="pill">
              <select id="daySelect" aria-label="Day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {days.map(d => (
                  <option key={d} value={String(d).padStart(2, '0')}>
                    {String(d).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <svg className="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </label>

            <label className="pill">
              <select id="tzSelect" aria-label="Timezone" value={selectedTimezone} onChange={(e) => setSelectedTimezone(e.target.value)}>
                {timezones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <svg className="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
            </label>

            <div className="pill pill-time">2000 hrs – 2100 hrs</div>

            <button className="cta-btn" onClick={handleSchedule}>
              Schedule the meeting
              <span className="cta-circle">
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

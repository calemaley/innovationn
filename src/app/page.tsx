'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState } from 'react';

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
);

const MobileArrowIcon = () => (
    <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default function Home() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-virtual-conference');
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

  return (
    <>
      <style jsx global>{`
        :root {
          --white: #ffffff;
          --black: #111110;
          --gray-light: #e8e6e2;
          --text-body: #3a3935;
          --blue: #1a4fff;
          --blue-hover: #1040e8;
          --sans: 'DM Sans', sans-serif;
          --serif: 'DM Serif Display', Georgia, serif;
        }

        html, body {
          font-family: var(--sans);
          background: var(--white);
          color: var(--black);
          -webkit-font-smoothing: antialiased;
        }

        @media (max-width: 900px) {
            .desktop-view { display: none; }
        }
        @media (min-width: 901px) {
            .mobile-view { display: none; }
            html, body {
                height: 100%;
                overflow: hidden;
            }
            .desktop-view {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
        }

        /* DESKTOP STYLES */
        .desktop-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 64px;
          border-bottom: 1px solid var(--gray-light);
          background: var(--white);
          width: 100%;
        }
        .desktop-logo {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--black);
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--black);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .nav-links a:hover { opacity: 0.6; }
        .nav-links .dot-indicator::after {
          content: '';
          position: absolute;
          top: -3px; right: -8px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--blue);
        }
        .desktop-hero {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 64px;
          width: 100%;
        }
        .hero-content-wrapper {
            max-width: 1280px;
            width: 100%;
        }
        .desktop-view .hero-heading {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 40px;
          text-align: center;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 56px;
          align-items: start;
        }
        .image-block {
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background: var(--gray-light);
          position: relative;
        }
        .image-block img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .image-block:hover img { transform: scale(1.02); }
        .side-copy {
          display: flex;
          flex-direction: column;
          padding-top: 8px;
        }
        .side-copy p {
          font-family: var(--serif);
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-body);
          margin-bottom: 28px;
        }
        .desktop-cta-btn {
          display: inline-flex; align-items: center; justify-content: space-between;
          background: var(--blue); color: var(--white);
          font-size: 1rem; font-weight: 500; padding: 20px 28px;
          border-radius: 6px; text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          margin-top: 4px; margin-bottom: 28px; width: 100%;
        }
        .desktop-cta-btn:hover { background: var(--blue-hover); transform: translateY(-1px); }
        .desktop-cta-btn:active { transform: translateY(0); }
        .cta-arrow { width: 32px; height: 32px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cta-arrow svg { width: 14px; height: 14px; }
        .get-in-touch { display: inline-flex; align-items: center; gap: 8px; font-size: 0.95rem; color: var(--black); text-decoration: none; font-weight: 400; transition: gap 0.2s; }
        .get-in-touch:hover { gap: 12px; }
        .get-in-touch svg { width: 16px; height: 16px; }

        /* MOBILE STYLES */
        .mobile-view .shell { max-width: 420px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; }
        .mobile-view nav { display: flex; justify-content: space-between; align-items: center; padding: 22px 24px; border-bottom: 1px solid var(--gray-light); flex-shrink: 0; }
        .mobile-view .logo { font-size: 1rem; font-weight: 500; color: var(--black); text-decoration: none; }
        .mobile-view .hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .mobile-view .hamburger span { display: block; width: 22px; height: 2px; background: var(--black); border-radius: 2px; }
        .mobile-view .content { flex: 1; padding: 28px 24px 32px; display: flex; flex-direction: column; }
        .mobile-view h1 { font-family: var(--serif); font-weight: 400; font-size: 1.65rem; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 20px; }
        .mobile-view .hero-image { width: 315px; height: 360px; border-radius: 6px; overflow: hidden; background: #c8cbd0; margin-bottom: 20px; align-self: center; flex-shrink: 0; position: relative; }
        .mobile-view .hero-image img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .mobile-view .body-text-wrap { font-family: var(--serif); font-style: italic; font-size: 1rem; line-height: 1.65; color: var(--text-body); margin-bottom: 24px; }
        .mobile-view .extra-text-block { display: none; }
        .mobile-view .extra-text-block.visible { display: inline; }
        .mobile-view .ellipsis-btn { background: none; border: none; font-family: var(--serif); font-style: italic; font-size: 1rem; color: var(--blue); cursor: pointer; padding: 0; line-height: 1.65; transition: opacity 0.2s; }
        .mobile-view .ellipsis-btn:hover { opacity: 0.7; }
        .mobile-view .cta-btn { display: flex; align-items: center; justify-content: space-between; background: var(--blue); color: #fff; font-family: var(--sans); font-size: 1rem; font-weight: 500; padding: 20px 24px; border-radius: 8px; border: none; cursor: pointer; width: 100%; text-decoration: none; transition: background 0.2s, transform 0.15s; margin-top: auto; }
        .mobile-view .cta-btn:hover { background: var(--blue-hover); transform: translateY(-1px); }
        .mobile-view .cta-btn:active { transform: translateY(0); }
        .mobile-view .btn-circle { width: 32px; height: 32px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.45); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mobile-view .btn-circle svg { width: 14px; height: 14px; fill: none; stroke: white; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
      `}</style>

      {/* DESKTOP VIEW */}
      <div className="desktop-view">
        <nav className="desktop-nav">
            <a href="#" className="desktop-logo">InnovationZ</a>
            <ul className="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#" className="dot-indicator">Events</a></li>
                <li><a href="#">Case studies</a></li>
                <li><a href="#">Our Partners</a></li>
                <li><a href="#">Our Marketplace</a></li>
            </ul>
        </nav>
        <main className="desktop-hero">
            <div className="hero-content-wrapper">
                <h1 className="hero-heading">From insightful webinars to nationwide case studies</h1>
                <div className="content-grid">
                    <div className="image-block">
                        <Image
                            src={heroImage?.imageUrl || "https://i.ibb.co/jPYVg55M/mage-1.jpg"}
                            alt={heroImage?.description || "Person watching a virtual meeting on a large monitor"}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                    <div className="side-copy">
                        <p>Globally, innovators struggle with challenges that domain knowledge can alleviate. We want to help innovators build with confidence once again starting with Kenya.</p>
                        <p>Become a part of our global community of domain experts now and share your industry insights to our community of innovators and help them bring more resilient products to the market.</p>
                        <Link href="/speaker-opportunity" className="desktop-cta-btn">
                            Click to get started
                            <span className="cta-arrow"><ArrowIcon /></span>
                        </Link>
                        <Link href="mailto:hello@innovationz.com" className="get-in-touch">
                            Get in touch
                            <SendIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
      </div>

      {/* MOBILE VIEW */}
      <div className="mobile-view">
        <div className="shell">
            <nav>
                <a href="#" className="logo">InnovationZ</a>
                <div className="hamburger" aria-label="Menu">
                    <span></span><span></span><span></span>
                </div>
            </nav>
            <div className="content">
                <h1>From insightful webinars to nationwide case studies</h1>
                <div className="hero-image">
                    <Image
                        src={heroImage?.imageUrl || "https://i.ibb.co/jPYVg55M/mage-1.jpg"}
                        alt={heroImage?.description || "Person watching a virtual meeting on a large monitor"}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
                <div className="body-text-wrap">
                    <span>Become a part of our global community of domain experts now and share your industry insights to our community of innovators and and help them bring more resilient products to the market</span>
                    <span id="extraText" className={`extra-text-block ${isExpanded ? 'visible' : ''}`}>. Globally, innovators struggle with challenges that domain knowledge can alleviate. We want to help innovators build with confidence once again starting with Kenya.</span>
                    <button className="ellipsis-btn" id="toggleBtn" onClick={toggleText} aria-expanded={isExpanded}>
                        {isExpanded ? ' — show less' : '...'}
                    </button>
                </div>
                <Link href="/speaker-opportunity" className="cta-btn">
                    Get started
                    <span className="btn-circle"><MobileArrowIcon /></span>
                </Link>
            </div>
        </div>
      </div>
    </>
  );
}

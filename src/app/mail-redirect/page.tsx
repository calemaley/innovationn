'use client'
import { NextPage } from 'next';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const MailRedirectPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const email = searchParams.get('email');

  const handleYesClick = async () => {
    if (email) {
      try {
        await fetch('/api/subscribe-updates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        toast({ title: "Subscribed!", description: "You will now receive updates on industry specific student innovations." });
      } catch (error) {
        toast({ title: "Error", description: "Could not subscribe. Please try again later.", variant: "destructive" });
      }
    }
    setTimeout(() => router.push('/'), 3000);
  };

  const handleNoClick = () => {
    router.push('/');
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=DM+Serif+Display&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #111110;
          --white: #f9f8f5;
          --accent: #2255e0;
          --light: #e8e7e3;
          --gray: #aaa9a6;
        }
        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--white);
          color: var(--black);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        nav { 
          padding: 20px 24px;
        }
        .logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: var(--black);
          text-decoration: none;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 24px 40px;
          text-align: center;
        }

        /* HEADING with paper plane icon */
        .heading-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }
        h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 1.7rem;
          font-weight: 400;
          letter-spacing: -0.02em;
        }
        .mail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mail-icon svg {
          width: 32px;
          height: 32px;
        }

        /* IMAGE */
        .image-wrap {
          width: 100%;
          max-width: 920px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          opacity: 0;
          animation: fadeIn 0.8s ease 0.2s forwards;
        }
        .image-wrap img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          object-position: center center;
          display: block;
        }
        /* "Thank you" text overlay on image */
        .thank-you-overlay {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--black);
          pointer-events: none;
        }

        /* BOTTOM ROW */
        .bottom-row {
          width: 100%;
          max-width: 920px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding-top: 24px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.4s forwards;
        }
        .bottom-row .question {
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--black);
          max-width: 300px;
        }
        .button-group {
            display: flex;
            gap: 12px;
            width: 100%;
            justify-content: center;
        }

        /* BUTTONS */
        .btn-no, .btn-yes {
          border: none;
          padding: 14px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.2s;
          white-space: nowrap;
          flex-grow: 1;
          max-width: 180px;
        }

        .btn-no {
          background: var(--light);
          color: var(--black);
        }
        .btn-no:hover { background: #dddcd8; }

        .btn-yes {
          background: var(--accent);
          color: #fff;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .btn-yes:hover { background: #1a44c8; }
        .btn-yes .btn-icon {
          display: none; /* Hide on mobile */
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          nav { padding: 28px 48px; }
          main { padding: 20px 48px 60px; text-align: left; }
          .heading-row { flex-direction: row; justify-content: flex-start; gap: 10px; margin-bottom: 28px; }
          h1 { font-size: 1.9rem; }
          .mail-icon svg { width: 36px; height: 36px; }
          .image-wrap img { height: 360px; }
          .thank-you-overlay { font-size: 1rem; bottom: 96px; left: 50%; transform: translateX(-20%); }
          .bottom-row { flex-direction: row; align-items: center; gap: 12px; padding-top: 16px; }
          .bottom-row .question { flex: 1; max-width: none; }
          .button-group { width: auto; }
          .btn-no, .btn-yes { padding: 18px 32px; font-size: 0.95rem; flex-grow: 0; }
           .btn-yes .btn-icon { display: inline-flex; }
        }
      `}</style>
        <nav>
          <a href="#" className="logo">InnovationZ</a>
        </nav>
        <main>
          <div className="heading-row">
            <h1>Check for incoming mail</h1>
            <span className="mail-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 32 L34 8 L20 36 L17 26 Z" fill="none" stroke="#111110" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M17 26 L34 8" stroke="#111110" strokeWidth="1.5"/>
                <path d="M10 36 Q6 30 10 26 Q14 22 10 18" stroke="#111110" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div className="image-wrap">
            <img src="https://i.ibb.co/NnZXqjh2/mage-5.jpg" alt="Person standing on a pencil-drawn bridge" />
            <span className="thank-you-overlay">Thank you</span>
          </div>
          <div className="bottom-row">
            <p className="question">Would you like updates on industry specific student innovations?</p>
            <div className="button-group">
                <button className="btn-no" onClick={handleNoClick}>No</button>
                <button className="btn-yes" onClick={handleYesClick}>
                Yes please
                <span className="btn-icon">&#10132;</span>
                </button>
            </div>
          </div>
        </main>
    </>
  );
};

export default MailRedirectPage;

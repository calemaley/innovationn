'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ref, push, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  industry: z.string().min(3, "Please select an industry"),
  customIndustry: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  organization: z.string().min(2, "Please select an organization type"),
  customOrganization: z.string().optional(),
  organizationName: z.string().optional(),
  email: z.string().email("A valid email is required"),
}).refine(data => {
  if (data.industry === 'Other') return data.customIndustry && data.customIndustry.length > 2;
  return true;
}, {
  message: "Please specify your industry",
  path: ["customIndustry"],
}).refine(data => {
  if (data.organization === 'Other') return data.customOrganization && data.customOrganization.length > 2;
  return true;
}, {
  message: "Please specify your organization",
  path: ["customOrganization"],
});


const ArrowIcon = () => (
    <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const industries = [
  "Aeronautics", "Agriculture", "Automotive", "Banking", "Biotechnology", "Chemicals", 
  "Communications", "Construction", "Consulting", "Education", "Electronics", "Energy", 
  "Engineering", "Entertainment", "Environmental", "Finance", "Food & Beverage", "Government", 
  "Healthcare", "Hospitality", "Insurance", "Legal", "Manufacturing", "Media", "Mining", 
  "Music", "Not-for-Profit", "Pharmaceuticals", "Real Estate", "Retail", "Shipping", 
  "Software", "Sports", "Technology", "Telecommunications", "Transportation", "Utilities", "Other"
];

const organizationTypes = [
  "Corporate", "Startup", "Non-Profit", "Government", "Educational Institution", 
  "Small Business", "Freelancer/Individual", "Other", "None"
];

export default function SpeakerOpportunityMobile() {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({ 
        name: '', 
        industry: '', customIndustry: '', 
        country: '', 
        organization: '', customOrganization: '', 
        organizationName: '', 
        email: '' 
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = formSchema.safeParse(formData);

        if (!result.success) {
            const firstError = result.error.errors[0];
            toast({ title: "Incomplete Form", description: firstError.message, variant: "destructive" });
            
            const errorInput = document.querySelector(`[name="${firstError.path[0]}"]`) as HTMLElement | null;
            errorInput?.focus();
            return;
        }

        const finalData:any = { ...result.data };
        if (finalData.industry === 'Other') {
            finalData.industry = finalData.customIndustry;
        }
        if (finalData.organization === 'Other') {
            finalData.organization = finalData.customOrganization;
        }
        if (['None', 'Freelancer/Individual'].includes(finalData.organization)) {
            delete finalData.organizationName;
        }
        delete finalData.customIndustry;
        delete finalData.customOrganization;

        toast({ title: "Submitting...", description: "Your information is being saved." });
        try {
            const speakersRef = ref(db, 'speakers');
            const newSpeakerRef = push(speakersRef);
            await set(newSpeakerRef, finalData);
            if (newSpeakerRef.key) {
                localStorage.setItem('speakerId', newSpeakerRef.key);
            }
            toast({ title: "Success!", description: "Thank you! Your information has been submitted." });
            router.push("/schedule-meeting");
        } catch (error) {
            console.error("Firebase Error:", error);
            toast({ title: "Error", description: "Could not save your information. Please try again.", variant: "destructive" });
        }
    };

    return (
        <>
            <style jsx global>{`
                .mobile-view-only { display: block; }
                @media (min-width: 641px) { .mobile-view-only { display: none; } }

                :root {
                  --white: #ffffff;
                  --black: #111110;
                  --gray-light: #e8e6e2;
                  --gray-border: #d0ceca;
                  --gray-placeholder: #b0aea9;
                  --blue: #1a4fff;
                  --blue-hover: #1040e8;
                  --sans: 'DM Sans', sans-serif;
                  --serif: 'DM Serif Display', Georgia, serif;
                }
                .shell {
                  height: 100vh;
                  max-width: 420px;
                  margin: 0 auto;
                  display: flex;
                  flex-direction: column;
                }
                .mobile-nav {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 22px 24px;
                  border-bottom: 1px solid var(--gray-light);
                  flex-shrink: 0;
                }
                .mobile-logo { font-size: 1rem; font-weight: 500; color: var(--black); text-decoration: none; }
                .hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
                .hamburger span { display: block; width: 22px; height: 2px; background: var(--black); border-radius: 2px; }

                .main-mobile {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  padding: 20px 24px 24px;
                  min-height: 0;
                }

                .mobile-h1 {
                  font-family: var(--serif);
                  font-weight: 400;
                  font-size: 1.45rem;
                  letter-spacing: -0.02em;
                  text-align: center;
                  margin-bottom: 16px;
                  flex-shrink: 0;
                }

                .mobile-hero-image {
                  width: 100%;
                  height: 155px;
                  border-radius: 6px;
                  overflow: hidden;
                  background: #f0ede8;
                  margin-bottom: 14px;
                  flex-shrink: 0;
                }
                .mobile-hero-image img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  object-position: center;
                  display: block;
                }
                .fields-wrap {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                  min-height: 0;
                  margin-bottom: 8px;
                }
                .field-box {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  padding: 0 16px;
                  border: 1px solid var(--gray-border);
                  border-radius: 6px;
                  background: var(--white);
                  min-height: 48px; /* Ensure consistent height */
                }

                .field-box input, .field-box select {
                  flex: 1;
                  background: transparent;
                  border: none;
                  outline: none;
                  font-family: var(--sans);
                  font-size: 0.95rem;
                  color: var(--black);
                  caret-color: var(--blue);
                  height: 100%;
                  width: 100%;
                  -webkit-appearance: none;
                }
                .field-box select { color: var(--gray-placeholder); }
                .field-box select.has-value { color: var(--black); }
                .field-box input::placeholder { color: var(--gray-placeholder); }
                .field-box:focus-within { border-color: var(--blue); }

                .submit-btn {
                  flex-shrink: 0;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  background: var(--blue);
                  color: #fff;
                  font-family: var(--sans);
                  font-size: 1rem;
                  font-weight: 500;
                  padding: 20px 24px;
                  border-radius: 8px;
                  border: none;
                  cursor: pointer;
                  transition: background 0.2s;
                }
                .submit-btn:hover { background: var(--blue-hover); }

                .btn-circle {
                  width: 32px; height: 32px;
                  border-radius: 50%;
                  border: 2px solid rgba(255,255,255,0.45);
                  display: flex; align-items: center; justify-content: center;
                  flex-shrink: 0;
                }
                .btn-circle svg {
                  width: 14px; height: 14px;
                  fill: none; stroke: white;
                  stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round;
                }
            `}</style>
            <div className="shell mobile-view-only">
                <nav className="mobile-nav">
                    <Link href="/" className="mobile-logo">InnovationZ</Link>
                    <div className="hamburger" aria-label="Menu">
                        <span></span><span></span><span></span>
                    </div>
                </nav>

                <form className="main-mobile" onSubmit={handleSubmit}>
                    <h1 className="mobile-h1">Let's acquaint ourselves</h1>
                    <div className="mobile-hero-image">
                        <img src="https://i.ibb.co/RpM3yGCd/handss.jpg" alt="A close-up of several hands clasped together in a circle" />
                    </div>

                    <div className="fields-wrap">
                        <div className="field-box"><input type="text" name="name" placeholder="Name" autoComplete="name" value={formData.name} onChange={handleInputChange} /></div>
                        
                        <div className="field-box">
                            <select name="industry" value={formData.industry} onChange={handleInputChange} className={formData.industry ? 'has-value' : ''}>
                                <option value="" disabled>Industry</option>
                                {industries.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        {formData.industry === 'Other' && (
                            <div className="field-box"><input type="text" name="customIndustry" placeholder="Please specify industry" value={formData.customIndustry} onChange={handleInputChange} autoFocus/></div>
                        )}

                        <div className="field-box"><input type="text" name="country" placeholder="Country" autoComplete="country-name" value={formData.country} onChange={handleInputChange}/></div>
                        
                        <div className="field-box">
                           <select name="organization" value={formData.organization} onChange={handleInputChange} className={formData.organization ? 'has-value' : ''}>
                                <option value="" disabled>Organization Type</option>
                                {organizationTypes.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        {formData.organization === 'Other' && (
                            <div className="field-box"><input type="text" name="customOrganization" placeholder="Please specify organization" value={formData.customOrganization} onChange={handleInputChange} autoFocus/></div>
                        )}

                        {formData.organization && !['None', 'Freelancer/Individual', 'Other', '' ].includes(formData.organization) && (
                            <div className="field-box"><input type="text" name="organizationName" placeholder="Organization's Name" value={formData.organizationName} onChange={handleInputChange}/></div>
                        )}

                        <div className="field-box"><input type="email" name="email" placeholder="Email" autoComplete="email" value={formData.email} onChange={handleInputChange}/></div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                        <span className="btn-circle"><ArrowIcon /></span>
                    </button>
                </form>
            </div>
        </>
    );
}

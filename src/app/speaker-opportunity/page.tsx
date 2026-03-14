'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ref, push, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { z } from 'zod';
import SpeakerOpportunityMobile from './mobile-view';

// Custom hook to check if component is mounted
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// Custom hook to get window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  industry: z.string().min(3, "Please select an industry"),
  customIndustry: z.string().optional(),
  country: z.string().min(2, "Country must be at least 2 characters"),
  organization: z.string().min(2, "Please select an organization type"),
  customOrganization: z.string().optional(),
  organizationName: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
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
  message: "Please specify your organization type",
  path: ["customOrganization"],
});

type FormData = z.infer<typeof formSchema>;

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

const EnterIcon = () => (
    <svg viewBox="0 0 24 24"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>
);

const StepLink = ({ step, activeStep, onClick, children }: { step: number, activeStep: number, onClick: (step: number) => void, children: React.ReactNode }) => (
    <a href="#" className={activeStep === step ? 'active' : ''} onClick={(e) => { e.preventDefault(); onClick(step); }}>{children}</a>
);

export default function SpeakerOpportunityPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState<Partial<FormData>>({});
    const { width } = useWindowSize();
    const isMobile = width <= 640;
    const isMounted = useMounted();

    const baseSteps = [
        { id: 'name', title: 'Name', placeholder: 'Enter name' },
        { id: 'industry', title: 'Industry', placeholder: 'Select your industry', type: 'select', options: industries },
        { id: 'country', title: 'Country', placeholder: 'Which country are you from?' },
        { id: 'organization', title: 'Organization', placeholder: 'Select your organization type', type: 'select', options: organizationTypes },
        { id: 'email', title: 'Email', placeholder: 'Enter your email address', type: 'email' },
    ];
    
    const [steps, setSteps] = useState(baseSteps);

    useEffect(() => {
        let newSteps = [...baseSteps];
        const industryIndex = newSteps.findIndex(s => s.id === 'industry');
        if (formValues.industry === 'Other') {
            newSteps.splice(industryIndex + 1, 0, { id: 'customIndustry', title: 'Your Industry', placeholder: 'Please specify your industry' });
        }

        const orgIndex = newSteps.findIndex(s => s.id === 'organization');
        if (formValues.organization === 'Other') {
            newSteps.splice(orgIndex + 1, 0, { id: 'customOrganization', title: 'Your Organization', placeholder: 'Please specify your organization type' });
        } else if (formValues.organization && !['None', 'Freelancer/Individual'].includes(formValues.organization)) {
            newSteps.splice(orgIndex + 1, 0, { id: 'organizationName', title: "Organization's Name", placeholder: "What's your organization's name?" });
        }

        setSteps(newSteps);

    }, [formValues.industry, formValues.organization]);

    const onFinalSubmit = async (data: Partial<FormData>) => {
        const result = formSchema.safeParse(data);
        if (!result.success) {
            const firstError = result.error.errors[0];
            const errorStepId = firstError.path[0];
            const errorStepIndex = steps.findIndex(s => s.id === errorStepId);

            if (errorStepIndex !== -1) {
                setActiveStep(errorStepIndex);
            }
            toast({ title: "Invalid Input", description: firstError.message, variant: "destructive" });
            return;
        }

        const finalData: any = { ...result.data };
        if (finalData.industry === 'Other') finalData.industry = finalData.customIndustry;
        if (finalData.organization === 'Other') finalData.organization = finalData.customOrganization;
        delete finalData.customIndustry;
        delete finalData.customOrganization;

        toast({ title: "Submitting...", description: "Please wait a moment." });
        try {
            const speakersRef = ref(db, 'speakers');
            const newSpeakerRef = push(speakersRef);
            await set(newSpeakerRef, finalData);
            if (newSpeakerRef.key) {
                localStorage.setItem('speakerId', newSpeakerRef.key);
            }
            toast({ title: "Success!", description: "Your information has been saved." });
            router.push("/schedule-meeting");
        } catch (error) {
            console.error("Firebase Error:", error);
            toast({ title: "Error", description: "Could not save your information. Please try again.", variant: "destructive" });
        }
    };

    const goToNextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        } else {
            onFinalSubmit(formValues);
        }
    };

    const handleStepClick = (stepIndex: number) => {
        const clickedStepId = steps[stepIndex]?.id as keyof Partial<FormData>;
        if (!clickedStepId) return;

        if (formValues[clickedStepId] || stepIndex < activeStep) {
            setActiveStep(stepIndex);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({...prev, [name]: value}));

        if (e.target.tagName.toLowerCase() === 'select' && value) {
            goToNextStep();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            goToNextStep();
        }
    };
    
    const CurrentStepInput = () => {
        const step = steps[activeStep];
        if (!step) return null;
        
        const currentId = step.id as keyof Partial<FormData>;
        const currentValue = formValues[currentId] || '';

        if (step.type === 'select') {
            return (
                <select name={step.id} value={currentValue} onChange={handleInputChange} className="form-select">
                    <option value="" disabled>{step.placeholder}</option>
                    {step.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            );
        }

        return (
            <input
                name={step.id}
                type={step.type || 'text'}
                placeholder={step.placeholder}
                value={currentValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoFocus
            />
        );
    };

    if (!isMounted) {
        return null;
    }

    if (isMobile) {
        return <SpeakerOpportunityMobile />;
    }

    return (
        <>
            <style jsx global>{`
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                  --white: #ffffff;
                  --bg: #f0ede8;
                  --black: #111110;
                  --gray-light: #e8e6e2;
                  --gray-mid: #9a9690;
                  --blue: #1a4fff;
                  --serif: 'DM Serif Display', Georgia, serif;
                  --sans: 'DM Sans', sans-serif;
                }

                html, body {
                  font-family: var(--sans);
                  background: var(--white);
                  color: var(--black);
                  -webkit-font-smoothing: antialiased;
                }

                /* NAV */
                nav {
                  padding: 28px 48px;
                }

                .logo {
                  font-size: 1rem;
                  font-weight: 500;
                  color: var(--black);
                  text-decoration: none;
                }

                /* PAGE */
                .page {
                  max-width: 940px;
                  margin: 0 auto;
                  padding: 0 48px 80px;
                }

                /* HEADING */
                h1 {
                  font-family: var(--serif);
                  font-weight: 400;
                  font-size: 2rem;
                  letter-spacing: -0.02em;
                  text-align: center;
                  margin-bottom: 28px;
                  animation: fadeUp 0.6s ease both;
                }

                /* HERO IMAGE */
                .hero-image {
                  width: 100%;
                  border-radius: 6px;
                  overflow: hidden;
                  background: var(--bg);
                  margin-bottom: 12px;
                  animation: fadeUp 0.6s 0.1s ease both;
                }

                .hero-image img {
                  width: 100%;
                  height: auto;
                  display: block;
                }

                /* INPUT BLOCK */
                .input-block {
                  background: var(--bg);
                  border-radius: 6px;
                  display: flex;
                  align-items: center;
                  padding: 22px 28px;
                  margin-bottom: 28px;
                  animation: fadeUp 0.6s 0.2s ease both;
                }

                .input-block input, .input-block .form-select {
                  flex: 1;
                  background: transparent;
                  border: none;
                  outline: none;
                  font-family: var(--sans);
                  font-size: 1rem;
                  color: var(--black);
                  caret-color: var(--blue);
                  -webkit-appearance: none;
                }

                .input-block input::placeholder, .input-block .form-select:invalid {
                  color: var(--gray-mid);
                }

                .enter-icon {
                  color: var(--gray-mid);
                  display: flex;
                  align-items: center;
                }

                .enter-icon svg {
                  width: 22px;
                  height: 22px;
                  fill: none;
                  stroke: currentColor;
                  stroke-width: 1.8;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                }

                /* STEP NAV */
                .step-nav {
                  display: flex;
                  align-items: center;
                  padding: 0 4px;
                  animation: fadeUp 0.6s 0.3s ease both;
                }

                .step-nav a {
                  font-size: 0.9rem;
                  font-weight: 400;
                  color: var(--gray-mid);
                  text-decoration: none;
                  margin-right: 40px;
                  white-space: nowrap;
                  transition: color 0.2s;
                  cursor: pointer;
                }

                .step-nav a:hover { color: var(--black); }

                .step-nav a.active {
                  color: var(--blue);
                  font-weight: 500;
                }

                .step-nav a.submit {
                  font-style: italic;
                  margin-left: auto;
                  margin-right: 0;
                }

                @keyframes fadeUp {
                  from { opacity: 0; transform: translateY(16px); }
                  to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 640px) {
                  nav { padding: 20px 24px; }
                  .page { padding: 0 24px 60px; }
                  .step-nav { flex-wrap: wrap; gap: 12px; }
                  .step-nav a { margin-right: 0; }
                }
            `}</style>
            <div>
                <nav>
                    <Link href="/" className="logo">InnovationZ</Link>
                </nav>

                <main className="page">
                    <h1>Let's get acquainted</h1>

                    <div className="hero-image">
                        <img src="https://i.ibb.co/RpM3yGCd/handss.jpg" alt="handss" />
                    </div>

                    <div className="input-block">
                        <CurrentStepInput />
                        <span className="enter-icon">
                            <EnterIcon />
                        </span>
                    </div>

                    <nav className="step-nav" aria-label="Form steps">
                        {steps.map((step, index) => (
                           <StepLink 
                                key={step.id} 
                                step={index} 
                                activeStep={activeStep} 
                                onClick={() => handleStepClick(index)}>
                                {step.title}
                            </StepLink>
                        ))}
                         <a href="#" className="submit" onClick={(e) => { e.preventDefault(); onFinalSubmit(formValues); }}>Submit</a>
                    </nav>
                </main>
            </div>
        </>
    );
}

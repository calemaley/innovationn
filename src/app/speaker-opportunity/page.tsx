'use client'

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { ref, set, push } from "firebase/database";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- SVG Icons ---
const EnterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="31" viewBox="0 0 44 31" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M42.0758 0.000383682C41.8175 0.00509147 41.5714 0.125149 41.3916 0.334213C41.2117 0.543277 41.1129 0.824225 41.1167 1.11537L41.1351 18.2531H3.37409L11.2513 9.61152C11.3437 9.51105 11.4176 9.39097 11.4688 9.25821C11.5199 9.12545 11.5473 8.98263 11.5493 8.83791C11.5514 8.69319 11.528 8.54944 11.4806 8.41492C11.4332 8.28041 11.3627 8.15778 11.2731 8.05407C11.1836 7.95035 11.0767 7.8676 10.9587 7.81057C10.8407 7.75354 10.7138 7.72333 10.5854 7.72171C10.457 7.7201 10.3296 7.7471 10.2105 7.80115C10.0914 7.85519 9.98289 7.93523 9.89129 8.03666L0.294663 18.5645C0.201453 18.6668 0.127361 18.7892 0.0767545 18.9243C0.0261477 19.0594 5.00371e-05 19.2046 7.18821e-08 19.3512C-4.98934e-05 19.4979 0.0259488 19.6431 0.0764635 19.7782C0.126978 19.9134 0.200987 20.0358 0.294127 20.1382L9.89074 30.6879C9.98241 30.7887 10.0908 30.8681 10.2097 30.9216C10.3286 30.9751 10.4557 31.0017 10.5837 30.9999C10.7117 30.9981 10.8381 30.9678 10.9558 30.9109C11.0734 30.854 11.18 30.7715 11.2694 30.6682C11.3587 30.5648 11.4292 30.4427 11.4767 30.3086C11.5241 30.1746 11.5477 30.0314 11.5461 29.8871C11.5445 29.7428 11.5176 29.6003 11.4671 29.4677C11.4167 29.3351 11.3435 29.215 11.2518 29.1142L3.37029 20.4502H41.9489C42.1003 20.4788 42.2556 20.4666 42.4021 20.4147C42.5486 20.3628 42.6822 20.2727 42.7919 20.1516C42.8018 20.1412 42.8115 20.1306 42.821 20.1197C42.9278 19.9964 43.0074 19.8466 43.0533 19.6823C43.0993 19.518 43.1103 19.3438 43.0855 19.1738L43.0666 1.11272C43.0682 0.965742 43.0437 0.819872 42.9944 0.683768C42.9452 0.547664 42.8722 0.424106 42.7798 0.320365C42.6874 0.216624 42.5775 0.134819 42.4565 0.0798174C42.3356 0.0248155 42.2061 -0.00203632 42.0758 0.000383682Z" fill="#878787"/>
    </svg>
);

const SubmitArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L16 12L12 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Data ---
const industryOptions = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Retail", "Energy", "Telecommunications", "Transportation", "Agriculture", "Real Estate", "Entertainment", "Hospitality", "Construction", "Pharmaceutical", "Automotive", "Aerospace", "Media", "Consulting", "Biotechnology", "Environmental", "Government", "Non-profit", "Other"];
const countryOptions = ["United States", "Canada", "Mexico", "United Kingdom", "Germany", "France", "Japan", "China", "India", "Brazil", "Australia", "South Africa", "Nigeria", "Kenya", "Other"];
const organizationTypes = ["Startup", "SME", "Corporation", "NGO", "Government", "University", "VC", "Other"];

// --- Form Configuration ---
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  industry: z.string().min(2, "Industry is required"),
  country: z.string().min(2, "Country is required"),
  organization: z.string().min(1, "Organization is required"),
  orgName: z.string().min(2, "Organization's name is required"),
  email: z.string().email("A valid email is required"),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: "name", label: "name", placeholder: "Enter name", type: "text" },
  { id: "industry", label: "Industry", placeholder: "Select industry", type: "select", options: industryOptions },
  { id: "country", label: "Country", placeholder: "Select country", type: "select", options: countryOptions },
  { id: "organization", label: "Organization", placeholder: "Select organization type", type: "select", options: organizationTypes },
  { id: "orgName", label: "Organization Name", placeholder: "Enter organization's name", type: "text" },
  { id: "email", label: "Email", placeholder: "Enter email", type: "email" },
];

const smallScreenFields = [
    { id: "name", placeholder: "Name", type: "text" },
    { id: "industry", placeholder: "Industry", type: "select", options: industryOptions },
    { id: "country", placeholder: "Country", type: "select", options: countryOptions },
    { id: "organization", placeholder: "Organization", type: "select", options: organizationTypes },
    { id: "orgName", placeholder: "Org’s name", type: "text" },
    { id: "email", placeholder: "Email", type: "email" },
];

// --- Component ---
export default function SpeakerOpportunity() {
  const { toast } = useToast();
  const router = useRouter();
  const handsImage = PlaceHolderImages.find(img => img.id === "hands-connection");
  const [activeStep, setActiveStep] = useState(0);
  const [isOtherIndustry, setIsOtherIndustry] = useState(false);
  const [isOtherCountry, setIsOtherCountry] = useState(false);
  const [isOtherOrganization, setIsOtherOrganization] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { name: "", industry: "", country: "", organization: "", orgName: "", email: "" },
  });

  const { register, control, trigger, getValues, handleSubmit, setValue } = form;

  const onSubmit = async (data: FormData) => {
    toast({ title: "Submitting...", description: "Please wait a moment." });
    try {
      const speakersRef = ref(db, 'speakers');
      const newSpeakerRef = push(speakersRef);
      await set(newSpeakerRef, data);
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

  const handleNextStep = async () => {
    const currentField = steps[activeStep].id as keyof FormData;
    const isValid = await trigger(currentField);
    if (isValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const currentStepInfo = steps[activeStep];
  const isOtherSelected = 
    (currentStepInfo.id === 'industry' && isOtherIndustry) ||
    (currentStepInfo.id === 'country' && isOtherCountry) ||
    (currentStepInfo.id === 'organization' && isOtherOrganization);

  return (
    <div className="bg-white text-[#222] h-screen overflow-hidden flex flex-col">
        <main className="flex-grow flex flex-col justify-center items-center font-['Inter'] p-6">
            <div className="w-full max-w-[1164px] mx-auto">

                {/* Large Screen Layout */}
                <div className="hidden md:flex flex-col items-center w-full">
                    <div className="w-full h-[451px] aspect-[271/105] relative mb-4">
                        <Image src={handsImage?.imageUrl || "https://i.ibb.co/q3kMym7J/mage-2.jpg"} alt="Connecting hands" layout="fill" objectFit="cover" priority className="rounded-md" />
                    </div>

                    <div className="w-full h-[100px] bg-[#F5F4F0] rounded-[5px] flex items-center justify-between px-8 mb-6">
                        {(currentStepInfo.type === 'select' && !isOtherSelected) ? (
                            <Controller
                                control={control}
                                name={currentStepInfo.id as keyof FormData}
                                render={({ field }) => (
                                    <Select onValueChange={(value) => {
                                        const fieldName = currentStepInfo.id;
                                        const isOther = value === 'Other';
                                        if (fieldName === 'industry') setIsOtherIndustry(isOther);
                                        if (fieldName === 'country') setIsOtherCountry(isOther);
                                        if (fieldName === 'organization') setIsOtherOrganization(isOther);

                                        if (isOther) {
                                            setValue(fieldName as keyof FormData, '');
                                        } else {
                                            setValue(fieldName as keyof FormData, value);
                                            setTimeout(() => handleNextStep(), 100);
                                        }
                                    }} value={field.value}>
                                        <SelectTrigger className="w-full bg-transparent border-none outline-none text-[#878787] text-3xl font-extralight focus:ring-0 p-0 h-auto">
                                            <SelectValue placeholder={currentStepInfo.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>{currentStepInfo.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                                    </Select>
                                )}
                            />
                        ) : (
                            <input
                                {...register(currentStepInfo.id as keyof FormData)}
                                key={currentStepInfo.id}
                                type={currentStepInfo.type}
                                placeholder={isOtherSelected ? `Enter ${currentStepInfo.label}` : currentStepInfo.placeholder}
                                className="w-full bg-transparent outline-none text-[#878787] text-3xl font-extralight placeholder:text-inherit"
                                autoFocus
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNextStep(); } }}
                            />
                        )}
                        <button onClick={handleNextStep} className="flex-shrink-0 w-[43.098px] h-[31px]"><EnterIcon /></button>
                    </div>
                    
                    <div className="flex items-center justify-center gap-x-8 text-2xl text-[#878787]">
                        {steps.map((step, index) => (
                            <span key={step.id} className={cn("font-normal", { 'font-bold text-black': activeStep === index } )}>
                                {step.label}
                            </span>
                        ))}
                        <span onClick={handleSubmit(onSubmit)} className="font-light italic cursor-pointer hover:text-black">submit</span>
                    </div>
                </div>

                {/* Small Screen Layout */}
                <div className="md:hidden w-full max-w-[315px] mx-auto flex flex-col justify-center h-full">
                    <div className="relative w-full h-[198px] mb-6">
                        <Image src={handsImage?.imageUrl || "https://i.ibb.co/q3kMym7J/mage-2.jpg"} alt="Connecting hands" layout="fill" objectFit="cover" priority className="rounded-md" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                        {smallScreenFields.map(field => {
                            const isOther = (field.id === 'industry' && isOtherIndustry) || (field.id === 'country' && isOtherCountry) || (field.id === 'organization' && isOtherOrganization);
                            return (
                                <div key={field.id}>
                                    {field.type === 'select' ? (
                                        <>
                                            <Controller
                                                control={control}
                                                name={field.id as keyof FormData}
                                                render={({ field: controllerField }) => (
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            const isOther = value === 'Other';
                                                            if (field.id === 'industry') setIsOtherIndustry(isOther);
                                                            if (field.id === 'country') setIsOtherCountry(isOther);
                                                            if (field.id === 'organization') setIsOtherOrganization(isOther);

                                                            if (isOther) {
                                                                controllerField.onChange('');
                                                            } else {
                                                                controllerField.onChange(value);
                                                            }
                                                        }}
                                                        value={controllerField.value}
                                                    >
                                                        <SelectTrigger className="w-[315px] h-[54px] border border-[#DADADA] px-4 text-[#878787] text-xl font-light focus:ring-0">
                                                            <SelectValue placeholder={field.placeholder} />
                                                        </SelectTrigger>
                                                        <SelectContent>{field.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {isOther && field.id === 'industry' && (
                                                <div className="mt-2">
                                                    <input
                                                        {...register('industry')}
                                                        placeholder="Please specify industry"
                                                        className="w-[315px] h-[54px] border border-[#DADADA] px-4 text-[#878787] text-xl font-light placeholder:text-inherit"
                                                    />
                                                </div>
                                            )}
                                            {isOther && field.id === 'country' && (
                                                <div className="mt-2">
                                                    <input
                                                        {...register('country')}
                                                        placeholder="Please specify country"
                                                        className="w-[315px] h-[54px] border border-[#DADADA] px-4 text-[#878787] text-xl font-light placeholder:text-inherit"
                                                    />
                                                </div>
                                            )}
                                            {isOther && field.id === 'organization' && (
                                                <div className="mt-2">
                                                    <input
                                                        {...register('organization')}
                                                        placeholder="Please specify organization"
                                                        className="w-[315px] h-[54px] border border-[#DADADA] px-4 text-[#878787] text-xl font-light placeholder:text-inherit"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <input
                                            {...register(field.id as keyof FormData)}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-[315px] h-[54px] border border-[#DADADA] px-4 text-[#878787] text-xl font-light placeholder:text-inherit"
                                        />
                                    )}
                                </div>
                            )
                        })}
                        
                        <button type="submit" className="w-[315px] h-[64px] bg-[#0059FF] border border-[#DADADA] flex items-center justify-between px-6 mt-3 rounded-md">
                            <span className="text-white text-xl font-normal">submit</span>
                            <SubmitArrowIcon />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
  );
}

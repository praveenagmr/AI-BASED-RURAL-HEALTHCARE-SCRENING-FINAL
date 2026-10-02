import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  Award, 
  Stethoscope, 
  BrainCircuit, 
  Database, 
  MapPin, 
  ShieldCheck, 
  FileCode, 
  Layers, 
  Mic2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16 animate-fadeIn">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
          <Award className="w-3.5 h-3.5" />
          Final Year Engineering Major Project
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Based Rural Healthcare Screening
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          An explainable, offline AI triage system designed to provide early health screening, multilingual voice assistance, and localized healthcare logistics for rural communities.
        </p>
      </div>

      {/* Problem Statement & Core Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            The Rural Healthcare Challenge
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            In rural villages across Karnataka and India, access to qualified physicians is critically scarce. When villagers experience symptoms like fever, fatigue, or cough, there is often no doctor within 10-20 kilometers. Because transport is costly and clinic hours are limited, people postpone care until conditions progress into life-threatening complications.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Ethical Principle: Doctor-in-the-Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>The crucial ethical foundation:</strong> This system does NOT replace a doctor. It acts as an intelligent first-line triage checkpoint. It screens symptoms, flags emergency danger signs, provides actionable self-care guidelines, and directly connects patients to nearest medical stores or emergency hospitals.
          </p>
        </div>
      </section>

      {/* The 11 Specific Steps of the System */}
      <section className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-600" />
          The 11 Architectural Steps of the Project
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 1: Rural User Opens Web Portal
            </strong>
            Displays the interactive Home page, About the System, Day/Night mode toggle, Trilingual selector (Kannada, Hindi, English), and Voice Assistant.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 2: User Registration
            </strong>
            First-time users click Register and enter their full name, mobile number/email, password, age, gender, and assign their Varur village house (1 to 15).
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 3: User Login & Verification
            </strong>
            The registered user enters mobile/username and password. The system verifies credentials securely.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 4: Main Dashboard
            </strong>
            Displays Home, My Profile, 15 House Health Directory, Medicals & Home Delivery, Nearest Hospitals & Emergency Helpline, and the primary CTA: Start Health Screening.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 5: Enter Health Information & Symptoms
            </strong>
            Captures age, gender, and key symptoms (fever, cough, headache, fatigue, difficulty breathing, vomiting, body pain, chest pain) via touchscreen checkboxes or natural voice input in Kannada, Hindi, and English.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 6: Rigorous Clinical Data Validation
            </strong>
            Before AI inference, the system checks whether inputs are biologically valid (age 1-120, at least one symptom selected, valid vitals). If invalid, displays: <em>"Please enter valid health information"</em> to prevent garbage-in garbage-out.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 7: Data Processing & Feature Vectorization
            </strong>
            Normalizes symptoms into clinical feature vectors with duration and age multipliers.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 8: Offline AI/ML Screening
            </strong>
            Analyzes the combination of symptoms and vitals. Generates risk classification: Low Risk (Green), Moderate Risk (Yellow), or High Risk (Red - Emergency Referral).
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 9: Explainable AI Result (XAI)
            </strong>
            Crucial engineering feature: Instead of just returning a condition name, the system shows <em>WHY</em> the AI produced the result (percentage weights, red-flag symptoms, duration factors).
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 10: Tailored Rural Healthcare Recommendation
            </strong>
            Provides clear clinical guidance based on risk level. Links directly to local Varur pharmacies for home medicine delivery or emergency hospital ambulance dispatch.
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
              Step 11: Display Comprehensive Screening Report
            </strong>
            Presents full printable summary, QR validation, nearest hospital contact (KIMS Hubballi), nearest pharmacy, and trilingual voice audio narration in Kannada, Hindi, and English.
          </div>
        </div>
      </section>

      {/* Real Village Profile: Varur */}
      <section className="p-8 rounded-3xl bg-emerald-950 text-white border border-emerald-800 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          Field Study Location
        </div>
        <h2 className="text-2xl font-bold text-white">
          Varur Village (Hubballi Taluk, Dharwad District, Karnataka)
        </h2>
        <p className="text-sm text-emerald-100/90 leading-relaxed">
          The dataset models exactly 15 authentic rural households in Varur village (PIN 581207) along NH 48. Surnames represent traditional community families (Patil, Kulkarni, Badiger, Kurubar, Kammar, Nayak, Pujar, Shettar, Hiremath, Hadapad, Madar, Belagavi, Dharwad, Ganiger, Tadas).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/60">
            <span className="text-emerald-300 font-bold block">Primary Health Centre</span>
            <span className="text-white">Varur PHC (0.8 km) - Outpatient OPD</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/60">
            <span className="text-emerald-300 font-bold block">Tertiary Hospital</span>
            <span className="text-white">KIMS Hospital Hubballi (16 km) - 24/7 Trauma</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/60">
            <span className="text-emerald-300 font-bold block">Local Pharmacies</span>
            <span className="text-white">Sanjeevini & Shri Navagraha Medicals</span>
          </div>
        </div>
      </section>

      {/* Technical Highlights / Zero API Key Badge */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            100% Zero External API Key Architecture
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The clinical screening model, Web Speech API speech synthesis, speech recognition, and MongoDB models operate independently of cloud billing or third-party paid keys.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold shrink-0 border border-emerald-300 dark:border-emerald-800">
          Ready for MongoDB & VS Code
        </div>
      </section>

    </div>
  );
};

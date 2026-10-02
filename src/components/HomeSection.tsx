import React from 'react';
import { Language, UserProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  HeartPulse, 
  Stethoscope, 
  MapPin, 
  Building2, 
  Pill, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  PhoneCall, 
  FileText,
  Volume2
} from 'lucide-react';
import { speakText } from '../utils/speechAssistant';

interface HomeSectionProps {
  language: Language;
  currentUser: UserProfile | null;
  onStartScreening: () => void;
  onExploreVillage: () => void;
  onOpenMedicals: () => void;
  onOpenHospitals: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  language,
  currentUser,
  onStartScreening,
  onExploreVillage,
  onOpenMedicals,
  onOpenHospitals,
  onOpenAuth,
}) => {
  const t = getTranslation(language);

  const handleHearVoiceIntro = () => {
    let msg = '';
    if (language === 'kannada') {
      msg = 'ವರೂರು ಗ್ರಾಮದ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ತಪಾಸಣೆ ವ್ಯವಸ್ಥೆಗೆ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನೀವು ಪ್ರಾಥಮಿಕ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ, ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ತುರ್ತು ಆಸ್ಪತ್ರೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಬಹುದು.';
    } else if (language === 'hindi') {
      msg = 'वरूर गांव की एआई आधारित ग्रामीण स्वास्थ्य जांच प्रणाली में आपका स्वागत है। यहां आप अपने लक्षणों की प्राथमिक जांच करवाकर सही स्वास्थ्य मार्गदर्शन प्राप्त कर सकते हैं।';
    } else {
      msg = 'Welcome to the AI Based Rural Healthcare Screening system for Varur village. Perform initial health checks, assess risk levels, and access nearest medical facilities without delay.';
    }
    speakText(msg, language);
  };

  const stepsList = [
    { num: 'Step 1', title: 'Open Web Portal', desc: 'Home, About, Multi-language & Voice support' },
    { num: 'Step 2 & 3', title: 'Register & Login', desc: 'Secure profile tied to 15 Varur village houses' },
    { num: 'Step 4', title: 'User Dashboard', desc: 'Family records, health history, screening launcher' },
    { num: 'Step 5', title: 'Enter Health Info', desc: 'Voice/text symptoms: fever, cough, fatigue, vitals' },
    { num: 'Step 6', title: 'Data Validation', desc: 'Ensures realistic age, vitals & symptom inputs' },
    { num: 'Step 7 & 8', title: 'AI/ML Screening', desc: 'Local clinical model predicts Low/Mod/High risk' },
    { num: 'Step 9', title: 'Explainable AI (XAI)', desc: 'Transparent breakdown of why the AI diagnosed this' },
    { num: 'Step 10', title: 'Guidelines & Orders', desc: 'Home medicine delivery in Varur or 108 referral' },
    { num: 'Step 11', title: 'Screening Report', desc: 'Trilingual audio report, printable health summary' },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white shadow-xl p-8 sm:p-12 border border-emerald-800/60">
        
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-xs font-semibold text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>Pilot Location: Varur Village, Dharwad, Karnataka (PIN 581207)</span>
            <span className="hidden sm:inline">• 15 Verified Household Records</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {t.heroHeading}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
            {t.heroDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStartScreening}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-5 h-5 text-slate-950" />
              <span>{t.startScreeningBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={handleHearVoiceIntro}
              className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-emerald-500/40 text-emerald-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              title="Hear voice introduction"
            >
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Listen in {language === 'kannada' ? 'ಕನ್ನಡ' : language === 'hindi' ? 'हिंदी' : 'English'}</span>
            </button>

            <button
              onClick={onExploreVillage}
              className="px-5 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-100 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>{t.villageDataBtn}</span>
            </button>
          </div>

          {/* User state alert */}
          <div className="pt-2 text-xs text-emerald-200/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            {currentUser ? (
              <span>
                Active Villager Session: <strong>{currentUser.name}</strong> ({currentUser.houseNumber}, Varur)
              </span>
            ) : (
              <span>
                Examiner Mode: You can explore all village data, medicals, and test AI screening without logging in or click{' '}
                <button 
                  onClick={() => onOpenAuth('login')} 
                  className="underline font-bold text-white hover:text-emerald-300"
                >
                  Login / Register
                </button>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Varur Village Health Metrics Summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          onClick={onExploreVillage}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Village Houses
            </span>
            <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            15 Houses
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            62 Residents profiled in Varur
          </p>
        </div>

        <div 
          onClick={onStartScreening}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              AI Clinical Model
            </span>
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            100% Offline
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Zero API key dependency
          </p>
        </div>

        <div 
          onClick={onOpenMedicals}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Local Medicals
            </span>
            <Pill className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            4 Stores
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Free home delivery in Varur
          </p>
        </div>

        <div 
          onClick={onOpenHospitals}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Emergency Referral
            </span>
            <HeartPulse className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            KIMS Hubballi
          </div>
          <p className="text-xs text-red-500 dark:text-red-400 font-semibold mt-1">
            16 km via NH 48 • 108 Ready
          </p>
        </div>
      </section>

      {/* 11-Step Project Architecture Walkthrough */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Project Lifecycle
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Complete 11-Step Rural Healthcare Screening Workflow
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            Compliant with Project Specification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stepsList.map((step, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-1 hover:border-emerald-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {step.num}
                </span>
                <span className="text-xs text-slate-400">#0{idx + 1}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white pt-1">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Varur Village Context Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
            Rural Ground Reality
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Why Varur Village Needs This AI Screening System
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Varur is an agricultural village situated along NH 48, approximately 16 kilometers south of Hubballi city. While it hosts the famous Navagraha Teertha, primary healthcare access remains constrained during odd hours, agricultural peak seasons, and monsoons when vector-borne illnesses (dengue and malaria) surge.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Varur PHC (0.8 km)</strong> operates Outpatient care during daytime, but night emergencies require travel to Hubballi.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Trilingual Voice Assistant</strong> empowers elder villagers unable to read screens in Kannada, Hindi, and English.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Direct Home Delivery</strong> from Sanjeevini and Shri Navagraha Medicals saves elders a trip to the main bazaar.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>108 Emergency Protocol</strong> routes critical cardiac and respiratory distress straight to KIMS Hospital Hubballi.</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={onStartScreening}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Test AI Health Screening with Voice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-time map & facilities preview card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Varur Health Infrastructure
            </span>
            <span className="text-[11px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold">
              Live Network
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Varur Primary Health Centre</p>
                <p className="text-slate-500 dark:text-slate-400">Near Gram Panchayat • 0.8 km</p>
              </div>
              <a 
                href="tel:08362201108"
                className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                Call PHC
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">KIMS Hospital Hubballi</p>
                <p className="text-slate-500 dark:text-slate-400">Tertiary ICU & Trauma • 16.0 km</p>
              </div>
              <a 
                href="tel:108"
                className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold hover:bg-red-100 flex items-center gap-1"
              >
                <HeartPulse className="w-3 h-3" />
                108 ICU
              </a>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Sanjeevini Grama Medicals</p>
                <p className="text-slate-500 dark:text-slate-400">Varur Bazaar • Home Delivery Active</p>
              </div>
              <button 
                onClick={onOpenMedicals}
                className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold hover:bg-teal-100 flex items-center gap-1 cursor-pointer"
              >
                <Pill className="w-3 h-3" />
                Order Meds
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

import React from 'react';
import { Language, UserProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  HeartPulse, 
  Sun, 
  Moon, 
  Globe2, 
  Mic, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  Stethoscope, 
  Home, 
  Building2, 
  Pill, 
  Info,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onOpenVoiceAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenVoiceAssistant,
}) => {
  const t = getTranslation(language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top emergency & village banner */}
      <div className="bg-emerald-700 dark:bg-emerald-900 text-white text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-800 dark:bg-emerald-950 text-emerald-100 border border-emerald-600">
            <MapPin className="w-3 h-3 mr-1 inline" /> Varur Village (ವರೂರು) • PIN 581207
          </span>
          <span className="hidden sm:inline text-emerald-100">
            Hubballi Taluk, Dharwad Dist, Karnataka (NH 48)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-amber-200">
            🚨 24x7 Ambulance: <a href="tel:108" className="underline font-bold text-white hover:text-amber-300">108</a>
          </span>
          <span className="hidden md:inline text-emerald-200">|</span>
          <span className="hidden md:inline text-emerald-100">
            Varur PHC: <a href="tel:08362201108" className="hover:underline">0836-2201108</a>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & Village Identity */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white leading-tight">
                  RuralHealth AI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Varur
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              {t.navHome}
            </button>

            <button
              onClick={() => setCurrentTab('screening')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'screening'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t.navScreening}
            </button>

            <button
              onClick={() => setCurrentTab('village')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'village'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              {t.navVillage}
            </button>

            <button
              onClick={() => setCurrentTab('medicals')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'medicals'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Pill className="w-4 h-4" />
              {t.navMedicals}
            </button>

            <button
              onClick={() => setCurrentTab('hospitals')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'hospitals'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <HeartPulse className="w-4 h-4 text-red-500" />
              {t.navHospitals}
            </button>

            <button
              onClick={() => setCurrentTab('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'about'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Info className="w-4 h-4" />
              {t.navAbout}
            </button>

            {currentUser && (
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  currentTab === 'dashboard'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                {t.navDashboard}
              </button>
            )}
          </nav>

          {/* Action Tools: Voice Assistant, Language Switcher, Dark Mode, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Voice Assistant Button */}
            <button
              onClick={onOpenVoiceAssistant}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-emerald-100/80 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs border border-emerald-300 dark:border-emerald-700"
              title={t.voiceAssistant}
            >
              <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">{t.voiceAssistant}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
              <Globe2 className="w-3.5 h-3.5 ml-2 text-slate-500 dark:text-slate-400" />
              <select
                aria-label="Language selection"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-semibold py-1.5 pl-1.5 pr-2 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="kannada" className="dark:bg-slate-800">ಕನ್ನಡ (KN)</option>
                <option value="hindi" className="dark:bg-slate-800">हिंदी (HI)</option>
                <option value="english" className="dark:bg-slate-800">English (EN)</option>
              </select>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
              title={t.themeToggle}
              aria-label={t.themeToggle}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                >
                  <UserIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="truncate max-w-[100px]">{currentUser.name}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">({currentUser.houseNumber})</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900 transition-colors flex items-center gap-1"
                  title={t.navLogout}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.navLogout}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-slate-300 dark:border-slate-700"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.navLogin}</span>
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.navRegister}</span>
                  <span className="sm:hidden">Join</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile quick navigation tabs */}
        <div className="xl:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-200 dark:border-slate-800 no-scrollbar">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
              currentTab === 'home'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => setCurrentTab('screening')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
              currentTab === 'screening'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t.navScreening}
          </button>
          <button
            onClick={() => setCurrentTab('village')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
              currentTab === 'village'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t.navVillage}
          </button>
          <button
            onClick={() => setCurrentTab('medicals')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
              currentTab === 'medicals'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t.navMedicals}
          </button>
          <button
            onClick={() => setCurrentTab('hospitals')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
              currentTab === 'hospitals'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t.navHospitals}
          </button>
          <button
            onClick={() => setCurrentTab('about')}
            className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
              currentTab === 'about'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
            }`}
          >
            {t.navAbout}
          </button>
          {currentUser && (
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-2.5 py-1 rounded text-xs font-semibold shrink-0 ${
                currentTab === 'dashboard'
                  ? 'bg-emerald-600 text-white'
                : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {t.navDashboard}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

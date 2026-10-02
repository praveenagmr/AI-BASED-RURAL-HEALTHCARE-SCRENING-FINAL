/**
 * AI BASED RURAL HEALTHCARE SCREENING
 * Final Year Engineering Major Project
 * Target Field Study: Varur Village, Hubballi Taluk, Dharwad District, Karnataka
 */

import React, { useState, useEffect } from 'react';
import { Language, UserProfile, ScreeningResult } from './types';
import { getTranslation } from './i18n/translations';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { Dashboard } from './components/Dashboard';
import { ScreeningWizard } from './components/ScreeningWizard';
import { VillageDirectory } from './components/VillageDirectory';
import { MedicalsSection } from './components/MedicalsSection';
import { HospitalsSection } from './components/HospitalsSection';
import { AuthModal } from './components/AuthModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';

export default function App() {
  // Language State: 'kannada' (default for Varur village), 'hindi', or 'english'
  const [language, setLanguage] = useState<Language>('kannada');

  // Dark/Night Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('varur_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // User Authentication State
  // Requirement 2: The user interface should not show directly a user logged in information after running in VS Code.
  // Requirement 3: The user interface should show the login and register information with the rest of all details.
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    // Check if session was already explicitly created in current browser session
    return storageService.getCurrentUser();
  });

  // Navigation Tabs: 'home' | 'about' | 'dashboard' | 'screening' | 'village' | 'medicals' | 'hospitals'
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Cross-component states
  const [activeReportToView, setActiveReportToView] = useState<ScreeningResult | null>(null);
  const [prescriptionMedicines, setPrescriptionMedicines] = useState<string[]>([]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('varur_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('varur_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Auth actions
  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    storageService.setCurrentUser(user);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    storageService.logoutUser();
    setCurrentUser(null);
    setCurrentTab('home');
  };

  // Navigations from Home / Dashboard
  const handleStartScreening = () => {
    setActiveReportToView(null);
    setCurrentTab('screening');
  };

  const handleScreenHouseMember = (houseNumber: string, memberName: string) => {
    setActiveReportToView(null);
    setCurrentTab('screening');
  };

  const handleViewReport = (report: ScreeningResult) => {
    setActiveReportToView(report);
    setCurrentTab('screening');
  };

  const handleOpenMedicalsWithPrescription = (medicineNames: string[]) => {
    setPrescriptionMedicines(medicineNames);
    setCurrentTab('medicals');
  };

  const handleStartScreeningWithVoiceSymptoms = (detectedSymptoms: Record<string, boolean>) => {
    setActiveReportToView(null);
    setCurrentTab('screening');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenVoiceAssistant={() => setIsVoiceModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HomeSection
            language={language}
            currentUser={currentUser}
            onStartScreening={handleStartScreening}
            onExploreVillage={() => setCurrentTab('village')}
            onOpenMedicals={() => setCurrentTab('medicals')}
            onOpenHospitals={() => setCurrentTab('hospitals')}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'about' && (
          <AboutSection language={language} />
        )}

        {currentTab === 'dashboard' && currentUser && (
          <Dashboard
            language={language}
            currentUser={currentUser}
            onStartScreening={handleStartScreening}
            onViewReport={handleViewReport}
            onOrderMedicines={() => setCurrentTab('medicals')}
            onViewVillageDirectory={() => setCurrentTab('village')}
          />
        )}

        {/* If user navigates to dashboard while logged out, show helpful prompt */}
        {currentTab === 'dashboard' && !currentUser && (
          <div className="max-w-md mx-auto text-center py-16 space-y-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Patient Login Required
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Please login or register to view your family health records, dashboard, and past screenings.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => handleOpenAuth('login')}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
              >
                Login to Account
              </button>
              <button
                onClick={() => handleOpenAuth('register')}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
              >
                New Registration
              </button>
            </div>
          </div>
        )}

        {currentTab === 'screening' && (
          <ScreeningWizard
            language={language}
            currentUser={currentUser}
            onOpenMedicalsWithPrescription={handleOpenMedicalsWithPrescription}
            onOpenHospitals={() => setCurrentTab('hospitals')}
            initialReport={activeReportToView}
          />
        )}

        {currentTab === 'village' && (
          <VillageDirectory
            language={language}
            onScreenHouseMember={handleScreenHouseMember}
          />
        )}

        {currentTab === 'medicals' && (
          <MedicalsSection
            language={language}
            currentUser={currentUser}
            preselectedMedicines={prescriptionMedicines}
          />
        )}

        {currentTab === 'hospitals' && (
          <HospitalsSection language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Auth Modal (Step 2 Register & Step 3 Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        language={language}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Trilingual Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        setLanguage={setLanguage}
        onStartScreeningWithSymptoms={handleStartScreeningWithVoiceSymptoms}
      />

    </div>
  );
}

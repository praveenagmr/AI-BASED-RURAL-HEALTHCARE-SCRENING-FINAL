import React, { useState, useEffect } from 'react';
import { Language, UserProfile, ScreeningResult, MedicineOrder, HouseholdData } from '../types';
import { getTranslation } from '../i18n/translations';
import { storageService } from '../services/storageService';
import { 
  User, 
  Stethoscope, 
  History, 
  Pill, 
  Building2, 
  HeartPulse, 
  Calendar, 
  ArrowRight, 
  ShieldAlert, 
  PhoneCall, 
  AlertTriangle, 
  CheckCircle2,
  FileText,
  Volume2
} from 'lucide-react';
import { speakScreeningReport } from '../utils/speechAssistant';

interface DashboardProps {
  language: Language;
  currentUser: UserProfile;
  onStartScreening: () => void;
  onViewReport: (report: ScreeningResult) => void;
  onOrderMedicines: () => void;
  onViewVillageDirectory: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  language,
  currentUser,
  onStartScreening,
  onViewReport,
  onOrderMedicines,
  onViewVillageDirectory,
}) => {
  const t = getTranslation(language);
  const [screenings, setScreenings] = useState<ScreeningResult[]>([]);
  const [orders, setOrders] = useState<MedicineOrder[]>([]);
  const [userHousehold, setUserHousehold] = useState<HouseholdData | null>(null);

  useEffect(() => {
    // Load screenings for this user's house
    const allScreenings = storageService.getScreenings(currentUser.houseNumber);
    setScreenings(allScreenings);

    // Load medicine orders
    const allOrders = storageService.getMedicineOrders(currentUser.houseNumber);
    setOrders(allOrders);

    // Find household
    const households = storageService.getHouseholds();
    const matched = households.find(h => h.houseNumber === currentUser.houseNumber);
    if (matched) setUserHousehold(matched);
  }, [currentUser]);

  const handleSpeakReport = (report: ScreeningResult) => {
    speakScreeningReport(report, language);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-700/60">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/80 text-emerald-200 border border-emerald-500/40 inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-300" />
            Varur Village Health Record ({currentUser.houseNumber})
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.dashWelcome}, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            {t.dashEmergencyBox}
          </p>
        </div>

        <button
          onClick={onStartScreening}
          className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-400/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Stethoscope className="w-5 h-5 text-slate-950" />
          <span>{t.dashStartNew}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Profile Card, Household Card, Emergency Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User Profile Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              {t.dashPatientProfile}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Verified Villager
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">{t.nameLabel}:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{currentUser.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">{t.mobileLabel}:</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{currentUser.mobile}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">{t.ageLabel} / {t.genderLabel}:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.age} yrs • {currentUser.gender}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-500 dark:text-slate-400">Varur House No.:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{currentUser.houseNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">ASHA Worker:</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Smt. Shanta Pujar</span>
            </div>
          </div>
        </div>

        {/* Household Family Members Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Household ({currentUser.houseNumber})
            </span>
            <button
              onClick={onViewVillageDirectory}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              All 15 Houses →
            </button>
          </div>

          {userHousehold ? (
            <div className="space-y-2 text-xs">
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Head: <strong>{userHousehold.headOfFamily}</strong> ({userHousehold.streetName})
              </p>
              <div className="space-y-1.5 pt-1">
                {userHousehold.members.map((m, idx) => (
                  <div 
                    key={idx}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{m.name}</span>
                      <span className="text-slate-500 text-[11px] ml-1.5">({m.relation}, {m.age}y)</span>
                    </div>
                    {m.lastScreeningRisk && m.lastScreeningRisk !== 'None' ? (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        m.lastScreeningRisk === 'High'
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : m.lastScreeningRisk === 'Moderate'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {m.lastScreeningRisk} Risk
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Stable</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Loading household records...</p>
          )}
        </div>

        {/* Quick Rural Emergency & Medical Actions Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-red-500" />
              Varur Health Network
            </span>
            <span className="text-xs font-mono text-emerald-600 font-bold">24x7 Active</span>
          </div>

          <div className="space-y-3 text-xs">
            <a
              href="tel:108"
              className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-between group hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              <div>
                <span className="font-bold text-red-700 dark:text-red-300 block">Emergency 108 Ambulance</span>
                <span className="text-[11px] text-red-600 dark:text-red-400">KIMS Hubballi Trauma Referral</span>
              </div>
              <PhoneCall className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
            </a>

            <button
              onClick={onOrderMedicines}
              className="w-full p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 flex items-center justify-between text-left group hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors cursor-pointer"
            >
              <div>
                <span className="font-bold text-teal-800 dark:text-teal-300 block">Order Medicine Home Delivery</span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400">Sanjeevini Grama Medicals (30m delivery)</span>
              </div>
              <Pill className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Health Screening Reports Table / Cards */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              {t.dashRecentScreenings}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified AI screening records logged for House {currentUser.houseNumber}
            </p>
          </div>

          <button
            onClick={onStartScreening}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" />
            <span>New Health Screening</span>
          </button>
        </div>

        {screenings.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {t.dashNoScreenings}
            </p>
            <button
              onClick={onStartScreening}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
            >
              Start First AI Screening (Step 5)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenings.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3 hover:border-emerald-500 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                      {rec.id} • {new Date(rec.timestamp).toLocaleDateString()}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {rec.patientName} ({rec.patientAge}y, {rec.patientGender})
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shrink-0 ${
                    rec.riskLevel === 'High'
                      ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300'
                      : rec.riskLevel === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  }`}>
                    {rec.riskLevel === 'High' ? <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    {rec.riskLevel} Risk
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">
                    Suspected Condition:
                  </span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {language === 'kannada'
                      ? rec.preliminaryCondition.kannada
                      : language === 'hindi'
                        ? rec.preliminaryCondition.hindi
                        : rec.preliminaryCondition.english}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Confidence: <strong>{rec.confidenceScore}%</strong> • Symptoms: {rec.activeSymptoms.join(', ')}
                  </p>
                </div>

                {/* Card actions: View Full Report & Voice Audio Readout */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleSpeakReport(rec)}
                    className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Listen to screening report audio"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px]">Audio</span>
                  </button>

                  <button
                    onClick={() => onViewReport(rec)}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Report (Step 11)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

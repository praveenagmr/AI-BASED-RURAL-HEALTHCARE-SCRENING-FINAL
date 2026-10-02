import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { varurHospitals } from '../data/varurVillageData';
import { 
  HeartPulse, 
  MapPin, 
  PhoneCall, 
  Building2, 
  Bed, 
  ShieldAlert, 
  Pill, 
  Clock, 
  Navigation, 
  CheckCircle2 
} from 'lucide-react';

interface HospitalsSectionProps {
  language: Language;
}

export const HospitalsSection: React.FC<HospitalsSectionProps> = ({ language }) => {
  const t = getTranslation(language);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-red-500" />
            Rural Emergency Referral & Hospital Logistics
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 font-bold border border-red-300 dark:border-red-800">
            Emergency Ambulance: 108 (24x7 Free)
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.hospitalsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.hospitalsDesc}
            </p>
          </div>

          <a
            href="tel:108"
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0 animate-pulse"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.callAmbulanceBtn}</span>
          </a>
        </div>
      </div>

      {/* Hospitals Cards */}
      <div className="space-y-6">
        {varurHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xs hover:border-red-400 transition-all space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300">
                    {hospital.type}
                  </span>
                  {hospital.hasICU && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      ICU Facility Available
                    </span>
                  )}
                  {hospital.hasEmergency24x7 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      24/7 Casualty & Trauma
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {hospital.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  {hospital.location}
                </p>
              </div>

              {/* Distance from Varur Badge & Ambulance dial */}
              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <span className="text-sm sm:text-base font-extrabold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                  {hospital.distanceKm} km from Varur Village
                </span>
                <span className="text-xs text-slate-400">
                  Direct route via NH 48 (Pune-Bengaluru Highway)
                </span>
              </div>
            </div>

            {/* Hospital details: Emergency contact, beds, specialties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Emergency Contacts */}
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs space-y-2">
                <span className="font-bold text-red-800 dark:text-red-300 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Emergency Hotlines:
                </span>
                <div className="space-y-1 font-mono">
                  <p>Casualty Desk: <strong className="text-red-700 dark:text-red-400">{hospital.emergencyContact}</strong></p>
                  <p>Ambulance Dispatch: <strong className="text-red-700 dark:text-red-400">{hospital.ambulanceContact}</strong></p>
                </div>
                <a
                  href={`tel:${hospital.emergencyContact.replace(/[^0-9]/g, '')}`}
                  className="inline-block mt-1 text-[11px] font-bold text-red-600 dark:text-red-400 underline hover:text-red-800"
                >
                  Click to Call Emergency Desk →
                </a>
              </div>

              {/* Available Beds & Trauma Capacity */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-emerald-600" />
                  Capacity & Bed Setup:
                </span>
                <div className="space-y-1">
                  <p>Inpatient Capacity: <strong>{hospital.availableBeds} Hospital Beds</strong></p>
                  <p>ICU Critical Care: <strong>{hospital.hasICU ? 'Equipped with Ventilators' : 'Stabilization & Transfer'}</strong></p>
                </div>
              </div>

              {/* Specific Medicals Near this Hospital */}
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs space-y-2">
                <span className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-teal-600" />
                  Medicals Near to This Hospital:
                </span>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                  {hospital.nearbyPharmacies.map((pharm, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                      <span>{pharm}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Specialties */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Departments & Key Medical Care:
              </span>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

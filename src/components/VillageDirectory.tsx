import React, { useState } from 'react';
import { Language, HouseholdData } from '../types';
import { getTranslation } from '../i18n/translations';
import { varur15Households } from '../data/varurVillageData';
import { 
  Building2, 
  Search, 
  MapPin, 
  Users, 
  Phone, 
  ShieldCheck, 
  Activity, 
  Stethoscope, 
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface VillageDirectoryProps {
  language: Language;
  onScreenHouseMember: (houseNumber: string, memberName: string) => void;
}

export const VillageDirectory: React.FC<VillageDirectoryProps> = ({
  language,
  onScreenHouseMember,
}) => {
  const t = getTranslation(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<HouseholdData | null>(null);

  const filteredHouses = varur15Households.filter(h => 
    h.houseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.headOfFamily.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.streetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.members.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            Rural Health Census & Household Records
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
            Varur Village • 15 Verified Houses
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Varur Village 15 Households Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              Authentic community records for Varur village, Hubballi Taluk, Karnataka. Tracks 62 residents across 15 homes, assigned ASHA workers, chronic conditions, and previous AI screening outcomes.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search house or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of 15 Households */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.map((house) => (
          <div
            key={house.houseNumber}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-600 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {house.houseNumber}
                </span>

                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-semibold">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  {house.members.length} Members
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {house.headOfFamily}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  {house.streetName} • {house.landmark}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  Contact: {house.contactNumber}
                </p>
              </div>

              {/* Family Members list preview */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Family Members:
                </span>
                <div className="space-y-1">
                  {house.members.map((member, idx) => (
                    <div 
                      key={idx}
                      className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
                    >
                      <div className="truncate">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{member.name}</span>
                        <span className="text-slate-400 text-[10px] ml-1">({member.relation}, {member.age}y)</span>
                        {member.hasChronicCondition && (
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 block truncate">
                            • {member.hasChronicCondition}
                          </span>
                        )}
                      </div>

                      {member.lastScreeningRisk && member.lastScreeningRisk !== 'None' ? (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                          member.lastScreeningRisk === 'High'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : member.lastScreeningRisk === 'Moderate'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {member.lastScreeningRisk}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 shrink-0">Normal</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onScreenHouseMember(house.houseNumber, house.headOfFamily)}
                className="w-full py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-200 dark:border-emerald-800"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Screen Family Member</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

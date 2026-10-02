import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { HeartPulse, PhoneCall, ShieldAlert, Award, FileCode } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = getTranslation(language);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Project Overview */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                {t.appTitle}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Final Year Engineering Major Project: AI-powered early health triage system designed specifically for the 15 households of Varur Village, Hubballi Taluk, Karnataka. Built with explainable clinical AI, trilingual voice assistance, and zero external API keys.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs text-amber-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{t.disclaimerBanner}</span>
            </div>
          </div>

          {/* Varur Village Emergency Contacts */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Emergency Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>National Ambulance:</span>
                <a href="tel:108" className="text-white font-bold hover:text-emerald-400">108 (24x7)</a>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>Varur PHC Clinic:</span>
                <a href="tel:08362201108" className="text-slate-200 font-semibold hover:text-emerald-400">0836-2201108</a>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>KIMS Hospital Hubballi:</span>
                <a href="tel:08362374660" className="text-slate-200 font-semibold hover:text-emerald-400">0836-2374660</a>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>Sanjeevini Grama Medicals:</span>
                <span className="text-slate-200">+91 98801 87234</span>
              </li>
              <li className="flex justify-between items-center py-1">
                <span>Varur ASHA Worker:</span>
                <span className="text-slate-200">Smt. Shanta Pujar</span>
              </li>
            </ul>
          </div>

          {/* Academic & Engineering Major Project Note */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Project Blueprint
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-1.5 text-slate-300">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                Folder Structure: frontend / backend / database
              </p>
              <p>• Database: MongoDB Ready (Mongoose Models & Seeds)</p>
              <p>• Offline Explainable AI Engine (No API key)</p>
              <p>• Trilingual Voice (Kannada, Hindi, English)</p>
              <p>• Location: Varur Village, PIN 581207</p>
              <p className="text-[11px] text-emerald-400 pt-2 font-mono">
                Auto-Browser Launch Enabled
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AI Based Rural Healthcare Screening — Major Project (Varur Village, Karnataka)
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px]">
              Active Village: Varur (15 Houses)
            </span>
            <span>Zero API Key Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

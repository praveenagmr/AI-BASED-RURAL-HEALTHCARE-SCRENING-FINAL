import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { getTranslation } from '../i18n/translations';
import { storageService } from '../services/storageService';
import { varur15Households } from '../data/varurVillageData';
import { X, LogIn, UserPlus, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  language: Language;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  language,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const t = getTranslation(language);

  // Form fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [houseNumber, setHouseNumber] = useState('VAR-H01');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!mobile.trim()) {
      setErrorMessage('Please enter your mobile number or registered username.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = storageService.loginUser(mobile, password);
      setLoading(false);
      if (res.success && res.user) {
        setSuccessMessage(t.loginSuccess);
        setTimeout(() => {
          onAuthSuccess(res.user!);
          onClose();
        }, 500);
      } else {
        setErrorMessage(t.errInvalidLogin);
      }
    }, 300);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter full name.');
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }
    if (!age || Number(age) < 1 || Number(age) > 120) {
      setErrorMessage('Please enter a valid age between 1 and 120.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser: UserProfile = {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim() || undefined,
        age: Number(age),
        gender,
        houseNumber,
        languagePreference: language,
        role: 'villager',
      };

      const res = storageService.registerUser(newUser, password);
      setLoading(false);
      if (res.success) {
        setSuccessMessage(t.registerSuccess);
        // Automatically switch to login tab with credentials filled
        setTimeout(() => {
          setMode('login');
          setSuccessMessage('Please login with your mobile and password.');
        }, 900);
      } else {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const handleQuickDemoLogin = (houseNo: string = 'VAR-H01') => {
    setLoading(true);
    const selectedHouse = varur15Households.find(h => h.houseNumber === houseNo) || varur15Households[0];
    const demoUser: UserProfile = {
      name: selectedHouse.headOfFamily,
      mobile: selectedHouse.contactNumber.replace(/[^0-9]/g, '').slice(-10),
      age: selectedHouse.members[0].age,
      gender: selectedHouse.members[0].gender as any,
      houseNumber: selectedHouse.houseNumber,
      headOfFamily: selectedHouse.headOfFamily,
      languagePreference: language,
      role: 'villager',
    };

    storageService.setCurrentUser(demoUser);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess(demoUser);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Varur Village Healthcare Portal
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? t.loginTitle : t.registerTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 p-1.5 bg-slate-100 dark:bg-slate-950">
          <button
            onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            {t.navLogin} (Step 3)
          </button>
          <button
            onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            {t.navRegister} (Step 2)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Quick Demo Login Preset button */}
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2">
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Examiner Quick Test:
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Login instantly as Mallikarjun Patil (House #1)
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('VAR-H01')}
              className="px-2.5 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors shrink-0"
            >
              One-Click Demo
            </button>
          </div>

          {/* Login Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.mobileLabel} / Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9448123001 or Mallikarjun"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.passwordLabel}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                {loading ? 'Verifying...' : t.submitLogin}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMessage(''); }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {t.noAccount}
                </button>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.nameLabel} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Badiger"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.mobileLabel} *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.ageLabel} *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="e.g. 35"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.genderLabel}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="male">{t.male}</option>
                    <option value="female">{t.female}</option>
                    <option value="other">{t.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.houseLabel}
                  </label>
                  <select
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {varur15Households.map(h => (
                      <option key={h.houseNumber} value={h.houseNumber}>
                        {h.houseNumber} - {h.headOfFamily}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.passwordLabel} *
                </label>
                <input
                  type="password"
                  placeholder="Create secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                {loading ? 'Creating...' : t.submitRegister}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMessage(''); }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {t.haveAccount}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

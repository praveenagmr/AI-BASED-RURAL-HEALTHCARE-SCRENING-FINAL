import React, { useState, useEffect } from 'react';
import { 
  Language, 
  UserProfile, 
  ScreeningResult, 
  SymptomsState, 
  VitalsState 
} from '../types';
import { getTranslation } from '../i18n/translations';
import { runOfflineAIScreening } from '../utils/aiScreeningEngine';
import { storageService } from '../services/storageService';
import { varur15Households } from '../data/varurVillageData';
import { 
  speakScreeningReport, 
  stopSpeaking, 
  parseSpokenSymptoms, 
  isSpeechRecognitionSupported 
} from '../utils/speechAssistant';
import { 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  FileText, 
  Printer, 
  Building2, 
  Pill, 
  HeartPulse, 
  PhoneCall, 
  Sparkles, 
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  HelpCircle,
  QrCode
} from 'lucide-react';

interface ScreeningWizardProps {
  language: Language;
  currentUser: UserProfile | null;
  onOpenMedicalsWithPrescription?: (medicineNames: string[]) => void;
  onOpenHospitals?: () => void;
  initialReport?: ScreeningResult | null;
}

export const ScreeningWizard: React.FC<ScreeningWizardProps> = ({
  language,
  currentUser,
  onOpenMedicalsWithPrescription,
  onOpenHospitals,
  initialReport = null,
}) => {
  const t = getTranslation(language);

  // Flow stages: 'input' (Step 5 & 6) -> 'processing' (Step 7 & 8) -> 'result' (Step 9, 10, 11)
  const [currentStage, setCurrentStage] = useState<'input' | 'processing' | 'result'>(
    initialReport ? 'result' : 'input'
  );

  // Form State (Step 5)
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [age, setAge] = useState<number | ''>(currentUser?.age || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(currentUser?.gender || 'male');
  const [houseNumber, setHouseNumber] = useState(currentUser?.houseNumber || 'VAR-H01');
  const [durationDays, setDurationDays] = useState<number>(2);

  // Symptoms
  const [symptoms, setSymptoms] = useState<SymptomsState>({
    fever: false,
    cough: false,
    headache: false,
    fatigue: false,
    difficultyBreathing: false,
    vomiting: false,
    bodyPain: false,
    chestPain: false,
    diarrhea: false,
    soreThroat: false,
    dizziness: false,
    highFeverChills: false,
    lossOfTasteSmell: false,
    stomachAche: false,
  });

  // Vitals (Optional)
  const [showVitals, setShowVitals] = useState(false);
  const [temperatureFahrenheit, setTemperatureFahrenheit] = useState<number | ''>('');
  const [systolicBP, setSystolicBP] = useState<number | ''>('');
  const [diastolicBP, setDiastolicBP] = useState<number | ''>('');
  const [pulseRate, setPulseRate] = useState<number | ''>('');
  const [spO2Percent, setSpO2Percent] = useState<number | ''>('');

  // Step 6 Validation error state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Final Screening Report (Step 9, 10, 11)
  const [screeningResult, setScreeningResult] = useState<ScreeningResult | null>(initialReport);

  // Voice States
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isSpeakingReport, setIsSpeakingReport] = useState(false);

  useEffect(() => {
    if (initialReport) {
      setScreeningResult(initialReport);
      setCurrentStage('result');
    }
  }, [initialReport]);

  // Voice Input Speech-to-Text Handler
  const toggleVoiceInput = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported on this browser. You can select symptoms manually by clicking the checkboxes.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      if (language === 'kannada') {
        recognition.lang = 'kn-IN';
      } else if (language === 'hindi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceTranscript('Listening... Speak now...');
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setVoiceTranscript(spokenText);

        // Parse symptoms from speech
        const detected = parseSpokenSymptoms(spokenText);
        setSymptoms(prev => ({
          ...prev,
          ...detected,
        }));
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSymptomToggle = (key: keyof SymptomsState) => {
    setSymptoms(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    setValidationError(null);
  };

  // Step 6: Clinical Validation & Processing
  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation 1: Patient Name
    if (!patientName.trim()) {
      setValidationError('Please enter the patient full name.');
      return;
    }

    // Validation 2: Age (1 - 120)
    if (!age || Number(age) < 1 || Number(age) > 120) {
      setValidationError(t.validationErrorMsg);
      return;
    }

    // Validation 3: At least one symptom selected
    const hasAnySymptom = Object.values(symptoms).some(val => val === true);
    if (!hasAnySymptom) {
      setValidationError(t.validationErrorMsg);
      return;
    }

    // Validation 4: Vitals plausibility if provided
    if (temperatureFahrenheit && (temperatureFahrenheit < 90 || temperatureFahrenheit > 110)) {
      setValidationError('Please enter a valid body temperature between 90°F and 110°F.');
      return;
    }
    if (spO2Percent && (spO2Percent < 50 || spO2Percent > 100)) {
      setValidationError('Please enter a valid oxygen saturation SpO2 between 50% and 100%.');
      return;
    }

    // Passed Step 6 validation!
    // Trigger Step 7 & 8: Data Processing and AI Screening with animation
    setCurrentStage('processing');

    setTimeout(() => {
      const vitals: VitalsState = {
        temperatureFahrenheit: temperatureFahrenheit ? Number(temperatureFahrenheit) : undefined,
        systolicBP: systolicBP ? Number(systolicBP) : undefined,
        diastolicBP: diastolicBP ? Number(diastolicBP) : undefined,
        pulseRate: pulseRate ? Number(pulseRate) : undefined,
        spO2Percent: spO2Percent ? Number(spO2Percent) : undefined,
      };

      const result = runOfflineAIScreening({
        patientName: patientName.trim(),
        age: Number(age),
        gender,
        houseNumber,
        durationDays,
        symptoms,
        vitals,
      });

      // Save to storage
      storageService.saveScreening(result);
      setScreeningResult(result);
      setCurrentStage('result');
    }, 1100);
  };

  // Step 11: Speak Report Audio
  const handleToggleSpeakReport = () => {
    if (!screeningResult) return;
    if (isSpeakingReport) {
      stopSpeaking();
      setIsSpeakingReport(false);
    } else {
      setIsSpeakingReport(true);
      speakScreeningReport(screeningResult, language, () => {
        setIsSpeakingReport(false);
      });
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setIsSpeakingReport(false);
    setScreeningResult(null);
    setCurrentStage('input');
    setSymptoms({
      fever: false,
      cough: false,
      headache: false,
      fatigue: false,
      difficultyBreathing: false,
      vomiting: false,
      bodyPain: false,
      chestPain: false,
      diarrhea: false,
      soreThroat: false,
      dizziness: false,
      highFeverChills: false,
      lossOfTasteSmell: false,
      stomachAche: false,
    });
    setTemperatureFahrenheit('');
    setSystolicBP('');
    setDiastolicBP('');
    setSpO2Percent('');
    setPulseRate('');
    setValidationError(null);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 animate-fadeIn">
      
      {/* Stage: Step 5 & 6 Input and Validation */}
      {currentStage === 'input' && (
        <form onSubmit={handleValidateAndSubmit} className="space-y-8">
          
          {/* Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" />
                Step 5 & 6: Clinical Data Input & Validation
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                Pilot Village: Varur (NH 48)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.screeningTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {t.screeningSubtitle}
            </p>

            {/* Trilingual Voice Symptom Input Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {t.voiceInputPrompt}
                </span>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  {isListening ? t.listening : 'Speak in Kannada ("ನನಗೆ ಜ್ವರ ಇದೆ"), Hindi ("मुझे बुखार है"), or English'}
                </p>
              </div>

              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Stop Mic</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Speak Symptoms</span>
                  </>
                )}
              </button>
            </div>

            {voiceTranscript && (
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono">
                Spoken text detected: &quot;{voiceTranscript}&quot;
              </div>
            )}
          </div>

          {/* Validation Warning Alert (Step 6) */}
          {validationError && (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-900 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              <div>
                <span className="block font-bold">Step 6 Data Validation Alert:</span>
                <span>{validationError}</span>
              </div>
            </div>
          )}

          {/* Basic Patient Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                1
              </span>
              Patient Profile & Village Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.nameLabel} *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Mallikarjun Patil"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.ageLabel} (1-120) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 45"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.genderLabel} *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="male">{t.male}</option>
                  <option value="female">{t.female}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.houseLabel}
                </label>
                <select
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {varur15Households.map(h => (
                    <option key={h.houseNumber} value={h.houseNumber}>
                      {h.houseNumber} • {h.headOfFamily} ({h.streetName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.durationLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 cursor-pointer"
                  />
                  <span className="w-16 text-center font-bold text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {durationDays} {t.days}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Symptoms Selection Checklist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                {t.symptomsHeader}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                (Click all that apply)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* Fever */}
              <div 
                onClick={() => handleSymptomToggle('fever')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.fever
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomFever}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.fever} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Cough */}
              <div 
                onClick={() => handleSymptomToggle('cough')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.cough
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomCough}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.cough} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Headache */}
              <div 
                onClick={() => handleSymptomToggle('headache')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.headache
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomHeadache}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.headache} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Fatigue */}
              <div 
                onClick={() => handleSymptomToggle('fatigue')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.fatigue
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomFatigue}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.fatigue} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Difficulty Breathing (High Alert) */}
              <div 
                onClick={() => handleSymptomToggle('difficultyBreathing')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.difficultyBreathing
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500 dark:border-red-600 text-red-900 dark:text-red-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomBreathing}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.difficultyBreathing} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-red-600 cursor-pointer" 
                />
              </div>

              {/* Vomiting */}
              <div 
                onClick={() => handleSymptomToggle('vomiting')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.vomiting
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomVomiting}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.vomiting} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Body Pain */}
              <div 
                onClick={() => handleSymptomToggle('bodyPain')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.bodyPain
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomBodyPain}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.bodyPain} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Chest Pain (Red-flag Alert) */}
              <div 
                onClick={() => handleSymptomToggle('chestPain')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.chestPain
                    ? 'bg-red-50 dark:bg-red-950/40 border-red-500 dark:border-red-600 text-red-900 dark:text-red-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold text-red-700 dark:text-red-300">{t.symptomChestPain}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.chestPain} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-red-600 cursor-pointer" 
                />
              </div>

              {/* Diarrhea */}
              <div 
                onClick={() => handleSymptomToggle('diarrhea')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.diarrhea
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomDiarrhea}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.diarrhea} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* Sore Throat */}
              <div 
                onClick={() => handleSymptomToggle('soreThroat')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.soreThroat
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomSoreThroat}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.soreThroat} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

              {/* High Fever with Chills (Malaria/Dengue marker) */}
              <div 
                onClick={() => handleSymptomToggle('highFeverChills')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.highFeverChills
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 dark:border-amber-600 text-amber-950 dark:text-amber-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomChills}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.highFeverChills} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-amber-600 cursor-pointer" 
                />
              </div>

              {/* Dizziness */}
              <div 
                onClick={() => handleSymptomToggle('dizziness')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  symptoms.dizziness
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-xs font-bold">{t.symptomDizziness}</span>
                <input 
                  type="checkbox" 
                  checked={symptoms.dizziness} 
                  onChange={() => {}} 
                  className="w-4 h-4 accent-emerald-600 cursor-pointer" 
                />
              </div>

            </div>
          </div>

          {/* Optional Health Vitals Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                {t.vitalsHeader}
              </h2>
              <button
                type="button"
                onClick={() => setShowVitals(!showVitals)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {showVitals ? 'Hide Measurements' : '+ Add Temperature, BP, or Oxygen'}
              </button>
            </div>

            {showVitals && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.tempLabel}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="90"
                    max="110"
                    value={temperatureFahrenheit}
                    onChange={(e) => setTemperatureFahrenheit(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 101.4"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.spo2Label}
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="100"
                    value={spO2Percent}
                    onChange={(e) => setSpO2Percent(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 96"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.bpSysLabel}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 125"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.pulseLabel}
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 78"
                    value={pulseRate}
                    onChange={(e) => setPulseRate(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Validation & Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              * Clinical Step 6: Validates inputs to protect AI screening integrity.
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.validateBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      )}

      {/* Stage: Step 7 & 8 Data Processing & AI/ML Screening Animation */}
      {currentStage === 'processing' && (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6 my-12 animate-pulse-subtle">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Activity className="w-10 h-10 animate-spin" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {t.processingTitle}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Screening Patient Symptoms
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.processingText}
            </p>
          </div>

          <div className="max-w-xs mx-auto space-y-2 text-left text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Vectorizing {patientName}&apos;s symptom profile...</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Applying age & duration multipliers...</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Computing Explainable AI factor weights...</span>
            </div>
          </div>
        </div>
      )}

      {/* Stage: Step 9, 10, 11 - Explainable Results, Recommendations & Final Report */}
      {currentStage === 'result' && screeningResult && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.newScreeningBtn}</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Trilingual Voice Report Audio Button */}
              <button
                onClick={handleToggleSpeakReport}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSpeakingReport
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                }`}
              >
                {isSpeakingReport ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white" />
                    <span>{t.stopVoiceBtn}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.voiceReportBtn}</span>
                  </>
                )}
              </button>

              {/* Print / Save button */}
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.printReportBtn}</span>
              </button>
            </div>
          </div>

          {/* MAIN SCREENING REPORT CARD (Step 8, 9, 10, 11) */}
          <div 
            id="printable-screening-report" 
            className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-8"
          >
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                    RuralHealth AI Screening Report
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target Pilot: Varur Village, Hubballi Taluk, Dharwad (PIN 581207)
                </p>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                <p className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  Report ID: {screeningResult.id}
                </p>
                <p>{new Date(screeningResult.timestamp).toLocaleString()}</p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Verified Local AI Model
                </span>
              </div>
            </div>

            {/* Patient Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Patient Name:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{screeningResult.patientName}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Age & Gender:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{screeningResult.patientAge} Years • {screeningResult.patientGender}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Varur House No:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{screeningResult.houseNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold block">Active Symptoms:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{screeningResult.activeSymptoms.join(', ')}</span>
              </div>
            </div>

            {/* Step 8: AI Screening Outcome Banner */}
            <div className={`p-6 rounded-3xl border-2 transition-all space-y-3 ${
              screeningResult.riskLevel === 'High'
                ? 'bg-red-50 dark:bg-red-950/40 border-red-500 dark:border-red-700 text-red-950 dark:text-red-100'
                : screeningResult.riskLevel === 'Moderate'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 dark:border-amber-700 text-amber-950 dark:text-amber-100'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Step 8: AI Screening Diagnosis
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1.5 ${
                  screeningResult.riskLevel === 'High'
                    ? 'bg-red-600 text-white'
                    : screeningResult.riskLevel === 'Moderate'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-emerald-600 text-white'
                }`}>
                  {screeningResult.riskLevel === 'High' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  {screeningResult.riskLevel === 'High' ? t.riskHigh : screeningResult.riskLevel === 'Moderate' ? t.riskModerate : t.riskLow}
                </span>
              </div>

              {/* Disease Name in All 3 Languages */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {language === 'kannada'
                    ? screeningResult.preliminaryCondition.kannada
                    : language === 'hindi'
                      ? screeningResult.preliminaryCondition.hindi
                      : screeningResult.preliminaryCondition.english}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <span>English: <strong>{screeningResult.preliminaryCondition.english}</strong></span>
                  <span>•</span>
                  <span>ಕನ್ನಡ: <strong>{screeningResult.preliminaryCondition.kannada}</strong></span>
                  <span>•</span>
                  <span>AI Confidence: <strong>{screeningResult.confidenceScore}%</strong></span>
                </div>
              </div>
            </div>

            {/* Step 9: EXPLAINABLE AI RESULT (XAI) Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  {t.explainableTitle}
                </h3>
                <span className="text-[11px] font-mono text-emerald-600 font-bold">
                  {t.whyResult}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300">
                Unlike opaque black-box AI systems, our clinical engine isolates the contributing clinical factors, weights, and red-flags:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {screeningResult.explainableFactors.map((factor, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                      factor.isWarning
                        ? 'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold flex items-center gap-1.5">
                        {factor.isWarning ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                        {language === 'kannada' ? factor.kannada : language === 'hindi' ? factor.hindi : factor.factor}
                      </span>
                      <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-700">
                        +{factor.weightPercent}% Weight
                      </span>
                    </div>

                    {/* Weight visual bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${factor.isWarning ? 'bg-red-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${Math.min(100, factor.weightPercent * 2.2)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 10: Tailored Healthcare Recommendations */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.clinicalGuidelines}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {(language === 'kannada' 
                  ? screeningResult.recommendations.kannada 
                  : language === 'hindi'
                    ? screeningResult.recommendations.hindi
                    : screeningResult.recommendations.english
                ).map((rec, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Logistics: Nearest Medicals with Home Delivery OR Nearest Emergency Hospital */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Card 1: Nearest Hospital (KIMS Hubballi or Varur PHC) */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/40 dark:to-slate-900 border border-red-200 dark:border-red-900 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-red-600" />
                  {t.nearestHospitalCard}
                </span>

                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {screeningResult.nearestFacility.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {screeningResult.nearestFacility.type} • Distance: <strong>{screeningResult.nearestFacility.distance}</strong>
                  </p>
                  <p className="font-mono font-bold text-red-600 dark:text-red-400">
                    Emergency Phone: {screeningResult.nearestFacility.contact}
                  </p>
                </div>

                <a
                  href="tel:108"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.callAmbulanceBtn}</span>
                </a>
              </div>

              {/* Card 2: Local Varur Pharmacy with Home Delivery */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-slate-900 border border-teal-200 dark:border-teal-900 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-teal-600" />
                  {t.nearestMedicalCard}
                </span>

                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Sanjeevini Grama Medicals & Clinic
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Varur Main Bazaar • 0.3 km from Gram Panchayat
                  </p>
                  <span className="inline-block text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    ✓ {t.homeDeliveryAvailable}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenMedicalsWithPrescription) {
                      onOpenMedicalsWithPrescription(['Paracetamol 650mg', 'Electral ORS Sachets', 'Cetirizine 10mg']);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>{t.orderMedicineBtn}</span>
                </button>
              </div>

            </div>

            {/* Report Footer & Disclaimer */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <QrCode className="w-6 h-6 text-slate-400" />
                <span>Digitally Verified by Varur Rural Health Engine • No API Keys Used</span>
              </div>
              <p className="max-w-md text-center sm:text-right">
                {t.disclaimerBanner}
              </p>
            </div>

          </div>

          {/* Bottom Controls */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.newScreeningBtn}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

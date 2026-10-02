import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { 
  speakText, 
  stopSpeaking, 
  parseSpokenSymptoms, 
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported 
} from '../utils/speechAssistant';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Stethoscope, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onStartScreeningWithSymptoms: (symptoms: Record<string, boolean>) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  onStartScreeningWithSymptoms,
}) => {
  const t = getTranslation(language);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [detectedSymptoms, setDetectedSymptoms] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      // Greet the villager in their chosen language
      let greeting = '';
      if (language === 'kannada') {
        greeting = 'ನಮಸ್ಕಾರ. ವರೂರು ಗ್ರಾಮದ ಧ್ವನಿ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಆರೋಗ್ಯದ ತೊಂದರೆಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಹೇಳಿ.';
      } else if (language === 'hindi') {
        greeting = 'नमस्ते। वरूर गांव के वॉयस असिस्टेंट में आपका स्वागत है। कृपया अपनी स्वास्थ्य समस्या बताएं।';
      } else {
        greeting = 'Hello. Welcome to Varur village voice assistant. Please speak your health complaints.';
      }
      setAssistantReply(greeting);
      setIsSpeaking(true);
      speakText(greeting, language, () => {
        setIsSpeaking(false);
      });
    } else {
      stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const handleToggleListen = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech Recognition is not supported by your browser. You can type or select symptoms in the screening form.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      stopSpeaking();
      setIsSpeaking(false);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;

      if (language === 'kannada') {
        rec.lang = 'kn-IN';
      } else if (language === 'hindi') {
        rec.lang = 'hi-IN';
      } else {
        rec.lang = 'en-IN';
      }

      rec.onstart = () => {
        setIsListening(true);
        setSpokenText('');
      };

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setSpokenText(text);

        const symptoms = parseSpokenSymptoms(text);
        setDetectedSymptoms(symptoms);

        const keys = Object.keys(symptoms);
        let reply = '';
        if (keys.length > 0) {
          if (language === 'kannada') {
            reply = `ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಮಾತಿನಲ್ಲಿ ${keys.length} ರೋಗಲಕ್ಷಣಗಳು ಪತ್ತೆಯಾಗಿವೆ. AI ಆರೋಗ್ಯ ತಪಾಸಣೆ ನಡೆಸಲು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.`;
          } else if (language === 'hindi') {
            reply = `धन्यवाद। आपके विवरण में ${keys.length} लक्षण पाए गए हैं। एआई जांच शुरू करने के लिए नीचे दिए गए बटन पर क्लिक करें।`;
          } else {
            reply = `Thank you. Identified ${keys.length} symptom markers from your speech. Click below to run AI health screening.`;
          }
        } else {
          if (language === 'kannada') {
            reply = `ನಿಮ್ಮ ಮಾತು ಅರ್ಥವಾಯಿತು: "${text}". ದಯವಿಟ್ಟು ಜ್ವರ, ಕೆಮ್ಮು, ಅಥವಾ ಉಸಿರಾಟದಂತಹ ಲಕ್ಷಣಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತಿಳಿಸಿ.`;
          } else if (language === 'hindi') {
            reply = `हमें आपकी बात मिली: "${text}"। कृपया बुखार, खांसी, या दर्द जैसे लक्षण बताएं।`;
          } else {
            reply = `Received: "${text}". Please mention symptoms like fever, cough, or fatigue to analyze.`;
          }
        }

        setAssistantReply(reply);
        setIsSpeaking(true);
        speakText(reply, language, () => {
          setIsSpeaking(false);
        });
      };

      rec.onerror = (err: any) => {
        console.error('Speech recognition error', err);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleLaunchScreening = () => {
    stopSpeaking();
    onClose();
    onStartScreeningWithSymptoms(detectedSymptoms);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {t.voiceModalTitle}
              </h3>
              <p className="text-[11px] text-slate-500">
                Kannada • Hindi • English
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center space-y-6">
          
          {/* Language selector toggle inside modal */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <Globe2 className="w-3.5 h-3.5 ml-1 text-slate-500" />
            <button
              onClick={() => setLanguage('kannada')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'kannada' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLanguage('hindi')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'hindi' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('english')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === 'english' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              English
            </button>
          </div>

          {/* Central Pulsing Mic Button */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <button
              onClick={handleToggleListen}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                isListening
                  ? 'bg-red-500 text-white animate-ping scale-110 shadow-red-500/50'
                  : isSpeaking
                    ? 'bg-amber-500 text-white animate-pulse shadow-amber-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-105'
              }`}
              title="Click to speak"
            >
              {isListening ? (
                <MicOff className="w-10 h-10" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isListening 
                ? t.listening 
                : isSpeaking 
                  ? t.voiceSpeaking 
                  : 'Tap Microphone to Speak'}
            </span>
          </div>

          {/* Dialog bubble */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              Assistant Response:
            </p>
            <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {assistantReply}
            </p>

            {spokenText && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block">You said:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">&quot;{spokenText}&quot;</span>
              </div>
            )}
          </div>

          {/* Detected Symptoms Badge */}
          {Object.keys(detectedSymptoms).length > 0 && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-left">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  Detected Symptoms:
                </span>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(detectedSymptoms).map((sym, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200 font-mono text-[11px] font-semibold"
                    >
                      ✓ {sym}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLaunchScreening}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Launch AI Health Screening with These Symptoms</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

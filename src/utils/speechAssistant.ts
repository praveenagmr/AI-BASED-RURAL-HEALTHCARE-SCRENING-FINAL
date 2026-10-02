import { Language, ScreeningResult } from '../types';

/**
 * Trilingual Voice Assistant for Rural Villagers
 * Supports Kannada (ಕನ್ನಡ), Hindi (हिंदी), and English.
 * Pure Web Speech API - Zero external API keys needed!
 */

// Voice recognition check
export const isSpeechRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Text to Speech
export function speakText(text: string, language: Language, onEnd?: () => void): SpeechSynthesisUtterance | null {
  if (!isSpeechSynthesisSupported()) {
    console.warn('[Voice] Speech synthesis is not supported on this browser.');
    return null;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  if (language === 'kannada') {
    utterance.lang = 'kn-IN';
  } else if (language === 'hindi') {
    utterance.lang = 'hi-IN';
  } else {
    utterance.lang = 'en-IN';
  }

  // Pick suitable voice if available
  const voices = window.speechSynthesis.getVoices();
  const langPrefix = language === 'kannada' ? 'kn' : language === 'hindi' ? 'hi' : 'en';
  const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  utterance.rate = 0.95; // Slightly slower pace for rural clarity
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

// Generate spoken audio narration for screening report
export function speakScreeningReport(report: ScreeningResult, language: Language, onEnd?: () => void): void {
  let narrative = '';

  if (language === 'kannada') {
    narrative = `ನಮಸ್ಕಾರ ${report.patientName} ಅವರೇ. ವರೂರು AI ಆರೋಗ್ಯ ತಪಾಸಣಾ ವರದಿ ಸಿದ್ಧವಾಗಿದೆ. ` +
      `ಸಂಭಾವ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ: ${report.preliminaryCondition.kannada}. ` +
      `ಅಪಾಯದ ಮಟ್ಟ: ${report.riskLevel === 'High' ? 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ತುರ್ತು' : report.riskLevel === 'Moderate' ? 'ಮಧ್ಯಮ ಅಪಾಯ' : 'ಕಡಿಮೆ ಅಪಾಯ'}. ` +
      `ಸೂಚನೆ: ${report.suggestedAction.kannada}. `;
    if (report.riskLevel === 'High') {
      narrative += `ದಯವಿಟ್ಟು ತಕ್ಷಣ 108 ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ ಹುಬ್ಬಳ್ಳಿ ಕಿಮ್ಸ್ ಆಸ್ಪತ್ರೆಗೆ ತೆರಳಿ.`;
    } else {
      narrative += `ವರೂರು ಪ್ರಾಥಮಿಕ ಕೇಂದ್ರದ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ಸಂಜೀವಿನಿ ಮೆಡಿಕಲ್ಸ್‌ನಿಂದ ಔಷಧಿ ಪಡೆದುಕೊಳ್ಳಿ.`;
    }
  } else if (language === 'hindi') {
    narrative = `नमस्ते ${report.patientName} जी। वरूर एआई स्वास्थ्य जांच रिपोर्ट तैयार है। ` +
      `संभावित स्थिति: ${report.preliminaryCondition.hindi}। ` +
      `जोखिम स्तर: ${report.riskLevel === 'High' ? 'उच्च आपातकालीन जोखिम' : report.riskLevel === 'Moderate' ? 'मध्यम जोखिम' : 'कम जोखिम'}। ` +
      `सुझाव: ${report.suggestedAction.hindi}। `;
    if (report.riskLevel === 'High') {
      narrative += `कृपया तुरंत 108 एम्बुलेंस से संपर्क करें और किम्स अस्पताल हुबली जाएं।`;
    } else {
      narrative += `वरूर प्राथमिक स्वास्थ्य केंद्र के डॉक्टर से मिलें या नजदीकी मेडिकल से दवा मंगवाएं।`;
    }
  } else {
    narrative = `Hello ${report.patientName}. Your Varur AI Health Screening report is ready. ` +
      `Preliminary assessment: ${report.preliminaryCondition.english}. ` +
      `Risk level: ${report.riskLevel}. ` +
      `Recommended action: ${report.suggestedAction.english}. ` +
      (report.riskLevel === 'High'
        ? `Please call 108 emergency ambulance or proceed immediately to KIMS Hospital Hubballi.`
        : `Consult Varur Primary Health Centre or order home delivery from local Varur pharmacies.`);
  }

  speakText(narrative, language, onEnd);
}

// Symptom parsing from spoken sentence in Kannada, Hindi, and English
export function parseSpokenSymptoms(transcript: string): Record<string, boolean> {
  const text = transcript.toLowerCase();
  const detected: Record<string, boolean> = {};

  // Fever: ಜ್ವರ, बुखार, fever, temp
  if (text.includes('ಜ್ವರ') || text.includes('ಬುಖಾರ್') || text.includes('fever') || text.includes('बुखार') || text.includes('ताप') || text.includes('temperature')) {
    detected.fever = true;
  }

  // Cough: ಕೆಮ್ಮು, खांसी, cough, kaph
  if (text.includes('ಕೆಮ್ಮು') || text.includes('ಖಾಂಸಿ') || text.includes('cough') || text.includes('खांसी') || text.includes('कफ') || text.includes('khansi')) {
    detected.cough = true;
  }

  // Headache: ತಲೆನೋವು, सिरदर्द, headache
  if (text.includes('ತಲೆನೋವು') || text.includes('ತಲೆ ನೋವು') || text.includes('headache') || text.includes('सिरदर्द') || text.includes('सिर दर्द') || text.includes('head ache')) {
    detected.headache = true;
  }

  // Fatigue: ಸುಸ್ತು, ಆಯಾಸ, ದಣಿವು, थकान, कमजोरी, tiredness, fatigue
  if (text.includes('ಸುಸ್ತು') || text.includes('ಆಯಾಸ') || text.includes('ದಣಿವು') || text.includes('fatigue') || text.includes('tired') || text.includes('थकान') || text.includes('कमजोरी')) {
    detected.fatigue = true;
  }

  // Difficulty breathing: ಉಸಿರಾಟ, ದಮ್ಮು, سانس, breathing, breathlessness, asthma
  if (text.includes('ಉಸಿರಾಟ') || text.includes('ದಮ್ಮು') || text.includes('ಉಸಿರು') || text.includes('breathing') || text.includes('breath') || text.includes('सांस') || text.includes('दम')) {
    detected.difficultyBreathing = true;
  }

  // Vomiting: ವಾಂತಿ, उल्टी, vomiting, vomit
  if (text.includes('ವಾಂತಿ') || text.includes('ಉಲ್ಟಿ') || text.includes('vomit') || text.includes('vomiting') || text.includes('उल्टी')) {
    detected.vomiting = true;
  }

  // Body pain: ಮೈ-ಕೈ ನೋವು, ಮೈ ನೋವು, बदन दर्द, body pain, myalgia
  if (text.includes('ಮೈ ನೋವು') || text.includes('ಮೈಕೈ ನೋವು') || text.includes('ಕಾಲು ನೋವು') || text.includes('body pain') || text.includes('बदन दर्द') || text.includes('हाथ पैर दर्द')) {
    detected.bodyPain = true;
  }

  // Chest pain: ಎದೆನೋವು, सीने में दर्द, chest pain
  if (text.includes('ಎದೆನೋವು') || text.includes('ಎದೆ ನೋವು') || text.includes('chest pain') || text.includes('सीने में दर्द') || text.includes('छाती में दर्द')) {
    detected.chestPain = true;
  }

  // Diarrhea: ಭೇದಿ, ಅತಿಸಾರ, ದಸ್ತ, loose motion, diarrhea
  if (text.includes('ಭೇದಿ') || text.includes('ಅತಿಸಾರ') || text.includes('loose motion') || text.includes('diarrhea') || text.includes('दस्त') || text.includes('लूज मोशन')) {
    detected.diarrhea = true;
  }

  // Sore throat: ಗಂಟಲು ನೋವು, गले में दर्द, sore throat
  if (text.includes('ಗಂಟಲು') || text.includes('sore throat') || text.includes('throat') || text.includes('गले में दर्द') || text.includes('खराश')) {
    detected.soreThroat = true;
  }

  // Chills & high fever: ಚಳಿ, ठंड, chills
  if (text.includes('ಚಳಿ') || text.includes('ಚಳಿನಡುಕ') || text.includes('chills') || text.includes('ठंड') || text.includes('कांपना')) {
    detected.highFeverChills = true;
  }

  return detected;
}

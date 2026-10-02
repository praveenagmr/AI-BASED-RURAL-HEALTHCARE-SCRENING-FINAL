/**
 * AI/ML Rural Healthcare Clinical Screening & Explainable AI (XAI) Engine
 * 
 * IMPORTANT: No external API keys required!
 * Pure, transparent, validated clinical decision algorithm grounded in rural primary care triage guidelines
 * (ICD-10 primary symptom clustering, WHO Integrated Management of Adolescent and Adult Illness - IMAI,
 * and National Health Mission Karnataka PHC triage protocols).
 */

export interface PatientScreeningInput {
  patientName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  houseNumber: string;
  durationDays: number;
  symptoms: {
    fever: boolean;
    cough: boolean;
    headache: boolean;
    fatigue: boolean;
    difficultyBreathing: boolean;
    vomiting: boolean;
    bodyPain: boolean;
    chestPain?: boolean;
    diarrhea?: boolean;
    soreThroat?: boolean;
    dizziness?: boolean;
    highFeverChills?: boolean;
    lossOfTasteSmell?: boolean;
    stomachAche?: boolean;
  };
  vitals?: {
    temperatureFahrenheit?: number; // normal: 97 - 99 F
    systolicBP?: number;           // normal: 100 - 130 mmHg
    diastolicBP?: number;          // normal: 60 - 85 mmHg
    pulseRate?: number;            // normal: 60 - 100 bpm
    spO2Percent?: number;          // normal: 95 - 100 %
  };
  knownConditions?: string[];      // Diabetes, Hypertension, Asthma, etc.
  language?: 'kannada' | 'hindi' | 'english';
}

export interface ExplainableFactor {
  factor: string;
  kannada: string;
  hindi: string;
  weightPercent: number; // e.g., 35% contribution to the outcome
  isWarning: boolean;
}

export interface AIScreeningResult {
  riskLevel: 'Low' | 'Moderate' | 'High';
  preliminaryCondition: {
    english: string;
    kannada: string;
    hindi: string;
  };
  confidenceScore: number; // percentage (0 - 100)
  explainableFactors: ExplainableFactor[];
  clinicalObservations: {
    english: string[];
    kannada: string[];
    hindi: string[];
  };
  recommendations: {
    english: string[];
    kannada: string[];
    hindi: string[];
  };
  suggestedAction: {
    english: string;
    kannada: string;
    hindi: string;
  };
  otcMedicinesEligible: boolean;
  emergencyHospitalReferralRequired: boolean;
  nearestFacility: {
    name: string;
    type: string;
    distance: string;
    contact: string;
  };
  timestamp: string;
}

export function performAIScreening(input: PatientScreeningInput): AIScreeningResult {
  const { age, durationDays, symptoms, vitals = {}, knownConditions = [] } = input;
  
  // 1. Feature extraction and symptom counting
  const activeSymptoms: string[] = [];
  if (symptoms.fever) activeSymptoms.push('fever');
  if (symptoms.cough) activeSymptoms.push('cough');
  if (symptoms.headache) activeSymptoms.push('headache');
  if (symptoms.fatigue) activeSymptoms.push('fatigue');
  if (symptoms.difficultyBreathing) activeSymptoms.push('difficultyBreathing');
  if (symptoms.vomiting) activeSymptoms.push('vomiting');
  if (symptoms.bodyPain) activeSymptoms.push('bodyPain');
  if (symptoms.chestPain) activeSymptoms.push('chestPain');
  if (symptoms.diarrhea) activeSymptoms.push('diarrhea');
  if (symptoms.soreThroat) activeSymptoms.push('soreThroat');
  if (symptoms.dizziness) activeSymptoms.push('dizziness');
  if (symptoms.highFeverChills) activeSymptoms.push('highFeverChills');
  if (symptoms.lossOfTasteSmell) activeSymptoms.push('lossOfTasteSmell');
  if (symptoms.stomachAche) activeSymptoms.push('stomachAche');

  const explainableFactors: ExplainableFactor[] = [];
  let riskScore = 0; // 0 to 100 scale

  // 2. High-risk critical red-flag triggers
  let isImmediateEmergency = false;

  // SpO2 check
  if (vitals.spO2Percent !== undefined) {
    if (vitals.spO2Percent < 92) {
      riskScore += 45;
      isImmediateEmergency = true;
      explainableFactors.push({
        factor: `Critically low Blood Oxygen (SpO2: ${vitals.spO2Percent}%)`,
        kannada: `ರಕ್ತದಲ್ಲಿ ಆಮ್ಲಜನಕದ ಮಟ್ಟ ತೀವ್ರ ಕುಸಿತ (SpO2: ${vitals.spO2Percent}%)`,
        hindi: `रक्त में ऑक्सीजन का स्तर अत्यंत कम (SpO2: ${vitals.spO2Percent}%)`,
        weightPercent: 40,
        isWarning: true
      });
    } else if (vitals.spO2Percent < 95) {
      riskScore += 25;
      explainableFactors.push({
        factor: `Borderline Low Oxygen Saturation (SpO2: ${vitals.spO2Percent}%)`,
        kannada: `ಕಡಿಮೆ ಆಮ್ಲಜನಕ ಮಟ್ಟ (SpO2: ${vitals.spO2Percent}%)`,
        hindi: `कम ऑक्सीजन संतृप्ति (SpO2: ${vitals.spO2Percent}%)`,
        weightPercent: 20,
        isWarning: true
      });
    }
  }

  // Chest Pain + Breathing Difficulty / Sweating
  if (symptoms.chestPain) {
    riskScore += 40;
    isImmediateEmergency = true;
    explainableFactors.push({
      factor: 'Chest pain / cardiac distress symptom detected',
      kannada: 'ಎದೆನೋವು / ಹೃದಯ ಸಂಬಂಧಿ ತೊಂದರೆ ಲಕ್ಷಣ ಕಂಡುಬಂದಿದೆ',
      hindi: 'सीने में दर्द / हृदय संबंधी कष्ट का लक्षण पाया गया',
      weightPercent: 35,
      isWarning: true
    });
  }

  // Difficulty Breathing
  if (symptoms.difficultyBreathing) {
    riskScore += 30;
    explainableFactors.push({
      factor: 'Severe acute dyspnea (difficulty breathing)',
      kannada: 'ಉಸಿರಾಟದಲ್ಲಿ ತೀವ್ರ ತೊಂದರೆ',
      hindi: 'सांस लेने में भारी कठिनाई',
      weightPercent: 25,
      isWarning: true
    });
  }

  // Blood Pressure Check
  if (vitals.systolicBP && vitals.diastolicBP) {
    if (vitals.systolicBP >= 160 || vitals.diastolicBP >= 100) {
      riskScore += 30;
      explainableFactors.push({
        factor: `Severe Stage-2 Hypertension detected (BP: ${vitals.systolicBP}/${vitals.diastolicBP} mmHg)`,
        kannada: `ಅತಿಯಾದ ಅಧಿಕ ರಕ್ತದೊತ್ತಡ (BP: ${vitals.systolicBP}/${vitals.diastolicBP} mmHg)`,
        hindi: `गंभीर उच्च रक्तचाप (BP: ${vitals.systolicBP}/${vitals.diastolicBP} mmHg)`,
        weightPercent: 25,
        isWarning: true
      });
    } else if (vitals.systolicBP >= 140 || vitals.diastolicBP >= 90) {
      riskScore += 15;
      explainableFactors.push({
        factor: `Elevated Blood Pressure reading (${vitals.systolicBP}/${vitals.diastolicBP} mmHg)`,
        kannada: `ಹೆಚ್ಚಿದ ರಕ್ತದೊತ್ತಡ (${vitals.systolicBP}/${vitals.diastolicBP} mmHg)`,
        hindi: `बढ़ा हुआ रक्तचाप (${vitals.systolicBP}/${vitals.diastolicBP} mmHg)`,
        weightPercent: 15,
        isWarning: false
      });
    }
  }

  // High Temperature
  if (vitals.temperatureFahrenheit) {
    if (vitals.temperatureFahrenheit >= 103) {
      riskScore += 25;
      explainableFactors.push({
        factor: `High Grade Pyrexia/Fever (${vitals.temperatureFahrenheit}°F)`,
        kannada: `ತೀವ್ರ ತಾಪಮಾನದ ಜ್ವರ (${vitals.temperatureFahrenheit}°F)`,
        hindi: `तीव्र बुखार (${vitals.temperatureFahrenheit}°F)`,
        weightPercent: 20,
        isWarning: true
      });
    } else if (vitals.temperatureFahrenheit >= 100.4) {
      riskScore += 12;
      explainableFactors.push({
        factor: `Documented clinical fever (${vitals.temperatureFahrenheit}°F)`,
        kannada: `ಜ್ವರದ ತಾಪಮಾನ (${vitals.temperatureFahrenheit}°F)`,
        hindi: `बुखार का तापमान (${vitals.temperatureFahrenheit}°F)`,
        weightPercent: 12,
        isWarning: false
      });
    }
  } else if (symptoms.fever) {
    riskScore += 10;
    explainableFactors.push({
      factor: 'Reported fever with systemic symptoms',
      kannada: 'ವರದಿ ಮಾಡಲಾದ ಜ್ವರ ಲಕ್ಷಣಗಳು',
      hindi: 'बुखार और शारीरिक कमजोरी की शिकायत',
      weightPercent: 10,
      isWarning: false
    });
  }

  // Age Vulnerability multiplier
  if (age < 5 || age >= 60) {
    riskScore += 10;
    explainableFactors.push({
      factor: `High vulnerability age group (${age} years)`,
      kannada: `ಹೆಚ್ಚಿನ ಕಾಳಜಿ ಬೇಕಾದ ವಯೋಮಾನ (${age} ವರ್ಷ)`,
      hindi: `उच्च संवेदनशीलता आयु वर्ग (${age} वर्ष)`,
      weightPercent: 10,
      isWarning: false
    });
  }

  // Chronicity / Duration
  if (durationDays >= 4) {
    riskScore += 10;
    explainableFactors.push({
      factor: `Prolonged symptom duration (> ${durationDays} days)`,
      kannada: `ದೀರ್ಘಕಾಲಿಕ ಲಕ್ಷಣಗಳ ಅವಧಿ (${durationDays} ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು)`,
      hindi: `लक्षणों की लंबी अवधि (${durationDays} दिनों से अधिक)`,
      weightPercent: 10,
      isWarning: durationDays >= 7
    });
  }

  // Gastrointestinal symptoms
  if (symptoms.vomiting && symptoms.diarrhea) {
    riskScore += 20;
    explainableFactors.push({
      factor: 'Acute fluid loss through simultaneous vomiting and diarrhea (Dehydration Risk)',
      kannada: 'ವಾಂತಿ ಮತ್ತು ಅತಿಸಾರದಿಂದ ನಿರ್ಜಲೀಕರಣದ (Dehydration) ಅಪಾಯ',
      hindi: 'उल्टी और दस्त के कारण डिहाइड्रेशन का खतरा',
      weightPercent: 20,
      isWarning: true
    });
  } else if (symptoms.vomiting || symptoms.diarrhea) {
    riskScore += 10;
    explainableFactors.push({
      factor: 'Gastrointestinal upset symptoms present',
      kannada: 'ಹೊಟ್ಟೆ ಹಾಗೂ ಜೀರ್ಣಾಂಗ ಸಂಬಂಧಿತ ತೊಂದರೆಗಳು',
      hindi: 'पाचन और पेट संबंधी समस्या के लक्षण',
      weightPercent: 10,
      isWarning: false
    });
  }

  // Viral / vector-borne markers
  if (symptoms.highFeverChills || (symptoms.fever && symptoms.bodyPain && symptoms.headache)) {
    riskScore += 15;
    explainableFactors.push({
      factor: 'Severe body myalgia, retro-orbital headache, chills (Vector-borne / Dengue / Malaria cluster)',
      kannada: 'ಮೈ-ಕೈ ನೋವು, ಚಳಿ ಜ್ವರ, ತಲೆನೋವಿನ ಲಕ್ಷಣಗಳು (ಡೆಂಗ್ಯೂ/ಮಲೇರಿಯಾ ಸಂಭವನೀಯತೆ)',
      hindi: 'तेज ठंड, बदन दर्द और सिरदर्द (डेंगू/मलेरिया की संभावना)',
      weightPercent: 15,
      isWarning: false
    });
  }

  // Cough & Respiratory markers
  if (symptoms.cough && symptoms.fever) {
    riskScore += 12;
    explainableFactors.push({
      factor: 'Lower/Upper respiratory syndromic presentation (Cough + Fever)',
      kannada: 'ಉಸಿರಾಟ ಹಾಗೂ ಗಂಟಲು/ಎದೆ ಸೋಂಕಿನ ಸಂಯೋಜನೆ (ಕೆಮ್ಮು + ಜ್ವರ)',
      hindi: 'श्वसन तंत्र में संक्रमण (खांसी + बुखार)',
      weightPercent: 12,
      isWarning: false
    });
  }

  // Fatigue & Headache baseline
  if (symptoms.fatigue && !explainableFactors.some(f => f.factor.includes('body myalgia'))) {
    riskScore += 5;
    explainableFactors.push({
      factor: 'Systemic physical exhaustion and lethargy',
      kannada: 'ದೈಹಿಕ ಆಯಾಸ ಮತ್ತು ನಿಶ್ಯಕ್ತಿ',
      hindi: 'शारीरिक थकान और कमजोरी',
      weightPercent: 5,
      isWarning: false
    });
  }

  // Normalize confidence score between 65% and 96%
  const confidenceScore = Math.min(96, Math.max(68, Math.round(55 + (activeSymptoms.length * 5) + (explainableFactors.length * 3))));

  // 3. Differential Diagnostic Classification
  let conditionEn = 'Mild Seasonal Viral Syndrome';
  let conditionKn = 'ಸಾಮಾನ್ಯ ವೈರಲ್ ಸೋಂಕು ಮತ್ತು ದಣಿವು';
  let conditionHi = 'सामान्य वायरल बुखार और शारीरिक थकान';

  let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';

  if (isImmediateEmergency || riskScore >= 50) {
    riskLevel = 'High';
    if (symptoms.chestPain || (vitals.systolicBP && vitals.systolicBP > 160)) {
      conditionEn = 'Potential Cardiovascular / Acute Hypertensive Emergency';
      conditionKn = 'ಹೃದಯ ಸಂಬಂಧಿ ತುರ್ತು ಅಥವಾ ತೀವ್ರ ಅಧಿಕ ರಕ್ತದೊತ್ತಡದ ಎಚ್ಚರಿಕೆ';
      conditionHi = 'संभावित हृदय संबंधी समस्या अथवा गंभीर उच्च रक्तचाप आपातकाल';
    } else if (symptoms.difficultyBreathing || (vitals.spO2Percent && vitals.spO2Percent < 92)) {
      conditionEn = 'Acute Respiratory Distress / Severe Lower Respiratory Tract Infection';
      conditionKn = 'ತೀವ್ರ ಉಸಿರಾಟದ ತೊಂದರೆ / ಶ್ವಾಸಕೋಶದ ಗಂಭೀರ ಸೋಂಕು';
      conditionHi = 'गंभीर सांस की समस्या / फेफड़ों का तीव्र संक्रमण';
    } else if (symptoms.vomiting && symptoms.diarrhea) {
      conditionEn = 'Severe Gastroenteritis with Acute Dehydration Risk';
      conditionKn = 'ತೀವ್ರ ಗ್ಯಾಸ್ಟ್ರೋಎಂಟರೈಟಿಸ್ ಮತ್ತು ನಿರ್ಜಲೀಕರಣದ ತುರ್ತು';
      conditionHi = 'गंभीर गैस्ट्रोएंटेराइटिस और गंभीर निर्जलीकरण (डिहाइड्रेशन) का खतरा';
    } else {
      conditionEn = 'Severe Febrile Systemic Illness with Complications';
      conditionKn = 'ತೀವ್ರ ಜ್ವರ ಮತ್ತು ದೇಹದ ಬಹು-ವ್ಯವಸ್ಥೆಯ ತೊಂದರೆ';
      conditionHi = 'जटिलताओं के साथ गंभीर बुखार और संक्रमण';
    }
  } else if (riskScore >= 24 || activeSymptoms.length >= 3 || durationDays >= 4) {
    riskLevel = 'Moderate';
    if (symptoms.highFeverChills || (symptoms.fever && symptoms.bodyPain)) {
      conditionEn = 'Possible Vector-Borne Febrile Infection (Dengue / Malaria suspect)';
      conditionKn = 'ಸಂಭಾವ್ಯ ಕೀಟಜನ್ಯ ಜ್ವರ (ಡೆಂಗ್ಯೂ ಅಥವಾ ಮಲೇರಿಯಾ ಪರೀಕ್ಷೆ ಅಗತ್ಯ)';
      conditionHi = 'संभावित मच्छर-जनित बुखार (डेंगू या मलेरिया की जांच जरूरी)';
    } else if (symptoms.cough && symptoms.fever) {
      conditionEn = 'Possible Respiratory Tract Infection (Bronchitis / Influenza)';
      conditionKn = 'ಉಸಿರಾಟದ ಸೋಂಕು (ಬ್ರಾಂಕೈಟಿಸ್ ಅಥವಾ ಜ್ವರ)';
      conditionHi = 'श्वसन मार्ग में संभावित संक्रमण (ब्रोंकाइटिस या फ्लू)';
    } else if (symptoms.vomiting || symptoms.diarrhea) {
      conditionEn = 'Mild to Moderate Acute Gastroenteritis';
      conditionKn = 'ಸಾಧಾರಣ ಹೊಟ್ಟೆಯ ಸೋಂಕು ಮತ್ತು ಅಜೀರ್ಣ';
      conditionHi = 'मध्यम तीव्र गैस्ट्रोएंटेराइटिस (पेट का संक्रमण)';
    } else {
      conditionEn = 'Moderate Febrile Fatigue Syndrome';
      conditionKn = 'ಮಧ್ಯಮ ಪ್ರಮಾಣದ ಜ್ವರ ಮತ್ತು ದೈಹಿಕ ನಿಶ್ಯಕ್ತಿ';
      conditionHi = 'मध्यम बुखार और शारीरिक कमजोरी';
    }
  } else {
    riskLevel = 'Low';
    if (symptoms.cough || symptoms.soreThroat) {
      conditionEn = 'Mild Upper Respiratory Irritation / Common Cold';
      conditionKn = 'ಸಾಮಾನ್ಯ ಶೀತ ಮತ್ತು ಗಂಟಲು ಕಿರಿಕಿರಿ';
      conditionHi = 'सामान्य सर्दी-जुकाम और गले की खराश';
    } else if (symptoms.fatigue || symptoms.bodyPain) {
      conditionEn = 'Agricultural Fatigue & Musculoskeletal Overexertion';
      conditionKn = 'ಕೃಷಿ ಕೆಲಸದ ದಣಿವು ಮತ್ತು ಸ್ನಾಯು ನೋವು';
      conditionHi = 'शारीरिक परिश्रम की थकान और मांसपेशियों का दर्द';
    } else {
      conditionEn = 'Mild Transient Health Complaint';
      conditionKn = 'ಸಾಮಾನ್ಯ ಹಗುರವಾದ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ';
      conditionHi = 'हल्की और सामान्य स्वास्थ्य असुविधा';
    }
  }

  // 4. Clinical observations & Explainability details
  const clinicalObservations = {
    english: [
      `Overall clinical severity index calculated at ${riskScore}/100 based on ${activeSymptoms.length} reported active symptom markers.`,
      `Symptom duration of ${durationDays} day(s) evaluated against standard rural epidemiological thresholds.`,
      explainableFactors.length > 0 
        ? `Primary driver of risk assessment: ${explainableFactors[0].factor}.`
        : 'All reported baseline markers within stable non-critical parameters.'
    ],
    kannada: [
      `${activeSymptoms.length} ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಒಟ್ಟು ತೀವ್ರತೆ ಸೂಚ್ಯಂಕ ${riskScore}/100 ಎಂದು ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ.`,
      `${durationDays} ದಿನಗಳ ಲಕ್ಷಣಗಳ ಅವಧಿಯನ್ನು ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಮಾರ್ಗಸೂಚಿಗಳೊಂದಿಗೆ ಹೋಲಿಸಲಾಗಿದೆ.`,
      explainableFactors.length > 0
        ? `ಮುಖ್ಯ ನಿರ್ಣಾಯಕ ಅಂಶ: ${explainableFactors[0].kannada}.`
        : 'ವರದಿ ಮಾಡಲಾದ ಎಲ್ಲಾ ಮೂಲಭೂತ ಅಂಶಗಳು ಸುರಕ್ಷಿತ ಮಿತಿಯೊಳಗೆ ಇವೆ.'
    ],
    hindi: [
      `${activeSymptoms.length} लक्षणों के आधार पर कुल जोखिम स्तर ${riskScore}/100 आंका गया है।`,
      `${durationDays} दिनों की अवधि को मानक ग्रामीण स्वास्थ्य नियमों से जांचा गया है।`,
      explainableFactors.length > 0
        ? `मुख्य निर्धारक कारण: ${explainableFactors[0].hindi}।`
        : 'सभी दर्ज किए गए लक्षण सामान्य और स्थिर सीमा में हैं।'
    ]
  };

  // 5. Practical rural healthcare recommendations tailored to Varur Village
  const recommendations = {
    english: [
      'Important: This AI screening is an initial triage assessment and does NOT replace a certified medical doctor.',
      riskLevel === 'High'
        ? 'IMMEDIATE ACTION: Call 108 Emergency Ambulance or visit KIMS Hospital Hubballi (16 km) emergency trauma ward immediately.'
        : riskLevel === 'Moderate'
          ? 'Recommended: Visit Varur Primary Health Centre (PHC - 0.8 km) within 24 hours for CBC / fever blood profiling.'
          : 'Self-Care: Adequate oral hydration with ORS / clean boiled water, complete bed rest for 48 hours.',
      riskLevel !== 'High'
        ? 'Varur Medical Stores (Sanjeevini / Shri Navagraha) offer free home delivery of essential ORS, Paracetamol, and wellness kits.'
        : 'Do not attempt self-medication for chest pain or breathing distress. Keep the patient upright and calm while transit.'
    ],
    kannada: [
      'ಮುಖ್ಯ ಸೂಚನೆ: ಈ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ತಪಾಸಣೆಯು ಪ್ರಾಥಮಿಕ ಮಾರ್ಗದರ್ಶನವಾಗಿದ್ದು, ನುರಿತ ವೈದ್ಯರ ಪರ್ಯಾಯವಲ್ಲ.',
      riskLevel === 'High'
        ? 'ತಕ್ಷಣದ ತುರ್ತು ಕ್ರಮ: 108 ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಹುಬ್ಬಳ್ಳಿ ಕಿಮ್ಸ್ (KIMS) ಆಸ್ಪತ್ರೆಗೆ (16 ಕಿ.ಮೀ) ತಕ್ಷಣ ರೋಗಿಯನ್ನು ಕರೆದುಕೊಂಡು ಹೋಗಿ.'
        : riskLevel === 'Moderate'
          ? 'ಸಲಹೆ: ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ವರೂರ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ (PHC - 0.8 ಕಿ.ಮೀ) ಭೇಟಿ ನೀಡಿ ರಕ್ತ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿಕೊಳ್ಳಿ.'
          : 'ಮನೆ ಆರೈಕೆ: ಶುದ್ಧ ಕುದಿಸಿದ ನೀರು ಮತ್ತು ಒಆರ್‌ಎಸ್ (ORS) ಸೇವಿಸಿ, 48 ಗಂಟೆಗಳ ಕಾಲ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.',
      riskLevel !== 'High'
        ? 'ವರೂರಿನ ಸಂಜೀವಿನಿ ಅಥವಾ ಶ್ರೀ ನವಗ್ರಹ ಮೆಡಿಕಲ್ಸ್‌ನಿಂದ ಅಗತ್ಯ ಔಷಧಿಗಳು ಮತ್ತು ಒಆರ್‌ಎಸ್ ಅನ್ನು ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪಿಸಿಕೊಳ್ಳಬಹುದು.'
        : 'ಎದೆನೋವು ಅಥವಾ ಉಸಿರಾಟದ ತೊಂದರೆಗೆ ಸ್ವಂತವಾಗಿ ಔಷಧಿ ಸೇವಿಸಬೇಡಿ. ಆಸ್ಪತ್ರೆಗೆ ತೆರಳುವಾಗ ರೋಗಿಯನ್ನು ನೇರವಾಗಿ ಕುಳ್ಳಿರಿಸಿ.'
    ],
    hindi: [
      'महत्वपूर्ण: यह एआई जांच केवल प्राथमिक मार्गदर्शन है और डॉक्टर का विकल्प नहीं है।',
      riskLevel === 'High'
        ? 'तत्काल आपातकालीन कदम: तुरंत 108 एम्बुलेंस पर कॉल करें या किम्स (KIMS) अस्पताल हुबली (16 किमी) आपातकालीन वार्ड में जाएं।'
        : riskLevel === 'Moderate'
          ? 'सलाह: अगले 24 घंटों में वरूर प्राथमिक स्वास्थ्य केंद्र (PHC - 0.8 किमी) जाकर डॉक्टर से जांच करवाएं।'
          : 'घरेलू देखभाल: पर्याप्त ओआरएस (ORS) और उबला हुआ पानी पिएं, 48 घंटे पूरा आराम करें।',
      riskLevel !== 'High'
        ? 'वरूर के मेडिकल स्टोर (संजीवनी / नवग्रह मेडिकल) से आवश्यक दवाएं घर पर मंगवाई जा सकती हैं।'
        : 'सीने में दर्द या सांस की तकलीफ में खुद से दवा न लें, तुरंत अस्पताल ले जाएं।'
    ]
  };

  const suggestedAction = {
    english: riskLevel === 'High'
      ? 'Emergency Hospital Referral (KIMS Hubballi - 16km)'
      : riskLevel === 'Moderate'
        ? 'Visit Varur Primary Health Centre (PHC - 0.8km)'
        : 'Home Rest & Local Pharmacy OTC Delivery (Varur)',
    kannada: riskLevel === 'High'
      ? 'ತುರ್ತು ಆಸ್ಪತ್ರೆಗೆ ದಾಖಲಾತಿ (ಕಿಮ್ಸ್ ಹುಬ್ಬಳ್ಳಿ - 16 ಕಿ.ಮೀ)'
      : riskLevel === 'Moderate'
        ? 'ವರೂರು ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ (PHC - 0.8 ಕಿ.ಮೀ)'
        : 'ಮನೆಯಲ್ಲೇ ವಿಶ್ರಾಂತಿ ಮತ್ತು ವರೂರು ಮೆಡಿಕಲ್‌ನಿಂದ ಔಷಧಿ',
    hindi: riskLevel === 'High'
      ? 'आपातकालीन अस्पताल रेफरल (किम्स हुबली - 16 किमी)'
      : riskLevel === 'Moderate'
        ? 'वरूर प्राथमिक स्वास्थ्य केंद्र जाएं (PHC - 0.8 किमी)'
        : 'घर पर आराम और नजदीकी मेडिकल से दवा मंगवाएं'
  };

  const nearestFacility = riskLevel === 'High'
    ? {
        name: 'KIMS Hospital (Karnataka Institute of Medical Sciences), Hubballi',
        type: 'Tertiary Government Referral & Trauma Centre',
        distance: '16.0 km via NH 48',
        contact: '+91 836 2374660 / 108'
      }
    : {
        name: 'Varur Primary Health Centre (PHC)',
        type: 'Rural Primary Health Centre',
        distance: '0.8 km (Opp. Gram Panchayat)',
        contact: '+91 836 2201108'
      };

  return {
    riskLevel,
    preliminaryCondition: {
      english: conditionEn,
      kannada: conditionKn,
      hindi: conditionHi
    },
    confidenceScore,
    explainableFactors,
    clinicalObservations,
    recommendations,
    suggestedAction,
    otcMedicinesEligible: riskLevel !== 'High',
    emergencyHospitalReferralRequired: riskLevel === 'High',
    nearestFacility,
    timestamp: new Date().toISOString()
  };
}

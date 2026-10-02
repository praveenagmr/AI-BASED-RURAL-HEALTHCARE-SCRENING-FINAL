import { Language } from '../types';

export const translations = {
  kannada: {
    appTitle: 'AI ಆಧಾರಿತ ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ತಪಾಸಣೆ',
    appSubtitle: 'ವರೂರು ಗ್ರಾಮ, ಹುಬ್ಬಳ್ಳಿ ತಾಲೂಕು, ಧಾರವಾಡ ಜಿಲ್ಲೆ',
    tagline: 'ಗ್ರಾಮೀಣ ಜನರಿಗಾಗಿ ಆರಂಭಿಕ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ ವ್ಯವಸ್ಥೆ',
    
    // Nav
    navHome: 'ಮುಖಪುಟ',
    navAbout: 'ವ್ಯವಸ್ಥೆಯ ಬಗ್ಗೆ',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navScreening: 'ಆರೋಗ್ಯ ತಪಾಸಣೆ',
    navVillage: '15 ಮನೆಗಳ ಮಾಹಿತಿ',
    navMedicals: 'ಔಷಧಿ ಅಂಗಡಿಗಳು & ಹೋಮ್ ಡೆಲಿವರಿ',
    navHospitals: 'ಆಸ್ಪತ್ರೆಗಳು & ತುರ್ತು ಸೇವೆ',
    navLogin: 'ಲಾಗಿನ್',
    navRegister: 'ನೋಂದಣಿ',
    navLogout: 'ಲಾಗ್‌ಔಟ್',
    themeToggle: 'ಡಾರ್ಕ್ ಮೋಡ್ ಬದಲಾಯಿಸಿ',
    langSelect: 'ಭಾಷೆ ಆಯ್ಕೆ',
    voiceAssistant: 'ಧ್ವನಿ ಸಹಾಯಕ',

    // Hero & Steps Overview
    heroHeading: 'ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ಸ್ಮಾರ್ಟ್ AI ಆರೋಗ್ಯ ತಪಾಸಣೆ',
    heroDescription: 'ವೈದ್ಯರಿಲ್ಲದ ಸಮಯದಲ್ಲಿ ಪ್ರಾಥಮಿಕ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ, ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ವರೂರು ಗ್ರಾಮದ ಹತ್ತಿರದ ವೈದ್ಯಕೀಯ ಸಂಪರ್ಕಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
    startScreeningBtn: 'ಆರೋಗ್ಯ ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ',
    villageDataBtn: 'ವರೂರು 15 ಮನೆಗಳ ಮಾಹಿತಿ ನೋಡಿ',
    disclaimerBanner: 'ಗಮನಿಸಿ: ಈ ವ್ಯವಸ್ಥೆಯು ವೈದ್ಯರಿಗೆ ಪರ್ಯಾಯವಲ್ಲ. ಇದು ಆರಂಭಿಕ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಸರಿಯಾದ ತುರ್ತು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ.',
    
    // Auth Modal
    loginTitle: 'ಖಾತೆಗೆ ಲಾಗಿನ್ ಆಗಿ',
    loginSubtitle: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    registerTitle: 'ಹೊಸ ರೋಗಿ / ಗ್ರಾಮಸ್ಥರ ನೋಂದಣಿ',
    registerSubtitle: 'ವರೂರು ಗ್ರಾಮದ ಆರೋಗ್ಯ ಸೇವೆಗಾಗಿ ನಿಮ್ಮ ವಿವರ ನಮೂದಿಸಿ',
    nameLabel: 'ಪೂರ್ಣ ಹೆಸರು',
    mobileLabel: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    emailLabel: 'ಇಮೇಲ್ (ಐಚ್ಛಿಕ)',
    passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
    ageLabel: 'ವಯಸ್ಸು',
    genderLabel: 'ಲಿಂಗ',
    male: 'ಪುರುಷ',
    female: 'ಮಹಿಳೆ',
    other: 'ಇತರ',
    houseLabel: 'ವರೂರು ಗ್ರಾಮದ ಮನೆ ಸಂಖ್ಯೆ (1-15)',
    submitLogin: 'ಲಾಗಿನ್ ಆಗಿ',
    submitRegister: 'ಖಾತೆ ತೆರೆಯಿರಿ',
    noAccount: 'ಖಾತೆ ಇಲ್ಲವೇ? ನೋಂದಾಯಿಸಿ',
    haveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್ ಆಗಿ',
    quickDemoLogin: 'ಪರೀಕ್ಷಾರ್ಥ ಲಾಗಿನ್ (ಡೆಮೊ)',
    loginSuccess: 'ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!',
    registerSuccess: 'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಆಗಿ.',
    errInvalidLogin: 'ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು. ದಯವಿಟ್ಟು ಸರಿಯಾದ ಮೊಬೈಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.',

    // Step 4: Dashboard
    dashWelcome: 'ಸ್ವಾಗತ',
    dashPatientProfile: 'ರೋಗಿಯ ಪ್ರೊಫೈಲ್',
    dashScreeningCount: 'ಒಟ್ಟು ತಪಾಸಣೆಗಳು',
    dashHouseRecords: 'ಮನೆಯ ಸದಸ್ಯರ ಸಂಖ್ಯೆ',
    dashRecentScreenings: 'ಇತ್ತೀಚಿನ ತಪಾಸಣಾ ವರದಿಗಳು',
    dashStartNew: 'ಹೊಸ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಪ್ರಾರಂಭಿಸಿ',
    dashEmergencyBox: 'ವರೂರು ತುರ್ತು ಸಹಾಯವಾಣಿ: 108 | ವರೂರು PHC: 0836-2201108',
    dashNoScreenings: 'ಇನ್ನೂ ಯಾವುದೇ ತಪಾಸಣೆ ನಡೆದಿಲ್ಲ. ಇಂದೇ ಮೊದಲ ತಪಾಸಣೆ ಮಾಡಿ!',

    // Step 5: Symptoms Form
    screeningTitle: 'ಹಂತ 5: ಆರೋಗ್ಯ ಮಾಹಿತಿ ನಮೂದಿಸಿ',
    screeningSubtitle: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳು ಮತ್ತು ಮೂಲಭೂತ ಆರೋಗ್ಯ ವಿವರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    voiceInputPrompt: 'ಧ್ವನಿ ಮೂಲಕ ರೋಗಲಕ್ಷಣ ಹೇಳಿ (ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ)',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ಮಾತನಾಡಿ...',
    durationLabel: 'ಲಕ್ಷಣಗಳು ಪ್ರಾರಂಭವಾಗಿ ಎಷ್ಟು ದಿನಗಳಾಗಿವೆ?',
    days: 'ದಿನಗಳು',
    symptomsHeader: 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ಗುರುತು ಮಾಡಿ:',
    symptomFever: 'ಜ್ವರ (Fever)',
    symptomCough: 'ಕೆಮ್ಮು (Cough)',
    symptomHeadache: 'ತಲೆನೋವು (Headache)',
    symptomFatigue: 'ವಿಪರೀತ ಸುಸ್ತು / ದಣಿವು (Fatigue)',
    symptomBreathing: 'ಉಸಿರಾಟದ ತೊಂದರೆ (Difficulty Breathing)',
    symptomVomiting: 'ವಾಂತಿ (Vomiting)',
    symptomBodyPain: 'ಮೈ-ಕೈ ನೋವು (Body Pain)',
    symptomChestPain: 'ಎದೆನೋವು / ಭಾರ (Chest Pain)',
    symptomDiarrhea: 'ಭೇದಿ / ಅತಿಸಾರ (Diarrhea)',
    symptomSoreThroat: 'ಗಂಟಲು ನೋವು (Sore Throat)',
    symptomDizziness: 'ತಲೆಸುತ್ತು (Dizziness)',
    symptomChills: 'ಚಳಿ ನಡುಕದ ಜ್ವರ (Chills & High Fever)',
    symptomLossTaste: 'ರುಚಿ ಅಥವಾ ವಾಸನೆ ಕಳೆದುಕೊಳ್ಳುವುದು',
    symptomStomachAche: 'ಹೊಟ್ಟೆ ನೋವು (Stomach Ache)',

    // Vitals Section (Optional)
    vitalsHeader: 'ಆರೋಗ್ಯ ಮಾಪನಗಳು (ತಿಳಿದಿದ್ದರೆ ಮಾತ್ರ ನಮೂದಿಸಿ):',
    tempLabel: 'ದೇಹದ ತಾಪಮಾನ (°F)',
    bpSysLabel: 'ರಕ್ತದೊತ್ತಡ - ಸಿಸ್ಟೊಲಿಕ್ (mmHg)',
    bpDiaLabel: 'ರಕ್ತದೊತ್ತಡ - ಡಯಾಸ್ಟೊಲಿಕ್ (mmHg)',
    pulseLabel: 'ನಾಡಿ ಮಿಡಿತ (Pulse bpm)',
    spo2Label: 'ಆಮ್ಲಜನಕದ ಮಟ್ಟ (SpO2 %)',

    // Step 6: Data Validation
    validateBtn: 'ಮಾಹಿತಿ ದೃಢೀಕರಿಸಿ ಮತ್ತು AI ತಪಾಸಣೆ ನಡೆಸಿ',
    validationErrorMsg: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಿ. (ವಯಸ್ಸು 1-120 ಮತ್ತು ಕನಿಷ್ಠ ಒಂದು ರೋಗಲಕ್ಷಣ ಆಯ್ಕೆಮಾಡಿ).',
    validatingText: 'ಮಾಹಿತಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',

    // Step 7 & 8: Data Processing & AI Screening
    processingTitle: 'ಹಂತ 7 ಮತ್ತು 8: AI / ML ಮಾದರಿಯಿಂದ ವಿಶ್ಲೇಷಣೆ',
    processingText: 'ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳು, ವಯೋಮಾನ ಮತ್ತು ವೈದ್ಯಕೀಯ ನಿಯಮಗಳನ್ನು AI ಮಾದರಿಯು ಲೆಕ್ಕಹಾಕುತ್ತಿದೆ...',

    // Step 9: Explainable Result (XAI)
    explainableTitle: 'ಹಂತ 9: ವಿವರಣಾತ್ಮಕ AI ಫಲಿತಾಂಶ (Explainable AI)',
    whyResult: 'ವ್ಯವಸ್ಥೆಯು ಈ ತೀರ್ಮಾನಕ್ಕೆ ಏಕೆ ಬಂದಿತು?',
    confidence: 'AI ನಿಖರತೆಯ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    riskLevelLabel: 'ಅಪಾಯದ ಮಟ್ಟ',
    riskLow: 'ಕಡಿಮೆ ಅಪಾಯ (Low Risk)',
    riskModerate: 'ಮಧ್ಯಮ ಅಪಾಯ (Moderate Risk)',
    riskHigh: 'ಹೆಚ್ಚಿನ ಅಪಾಯ (High Risk - ತುರ್ತು)',
    factorsHeading: 'ಪ್ರಭಾವ ಬೀರಿದ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು ಮತ್ತು ತೂಕ:',

    // Step 10 & 11: Recommendation & Report
    recommendationTitle: 'ಹಂತ 10 ಮತ್ತು 11: ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಸಮಗ್ರ ವರದಿ',
    suggestedActionLabel: 'ಸೂಚಿಸಲಾದ ಕ್ರಮ',
    clinicalGuidelines: 'ಆರೋಗ್ಯ ಮಾರ್ಗಸೂಚಿಗಳು:',
    nearestHospitalCard: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ & ಸಂಪರ್ಕ',
    nearestMedicalCard: 'ವರೂರು ಮೆಡಿಕಲ್ಸ್ & ಹೋಮ್ ಡೆಲಿವರಿ',
    homeDeliveryAvailable: 'ವರೂರು ಗ್ರಾಮಕ್ಕೆ ಉಚಿತ ಹೋಮ್ ಡೆಲಿವರಿ ಲಭ್ಯವಿದೆ',
    orderMedicineBtn: 'ಮನೆ ಬಾಗಿಲಿಗೆ ಔಷಧಿ ತರಿಸಿಕೊಳ್ಳಿ',
    callAmbulanceBtn: '108 ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ',
    voiceReportBtn: 'ವರದಿಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಆಲಿಸಿ',
    stopVoiceBtn: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    printReportBtn: 'ವರದಿ ಡೌನ್‌ಲೋಡ್ / ಪ್ರಿಂಟ್',
    newScreeningBtn: 'ಮತ್ತೊಂದು ತಪಾಸಣೆ ನಡೆಸಿ',

    // Medicals & Hospitals
    medicalsTitle: 'ವರೂರು ಗ್ರಾಮದ ಮೆಡಿಕಲ್ ಅಂಗಡಿಗಳು & ಔಷಧಿ ಸರಬರಾಜು',
    medicalsDesc: 'ವರೂರು ಗ್ರಾಮದೊಳಗೆ ಅಗತ್ಯ ಮಾತ್ರೆಗಳು, ಓಆರ್‌ಎಸ್ ಹಾಗೂ ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಸಾಧನಗಳನ್ನು ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.',
    hospitalsTitle: 'ಹತ್ತಿರದ ಪ್ರಾಥಮಿಕ ಕೇಂದ್ರ ಮತ್ತು ತುರ್ತು ಆಸ್ಪತ್ರೆಗಳು',
    hospitalsDesc: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ರೋಗಿಯನ್ನು ರವಾನಿಸಲು ದೂರ, ಆಂಬ್ಯುಲೆನ್ಸ್ ಹಾಗೂ ಬೆಡ್ ಸೌಲಭ್ಯಗಳ ಮಾಹಿತಿ.',
    
    // Order Dialog
    orderModalTitle: 'ವರೂರು ಮನೆ ಬಾಗಿಲಿಗೆ ಔಷಧಿ ಆರ್ಡರ್ ಮಾಡಿ',
    selectMedicines: 'ಅಗತ್ಯ ಔಷಧಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    confirmOrderBtn: 'ಆರ್ಡರ್ ಖಚಿತಪಡಿಸಿ',
    orderPlacedSuccess: 'ನಿಮ್ಮ ಔಷಧಿ ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿದೆ! 30-45 ನಿಮಿಷಗಳಲ್ಲಿ ನಿಮ್ಮ ಮನೆಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.',
    closeBtn: 'ಮುಚ್ಚಿ',

    // Voice Assistant modal
    voiceModalTitle: 'ವರೂರು ಸ್ಮಾರ್ಟ್ ಧ್ವನಿ ಸಹಾಯಕ',
    voiceModalDesc: 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ ನಿಮ್ಮ ಆರೋಗ್ಯ ತೊಂದರೆಯನ್ನು ತಿಳಿಸಿ. ಉದಾಹರಣೆಗೆ: "ನನಗೆ ಜ್ವರ ಮತ್ತು ಕೆಮ್ಮು ಇದೆ"',
    voiceSpeaking: 'ಧ್ವನಿ ಸಹಾಯಕ ಮಾತನಾಡುತ್ತಿದೆ...',
  },

  hindi: {
    appTitle: 'एआई आधारित ग्रामीण स्वास्थ्य जांच',
    appSubtitle: 'वरूर गांव, हुबली तालुका, धारवाड़ जिला',
    tagline: 'ग्रामीण क्षेत्रों के लिए प्रारंभिक एआई स्वास्थ्य परीक्षण और मार्गदर्शन प्रणाली',
    
    // Nav
    navHome: 'होम',
    navAbout: 'प्रणाली के बारे में',
    navDashboard: 'डैशबोर्ड',
    navScreening: 'स्वास्थ्य जांच',
    navVillage: '15 घरों का विवरण',
    navMedicals: 'मेडिकल स्टोर और होम डिलीवरी',
    navHospitals: 'अस्पताल और आपातकालीन सेवा',
    navLogin: 'लॉग इन',
    navRegister: 'पंजीकरण',
    navLogout: 'लॉग आउट',
    themeToggle: 'डार्क मोड बदलें',
    langSelect: 'भाषा चुनें',
    voiceAssistant: 'आवाज सहायक (Voice)',

    // Hero & Steps
    heroHeading: 'ग्रामीण भारत के लिए स्मार्ट एआई स्वास्थ्य जांच',
    heroDescription: 'डॉक्टर उपलब्ध न होने पर प्रारंभिक लक्षणों का विश्लेषण कर जोखिम स्तर और वरूर गांव के निकटतम स्वास्थ्य संपर्क प्रदान करता है।',
    startScreeningBtn: 'स्वास्थ्य जांच शुरू करें',
    villageDataBtn: 'वरूर के 15 घरों का डेटा देखें',
    disclaimerBanner: 'महत्वपूर्ण: यह प्रणाली डॉक्टर का विकल्प नहीं है। यह केवल प्रारंभिक जांच और उचित मार्गदर्शन के लिए है।',

    // Auth
    loginTitle: 'खाते में लॉग इन करें',
    loginSubtitle: 'अपना मोबाइल नंबर और पासवर्ड दर्ज करें',
    registerTitle: 'नया मरीज / ग्रामीण पंजीकरण',
    registerSubtitle: 'वरूर गांव स्वास्थ्य सेवा के लिए विवरण दर्ज करें',
    nameLabel: 'पूरा नाम',
    mobileLabel: 'मोबाइल नंबर',
    emailLabel: 'ईमेल (वैकल्पिक)',
    passwordLabel: 'पासवर्ड',
    ageLabel: 'आयु',
    genderLabel: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    houseLabel: 'वरूर गांव घर संख्या (1-15)',
    submitLogin: 'लॉग इन करें',
    submitRegister: 'पंजीकरण करें',
    noAccount: 'खाता नहीं है? पंजीकरण करें',
    haveAccount: 'पहले से खाता है? लॉग इन करें',
    quickDemoLogin: 'डेमो परीक्षण लॉग इन',
    loginSuccess: 'लॉग इन सफल रहा!',
    registerSuccess: 'पंजीकरण सफल! कृपया लॉग इन करें।',
    errInvalidLogin: 'अमान्य विवरण। कृपया सही मोबाइल और पासवर्ड दर्ज करें।',

    // Dashboard
    dashWelcome: 'स्वागत है',
    dashPatientProfile: 'मरीज का प्रोफाइल',
    dashScreeningCount: 'कुल स्वास्थ्य जांच',
    dashHouseRecords: 'परिवार के सदस्य',
    dashRecentScreenings: 'हालिया जांच रिपोर्ट',
    dashStartNew: 'नई स्वास्थ्य जांच शुरू करें',
    dashEmergencyBox: 'वरूर आपातकालीन हेल्पलाइन: 108 | वरूर पीएचसी: 0836-2201108',
    dashNoScreenings: 'अभी तक कोई जांच नहीं हुई है। आज ही पहली जांच करें!',

    // Step 5
    screeningTitle: 'चरण 5: स्वास्थ्य जानकारी दर्ज करें',
    screeningSubtitle: 'अपने लक्षण और बुनियादी स्वास्थ्य विवरण चुनें',
    voiceInputPrompt: 'आवाज द्वारा लक्षण बताएं (हिंदी में बोलें)',
    listening: 'सुन रहे हैं... कृपया बोलें...',
    durationLabel: 'लक्षण शुरू हुए कितने दिन हुए हैं?',
    days: 'दिन',
    symptomsHeader: 'लक्षणों का चयन करें:',
    symptomFever: 'बुखार (Fever)',
    symptomCough: 'खांसी (Cough)',
    symptomHeadache: 'सिरदर्द (Headache)',
    symptomFatigue: 'अत्यधिक थकान / कमजोरी (Fatigue)',
    symptomBreathing: 'सांस लेने में कठिनाई (Difficulty Breathing)',
    symptomVomiting: 'उल्टी (Vomiting)',
    symptomBodyPain: 'शरीर में दर्द (Body Pain)',
    symptomChestPain: 'सीने में दर्द या भारीपन (Chest Pain)',
    symptomDiarrhea: 'दस्त (Diarrhea)',
    symptomSoreThroat: 'गले में खराश (Sore Throat)',
    symptomDizziness: 'चक्कर आना (Dizziness)',
    symptomChills: 'ठंड लगकर तेज बुखार (Chills & High Fever)',
    symptomLossTaste: 'स्वाद या गंध न आना',
    symptomStomachAche: 'पेट दर्द (Stomach Ache)',

    // Vitals
    vitalsHeader: 'स्वास्थ्य माप (यदि ज्ञात हो):',
    tempLabel: 'शरीर का तापमान (°F)',
    bpSysLabel: 'रक्तचाप - सिस्टोलिक (mmHg)',
    bpDiaLabel: 'रक्तचाप - डायस्टोलिक (mmHg)',
    pulseLabel: 'नाड़ी गति (Pulse bpm)',
    spo2Label: 'ऑक्सीजन स्तर (SpO2 %)',

    // Step 6: Validation
    validateBtn: 'डेटा सत्यापित करें और एआई जांच करें',
    validationErrorMsg: 'कृपया मान्य स्वास्थ्य जानकारी दर्ज करें। (आयु 1-120 और कम से कम एक लक्षण चुनें)।',
    validatingText: 'डेटा सत्यापित किया जा रहा है...',

    // Step 7 & 8
    processingTitle: 'चरण 7 और 8: एआई / एमएल द्वारा डेटा विश्लेषण',
    processingText: 'आपके लक्षणों और स्वास्थ्य डेटा का क्लिनिकल विश्लेषण जारी है...',

    // Step 9: XAI
    explainableTitle: 'चरण 9: व्याख्यात्मक एआई परिणाम (Explainable AI)',
    whyResult: 'प्रणाली ने यह परिणाम क्यों दिया?',
    confidence: 'एआई विश्वसनीयता दर',
    riskLevelLabel: 'जोखिम स्तर',
    riskLow: 'कम जोखिम (Low Risk)',
    riskModerate: 'मध्यम जोखिम (Moderate Risk)',
    riskHigh: 'उच्च जोखिम (High Risk - आपातकालीन)',
    factorsHeading: 'प्रभावित करने वाले मुख्य लक्षण और भार:',

    // Step 10 & 11
    recommendationTitle: 'चरण 10 और 11: स्वास्थ्य मार्गदर्शन और समग्र रिपोर्ट',
    suggestedActionLabel: 'सुझाया गया कदम',
    clinicalGuidelines: 'स्वास्थ्य निर्देश:',
    nearestHospitalCard: 'निकटतम अस्पताल और संपर्क',
    nearestMedicalCard: 'वरूर मेडिकल स्टोर और होम डिलीवरी',
    homeDeliveryAvailable: 'वरूर गांव के लिए मुफ्त दवा होम डिलीवरी सुविधा',
    orderMedicineBtn: 'घर पर दवा मंगवाएं',
    callAmbulanceBtn: '108 एम्बुलेंस को कॉल करें',
    voiceReportBtn: 'रिपोर्ट को हिंदी में सुनें',
    stopVoiceBtn: 'आवाज रोकें',
    printReportBtn: 'रिपोर्ट डाउनलोड / प्रिंट करें',
    newScreeningBtn: 'नई जांच शुरू करें',

    // Medicals & Hospitals
    medicalsTitle: 'वरूर गांव के मेडिकल स्टोर एवं दवा आपूर्ति',
    medicalsDesc: 'वरूर गांव में आवश्यक दवाएं और ओआरएस घर तक पहुंचाने की सुविधा उपलब्ध है।',
    hospitalsTitle: 'निकटतम प्राथमिक स्वास्थ्य केंद्र और आपातकालीन अस्पताल',
    hospitalsDesc: 'आपात स्थिति में रेफरल हेतु दूरी, एम्बुलेंस और बिस्तर उपलब्धता की जानकारी।',

    orderModalTitle: 'वरूर घर पर दवा ऑर्डर करें',
    selectMedicines: 'आवश्यक दवाएं चुनें:',
    confirmOrderBtn: 'ऑर्डर पक्का करें',
    orderPlacedSuccess: 'दवा का ऑर्डर सफलतापूर्वक दर्ज हुआ! 30-45 मिनट में आपके घर पहुंचेगा।',
    closeBtn: 'बंद करें',

    voiceModalTitle: 'वरूर स्मार्ट वॉयस असिस्टेंट',
    voiceModalDesc: 'हिंदी में बोलकर अपनी समस्या बताएं। जैसे: "मुझे बुखार और खांसी है"',
    voiceSpeaking: 'सहायक बोल रहा है...',
  },

  english: {
    appTitle: 'AI Based Rural Healthcare Screening',
    appSubtitle: 'Varur Village, Hubballi Taluk, Dharwad District, Karnataka',
    tagline: 'Early Stage Rural Health Screening & Clinical Triage System',
    
    // Nav
    navHome: 'Home',
    navAbout: 'About System',
    navDashboard: 'Dashboard',
    navScreening: 'Health Screening',
    navVillage: '15 House Directory',
    navMedicals: 'Pharmacies & Home Delivery',
    navHospitals: 'Hospitals & Emergency',
    navLogin: 'Login',
    navRegister: 'Register',
    navLogout: 'Logout',
    themeToggle: 'Toggle Dark Mode',
    langSelect: 'Language',
    voiceAssistant: 'Voice Assistant',

    // Hero & Steps
    heroHeading: 'AI-Powered Primary Health Screening for Rural Communities',
    heroDescription: 'Empowering villagers when no doctor is immediately available. Analyzes symptoms, determines risk levels, and connects to Varur pharmacies and Hubballi referral hospitals.',
    startScreeningBtn: 'Start Health Screening',
    villageDataBtn: 'Explore Varur 15 Households',
    disclaimerBanner: 'Crucial Note: This system does NOT replace a doctor. It provides preliminary screening, early identification, and rural healthcare guidance.',

    // Auth
    loginTitle: 'User Login',
    loginSubtitle: 'Enter your registered mobile number and password',
    registerTitle: 'Villager / Patient Registration',
    registerSubtitle: 'Register for healthcare screening in Varur Village',
    nameLabel: 'Full Name',
    mobileLabel: 'Mobile Number',
    emailLabel: 'Email Address (Optional)',
    passwordLabel: 'Password',
    ageLabel: 'Age (Years)',
    genderLabel: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    houseLabel: 'Varur Village House No. (1 to 15)',
    submitLogin: 'Login to System',
    submitRegister: 'Create Account',
    noAccount: 'New to the system? Register here',
    haveAccount: 'Already registered? Login here',
    quickDemoLogin: 'Quick Demo Villager Login',
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful! Please login.',
    errInvalidLogin: 'Invalid credentials. Please verify your mobile and password.',

    // Dashboard
    dashWelcome: 'Welcome',
    dashPatientProfile: 'Patient Profile',
    dashScreeningCount: 'Total Screenings',
    dashHouseRecords: 'Family Members',
    dashRecentScreenings: 'Recent Screening Reports',
    dashStartNew: 'Start Health Screening',
    dashEmergencyBox: 'Varur Emergency Helpline: 108 | Varur PHC: 0836-2201108',
    dashNoScreenings: 'No health screenings recorded yet. Click above to start your first screening!',

    // Step 5
    screeningTitle: 'Step 5: Enter Health Information',
    screeningSubtitle: 'Select patient symptoms and basic clinical vitals',
    voiceInputPrompt: 'Voice Input: Speak your symptoms in English, Kannada, or Hindi',
    listening: 'Listening to your voice... Speak now...',
    durationLabel: 'How many days have you had these symptoms?',
    days: 'Days',
    symptomsHeader: 'Check Applicable Symptoms:',
    symptomFever: 'Fever',
    symptomCough: 'Cough',
    symptomHeadache: 'Headache',
    symptomFatigue: 'Tiredness & Fatigue',
    symptomBreathing: 'Difficulty Breathing',
    symptomVomiting: 'Vomiting',
    symptomBodyPain: 'Body Pain / Myalgia',
    symptomChestPain: 'Chest Pain / Tightness',
    symptomDiarrhea: 'Diarrhea / Loose Stools',
    symptomSoreThroat: 'Sore Throat',
    symptomDizziness: 'Dizziness / Vertigo',
    symptomChills: 'Chills & Rigors with High Fever',
    symptomLossTaste: 'Loss of Taste or Smell',
    symptomStomachAche: 'Abdominal / Stomach Ache',

    // Vitals
    vitalsHeader: 'Basic Health Measurements (Optional if known):',
    tempLabel: 'Body Temperature (°F)',
    bpSysLabel: 'Blood Pressure - Systolic (mmHg)',
    bpDiaLabel: 'Blood Pressure - Diastolic (mmHg)',
    pulseLabel: 'Pulse Rate (bpm)',
    spo2Label: 'Oxygen Saturation (SpO2 %)',

    // Step 6: Validation
    validateBtn: 'Validate Data & Run AI Screening',
    validationErrorMsg: 'Please enter valid health information. (Age must be 1-120 and at least one symptom must be selected).',
    validatingText: 'Validating clinical parameters...',

    // Step 7 & 8
    processingTitle: 'Steps 7 & 8: Data Processing & AI/ML Screening',
    processingText: 'Evaluating multi-symptom vectors, vitals, and risk weights using rural clinical triage model...',

    // Step 9: XAI
    explainableTitle: 'Step 9: Explainable AI Result (XAI)',
    whyResult: 'Why did the AI system produce this result?',
    confidence: 'AI Screening Confidence',
    riskLevelLabel: 'Risk Level',
    riskLow: 'Low Risk',
    riskModerate: 'Moderate Risk',
    riskHigh: 'High Risk (Emergency Referral)',
    factorsHeading: 'Key Symptom Drivers & Weight Contribution:',

    // Step 10 & 11
    recommendationTitle: 'Steps 10 & 11: Rural Healthcare Guidance & Report',
    suggestedActionLabel: 'Recommended Clinical Action',
    clinicalGuidelines: 'Healthcare Guidelines:',
    nearestHospitalCard: 'Nearest Hospital & Emergency Contact',
    nearestMedicalCard: 'Varur Pharmacy & Home Medicine Delivery',
    homeDeliveryAvailable: 'Home Delivery Facility Available in Varur Village',
    orderMedicineBtn: 'Order Medicines to Home',
    callAmbulanceBtn: 'Call 108 Emergency Ambulance',
    voiceReportBtn: 'Hear Screening Report in Audio',
    stopVoiceBtn: 'Stop Audio',
    printReportBtn: 'Download / Print Report',
    newScreeningBtn: 'Start Another Screening',

    // Medicals & Hospitals
    medicalsTitle: 'Varur Village Pharmacies & Home Delivery',
    medicalsDesc: 'Essential OTC fever kits, ORS, inhalers, and prescriptions delivered directly to your doorstep in Varur.',
    hospitalsTitle: 'Nearest Healthcare Facilities & Referral Hospitals',
    hospitalsDesc: 'Real distance, emergency contacts, ambulance numbers, and ICU facilities for Varur residents.',

    orderModalTitle: 'Request Medicine Home Delivery (Varur Village)',
    selectMedicines: 'Select Required Medicines:',
    confirmOrderBtn: 'Confirm Delivery Order',
    orderPlacedSuccess: 'Medicine order placed successfully! Will be delivered in 30-45 minutes.',
    closeBtn: 'Close',

    voiceModalTitle: 'Varur Smart Voice Health Assistant',
    voiceModalDesc: 'Speak naturally in Kannada, Hindi, or English to describe your health complaints.',
    voiceSpeaking: 'Assistant is speaking...',
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.english;
}

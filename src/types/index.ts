export type Language = 'kannada' | 'hindi' | 'english';

export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface UserProfile {
  id?: string;
  name: string;
  mobile: string;
  email?: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  houseNumber: string;
  headOfFamily?: string;
  languagePreference: Language;
  role: 'villager' | 'asha_worker' | 'admin';
}

export interface FamilyMember {
  name: string;
  relation: string;
  age: number;
  gender: string;
  hasChronicCondition?: string;
  lastScreeningRisk?: RiskLevel | 'None';
}

export interface HouseholdData {
  houseNumber: string;
  headOfFamily: string;
  streetName: string;
  landmark: string;
  contactNumber: string;
  rationCardNumber: string;
  members: FamilyMember[];
  waterSource?: string;
  sanitationStatus?: string;
  ashaWorkerAssigned?: string;
}

export interface MedicalStoreData {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  contactNumber: string;
  pharmacistName: string;
  hasHomeDelivery: boolean;
  deliveryRadiusKm: number;
  deliveryContactNumber: string;
  is24x7: boolean;
  essentialMedicinesInStock: string[];
  associatedHospital?: string;
}

export interface HospitalData {
  id: string;
  name: string;
  type: string;
  location: string;
  distanceKm: number;
  emergencyContact: string;
  ambulanceContact: string;
  availableBeds: number;
  hasICU: boolean;
  hasEmergency24x7: boolean;
  specialties: string[];
  nearbyPharmacies: string[];
}

export interface SymptomsState {
  fever: boolean;
  cough: boolean;
  headache: boolean;
  fatigue: boolean;
  difficultyBreathing: boolean;
  vomiting: boolean;
  bodyPain: boolean;
  chestPain: boolean;
  diarrhea: boolean;
  soreThroat: boolean;
  dizziness: boolean;
  highFeverChills: boolean;
  lossOfTasteSmell: boolean;
  stomachAche: boolean;
}

export interface VitalsState {
  temperatureFahrenheit?: number;
  systolicBP?: number;
  diastolicBP?: number;
  pulseRate?: number;
  spO2Percent?: number;
}

export interface ExplainableFactor {
  factor: string;
  kannada: string;
  hindi: string;
  weightPercent: number;
  isWarning: boolean;
}

export interface ScreeningResult {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  houseNumber: string;
  riskLevel: RiskLevel;
  preliminaryCondition: {
    english: string;
    kannada: string;
    hindi: string;
  };
  confidenceScore: number;
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
  activeSymptoms: string[];
  vitals?: VitalsState;
  timestamp: string;
}

export interface MedicineOrderItem {
  medicineName: string;
  quantity: number;
}

export interface MedicineOrder {
  orderId: string;
  patientName: string;
  houseNumber: string;
  contactNumber: string;
  storeName: string;
  items: MedicineOrderItem[];
  status: 'Confirmed' | 'Out for Delivery' | 'Delivered';
  timestamp: string;
  estimatedDeliveryTime: string;
}

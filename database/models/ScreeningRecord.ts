import mongoose, { Schema, Document } from 'mongoose';

export interface IScreeningRecord extends Document {
  patientName: string;
  patientAge: number;
  patientGender: string;
  houseNumber: string;
  symptoms: string[];
  durationDays: number;
  vitals: {
    temperatureFahrenheit?: number;
    systolicBP?: number;
    diastolicBP?: number;
    pulseRate?: number;
    spO2Percent?: number;
  };
  riskLevel: 'Low' | 'Moderate' | 'High';
  preliminaryCondition: string;
  confidenceScore: number;
  explainableFactors: string[];
  recommendations: string[];
  nearestHospitalReferral?: string;
  nearestMedicalReferral?: string;
  emergencyAlert: boolean;
  languageUsed: 'kannada' | 'hindi' | 'english';
  createdAt: Date;
}

const ScreeningRecordSchema: Schema = new Schema(
  {
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientGender: { type: String, required: true },
    houseNumber: { type: String, required: true },
    symptoms: { type: [String], required: true },
    durationDays: { type: Number, default: 1 },
    vitals: {
      temperatureFahrenheit: { type: Number },
      systolicBP: { type: Number },
      diastolicBP: { type: Number },
      pulseRate: { type: Number },
      spO2Percent: { type: Number },
    },
    riskLevel: {
      type: String,
      required: true,
      enum: ['Low', 'Moderate', 'High'],
    },
    preliminaryCondition: { type: String, required: true },
    confidenceScore: { type: Number, required: true },
    explainableFactors: { type: [String], required: true },
    recommendations: { type: [String], required: true },
    nearestHospitalReferral: { type: String },
    nearestMedicalReferral: { type: String },
    emergencyAlert: { type: Boolean, default: false },
    languageUsed: {
      type: String,
      enum: ['kannada', 'hindi', 'english'],
      default: 'kannada',
    },
  },
  { timestamps: true }
);

export const ScreeningRecordModel =
  mongoose.models.ScreeningRecord ||
  mongoose.model<IScreeningRecord>('ScreeningRecord', ScreeningRecordSchema);

export default ScreeningRecordModel;

import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicalStore extends Document {
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

const MedicalStoreSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    contactNumber: { type: String, required: true },
    pharmacistName: { type: String, required: true },
    hasHomeDelivery: { type: Boolean, default: true },
    deliveryRadiusKm: { type: Number, default: 5 },
    deliveryContactNumber: { type: String, required: true },
    is24x7: { type: Boolean, default: false },
    essentialMedicinesInStock: { type: [String], default: [] },
    associatedHospital: { type: String },
  },
  { timestamps: true }
);

export const MedicalStoreModel =
  mongoose.models.MedicalStore ||
  mongoose.model<IMedicalStore>('MedicalStore', MedicalStoreSchema);

export default MedicalStoreModel;

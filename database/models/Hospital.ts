import mongoose, { Schema, Document } from 'mongoose';

export interface IHospital extends Document {
  name: string;
  type: 'PHC' | 'District Government Hospital' | 'Medical College & Hospital' | 'Multispeciality';
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

const HospitalSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['PHC', 'District Government Hospital', 'Medical College & Hospital', 'Multispeciality'],
    },
    location: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    emergencyContact: { type: String, required: true },
    ambulanceContact: { type: String, required: true },
    availableBeds: { type: Number, default: 10 },
    hasICU: { type: Boolean, default: false },
    hasEmergency24x7: { type: Boolean, default: true },
    specialties: { type: [String], default: [] },
    nearbyPharmacies: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const HospitalModel =
  mongoose.models.Hospital ||
  mongoose.model<IHospital>('Hospital', HospitalSchema);

export default HospitalModel;

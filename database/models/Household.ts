import mongoose, { Schema, Document } from 'mongoose';

export interface IFamilyMember {
  name: string;
  relation: string;
  age: number;
  gender: string;
  hasChronicCondition?: string;
  lastScreeningRisk?: 'Low' | 'Moderate' | 'High' | 'None';
}

export interface IHousehold extends Document {
  houseNumber: string;
  headOfFamily: string;
  streetName: string;
  landmark: string;
  contactNumber: string;
  rationCardNumber: string;
  members: IFamilyMember[];
  waterSource: string;
  sanitationStatus: string;
  ashaWorkerAssigned: string;
}

const FamilyMemberSchema = new Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  hasChronicCondition: { type: String },
  lastScreeningRisk: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'None'],
    default: 'None',
  },
});

const HouseholdSchema = new Schema(
  {
    houseNumber: { type: String, required: true, unique: true },
    headOfFamily: { type: String, required: true },
    streetName: { type: String, required: true },
    landmark: { type: String, required: true },
    contactNumber: { type: String, required: true },
    rationCardNumber: { type: String, required: true },
    members: [FamilyMemberSchema],
    waterSource: { type: String, default: 'Gram Panchayat Tap' },
    sanitationStatus: { type: String, default: 'Individual Sanitary Latrine' },
    ashaWorkerAssigned: { type: String, default: 'Smt. Shanta Pujar (Varur ASHA)' },
  },
  { timestamps: true }
);

export const HouseholdModel =
  mongoose.models.Household || mongoose.model<IHousehold>('Household', HouseholdSchema);

export default HouseholdModel;

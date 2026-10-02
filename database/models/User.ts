import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  mobile: string;
  email?: string;
  passwordHash: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  houseNumber: string;
  headOfFamily?: string;
  languagePreference: 'kannada' | 'hindi' | 'english';
  role: 'villager' | 'asha_worker' | 'admin';
  knownConditions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    houseNumber: { type: String, required: true },
    headOfFamily: { type: String, default: '' },
    languagePreference: {
      type: String,
      enum: ['kannada', 'hindi', 'english'],
      default: 'kannada',
    },
    role: {
      type: String,
      enum: ['villager', 'asha_worker', 'admin'],
      default: 'villager',
    },
    knownConditions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default UserModel;

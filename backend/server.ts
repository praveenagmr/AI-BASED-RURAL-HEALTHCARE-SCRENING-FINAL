import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from '../database/connection.js';
import { UserModel } from '../database/models/User.js';
import { ScreeningRecordModel } from '../database/models/ScreeningRecord.js';
import { HouseholdModel } from '../database/models/Household.js';
import { MedicalStoreModel } from '../database/models/MedicalStore.js';
import { HospitalModel } from '../database/models/Hospital.js';
import { performAIScreening, PatientScreeningInput } from './aiScreeningEngine.js';
import { varur15HouseholdsSeed, varurMedicalsSeed, varurHospitalsSeed } from '../database/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Auto-connect to MongoDB on server launch
let dbConnected = false;
connectToDatabase()
  .then(() => {
    dbConnected = true;
    console.log('[Express Server] Varur MongoDB database connection active.');
  })
  .catch((err) => {
    console.warn('[Express Server] Running in local fallback mode (MongoDB instance not detected). Offline mock and memory store active.');
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'AI Based Rural Healthcare Screening',
    village: 'Varur, Hubballi Taluk, Karnataka',
    database: dbConnected ? 'connected' : 'memory_fallback',
    api_key_status: 'none_required_offline_model',
  });
});

// 1. User Registration (Step 2 in project lifecycle)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, mobile, email, password, age, gender, houseNumber, headOfFamily, languagePreference } = req.body;

    if (!name || !mobile || !password || !age || !gender || !houseNumber) {
      return res.status(400).json({ error: 'Please enter valid registration information.' });
    }

    if (dbConnected) {
      const existingUser = await UserModel.findOne({ mobile });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this mobile number already registered.' });
      }

      const newUser = new UserModel({
        name,
        mobile,
        email,
        passwordHash: password, // In production, hash with bcrypt
        age: Number(age),
        gender,
        houseNumber,
        headOfFamily,
        languagePreference: languagePreference || 'kannada',
        role: 'villager',
      });

      await newUser.save();
      return res.status(201).json({
        message: 'Registration successful! Please login with your credentials.',
        user: {
          id: newUser._id,
          name: newUser.name,
          mobile: newUser.mobile,
          age: newUser.age,
          gender: newUser.gender,
          houseNumber: newUser.houseNumber,
          languagePreference: newUser.languagePreference,
        },
      });
    }

    // Fallback response for offline preview
    res.status(201).json({
      message: 'Registration recorded successfully!',
      user: { name, mobile, age: Number(age), gender, houseNumber, languagePreference: languagePreference || 'kannada' },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error creating user account' });
  }
});

// 2. User Login (Step 3 in project lifecycle)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body; // username is mobile or email

    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter username and password.' });
    }

    if (dbConnected) {
      const user = await UserModel.findOne({
        $or: [{ mobile: username }, { email: username.toLowerCase() }],
        passwordHash: password,
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials. Please check your username and password.' });
      }

      return res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
          age: user.age,
          gender: user.gender,
          houseNumber: user.houseNumber,
          languagePreference: user.languagePreference,
          role: user.role,
        },
      });
    }

    // Local authentication fallback for instant testing
    res.json({
      message: 'Login successful (Offline mode)',
      user: {
        name: 'Basavaraj Patil',
        mobile: username,
        age: 38,
        gender: 'male',
        houseNumber: 'VAR-H01',
        languagePreference: 'kannada',
        role: 'villager',
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// 3. AI/ML Health Screening Engine (Step 5, 6, 7, 8, 9, 10)
app.post('/api/screening/analyze', async (req, res) => {
  try {
    const input: PatientScreeningInput = req.body;

    // Step 6: Data validation
    if (!input.patientName || !input.age || input.age < 1 || input.age > 120 || !input.gender) {
      return res.status(400).json({
        error: 'Please enter valid health information (valid name, age between 1-120, and gender).',
      });
    }

    const hasAnySymptom = Object.values(input.symptoms || {}).some(val => val === true);
    if (!hasAnySymptom) {
      return res.status(400).json({
        error: 'Please select at least one symptom for the health screening.',
      });
    }

    // Step 7 & 8: Data processing & AI screening inference
    const result = performAIScreening(input);

    // Save record to MongoDB if connected
    if (dbConnected) {
      const record = new ScreeningRecordModel({
        patientName: input.patientName,
        patientAge: input.age,
        patientGender: input.gender,
        houseNumber: input.houseNumber || 'VAR-H01',
        symptoms: Object.keys(input.symptoms).filter(k => (input.symptoms as any)[k]),
        durationDays: input.durationDays || 1,
        vitals: input.vitals || {},
        riskLevel: result.riskLevel,
        preliminaryCondition: result.preliminaryCondition.english,
        confidenceScore: result.confidenceScore,
        explainableFactors: result.explainableFactors.map(f => f.factor),
        recommendations: result.recommendations.english,
        nearestHospitalReferral: result.nearestFacility.name,
        emergencyAlert: result.emergencyHospitalReferralRequired,
        languageUsed: input.language || 'kannada',
      });
      await record.save();
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error during AI screening execution' });
  }
});

// 4. 15 Varur Village Households Directory
app.get('/api/village/houses', async (req, res) => {
  try {
    if (dbConnected) {
      let houses = await HouseholdModel.find({});
      if (houses.length === 0) {
        await HouseholdModel.insertMany(varur15HouseholdsSeed);
        houses = await HouseholdModel.find({});
      }
      return res.json(houses);
    }
    res.json(varur15HouseholdsSeed);
  } catch (error: any) {
    res.json(varur15HouseholdsSeed);
  }
});

// 5. Varur Medical Stores and Home Delivery
app.get('/api/village/medicals', async (req, res) => {
  try {
    if (dbConnected) {
      let medicals = await MedicalStoreModel.find({});
      if (medicals.length === 0) {
        await MedicalStoreModel.insertMany(varurMedicalsSeed);
        medicals = await MedicalStoreModel.find({});
      }
      return res.json(medicals);
    }
    res.json(varurMedicalsSeed);
  } catch (error: any) {
    res.json(varurMedicalsSeed);
  }
});

// 6. Nearest Hospitals and Emergency Care
app.get('/api/village/hospitals', async (req, res) => {
  try {
    if (dbConnected) {
      let hospitals = await HospitalModel.find({});
      if (hospitals.length === 0) {
        await HospitalModel.insertMany(varurHospitalsSeed);
        hospitals = await HospitalModel.find({});
      }
      return res.json(hospitals);
    }
    res.json(varurHospitalsSeed);
  } catch (error: any) {
    res.json(varurHospitalsSeed);
  }
});

// 7. Medicine Home Delivery Order Booking
app.post('/api/medicine/order', (req, res) => {
  const { houseNumber, patientName, contactNumber, storeName, medicines, deliveryNotes } = req.body;
  if (!houseNumber || !patientName || !medicines || medicines.length === 0) {
    return res.status(400).json({ error: 'Please provide valid order and address information.' });
  }

  const orderId = `MED-VAR-${Date.now().toString().slice(-6)}`;
  res.json({
    success: true,
    orderId,
    message: `Medicine home delivery order placed successfully with ${storeName || 'Sanjeevini Grama Medicals'}!`,
    estimatedDeliveryTime: '30 - 45 Minutes',
    deliveryAddress: `House No: ${houseNumber}, Varur Village`,
    contactNumber,
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Express Backend] Rural Healthcare API Server listening on port ${PORT}`);
  });
}

export default app;

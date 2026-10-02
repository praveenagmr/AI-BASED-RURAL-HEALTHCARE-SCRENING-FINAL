# Varur Rural Healthcare Screening - MongoDB Database Architecture

This directory contains the ready-to-run MongoDB connection scripts, Mongoose schemas, and village data seeds for the **AI Based Rural Healthcare Screening** major project.

## Directory Files
- `connection.ts`: Mongoose connection manager with auto-reconnection and timeout fallbacks.
- `models/User.ts`: Villager, ASHA worker, and Administrator user profiles and credentials.
- `models/ScreeningRecord.ts`: Historical AI screening results, vitals, explainability breakdown, and recommendations.
- `models/Household.ts`: Health census records for the 15 households in Varur village.
- `models/MedicalStore.ts`: Local pharmacies, 24x7 stores, and home delivery services.
- `models/Hospital.ts`: Primary Health Centres (PHC) and tertiary referral hospitals (KIMS Hubballi).
- `seedData.ts`: Ready-made database seeder with authentic Varur village data.

## Connection Setup
Set your connection URI in `.env`:
```env
MONGODB_URI="mongodb://127.0.0.1:27017/rural_health_varur"
```
Or for MongoDB Atlas:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/rural_health_varur?retryWrites=true&w=majority"
```

## Running the Database Seed
```bash
npx tsx database/seedData.ts
```

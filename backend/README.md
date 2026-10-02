# Rural Healthcare Screening - Backend API

Express & TypeScript backend for the **AI Based Rural Healthcare Screening** major project (Varur Village, Karnataka).

## Architecture Highlights
- **100% Offline AI/ML Clinical Model**: Evaluates symptoms, vitals, and duration based on primary care clinical guidelines without any external API keys.
- **Explainable AI (XAI)**: Provides mathematical weighting and clinical justifications for every screening outcome.
- **Trilingual Localization Engine**: Outputs results natively in Kannada, Hindi, and English.
- **MongoDB Integration**: Connects to Mongoose models for users, screening records, 15 Varur village houses, medicals, and hospitals.

## Run Backend Independently (Optional)
```bash
npx tsx backend/server.ts
```
Default Port: `5000` (or configured via `PORT` environment variable).

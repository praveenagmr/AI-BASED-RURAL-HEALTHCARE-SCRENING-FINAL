import mongoose from 'mongoose';

/**
 * MongoDB Connection Utility for AI Based Rural Healthcare Screening
 * Configured for Varur Village Healthcare Database
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rural_health_varur';

interface MongooseConnectionState {
  isConnected: boolean;
}

const connectionState: MongooseConnectionState = {
  isConnected: false,
};

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (connectionState.isConnected) {
    console.log('[MongoDB] Using existing active database connection.');
    return mongoose;
  }

  try {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    };

    const db = await mongoose.connect(MONGODB_URI, opts);
    connectionState.isConnected = db.connections[0].readyState === 1;

    console.log(`[MongoDB] Connected successfully to Varur Rural Health DB at: ${MONGODB_URI}`);
    
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error event:', err);
      connectionState.isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] Database disconnected. Reconnecting...');
      connectionState.isConnected = false;
    });

    return mongoose;
  } catch (error) {
    console.error('[MongoDB] Failed to connect to MongoDB:', error);
    connectionState.isConnected = false;
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (connectionState.isConnected) {
    await mongoose.disconnect();
    connectionState.isConnected = false;
    console.log('[MongoDB] Disconnected successfully.');
  }
}

export default connectToDatabase;

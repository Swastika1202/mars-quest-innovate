import mongoose, { Connection, ConnectOptions } from 'mongoose';

const {
  MONGO_URI = 'mongodb://localhost:27017/mars-quest',
  MONGO_DB_NAME = 'mars-quest',
  MONGO_CONNECTION_TIMEOUT_MS = '30000',
  MONGO_SOCKET_TIMEOUT_MS = '45000',
  NODE_ENV = 'development'
} = process.env;

// Connection events
mongoose.connection.on('connecting', () => {
  console.log('Connecting to MongoDB...');});

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connected to: ${mongoose.connection.host}/${mongoose.connection.name}`);});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  if (NODE_ENV === 'production') {
    // In production, try to reconnect after a delay
    setTimeout(connectDB, 5000);
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  if (NODE_ENV === 'production') {
    // In production, try to reconnect if we get disconnected
    console.log('Attempting to reconnect to MongoDB...');
    setTimeout(connectDB, 5000);
  }
});

// Connection options
const options: ConnectOptions = {
  dbName: MONGO_DB_NAME,
  serverSelectionTimeoutMS: parseInt(MONGO_CONNECTION_TIMEOUT_MS, 10),
  socketTimeoutMS: parseInt(MONGO_SOCKET_TIMEOUT_MS, 10),
  autoIndex: NODE_ENV !== 'production', // Don't build indexes in production
};

// Connect to MongoDB
export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    if (!MONGO_URI) {
      throw new Error('MongoDB connection string is not defined');
    }

    // Close any existing connections
    if (mongoose.connection.readyState !== 0) { // 0 = disconnected
      await mongoose.disconnect();
    }

    const connection = await mongoose.connect(MONGO_URI, options);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // In production, you might want to implement a retry mechanism here
    process.exit(1);
  }
};

// Graceful shutdown
export const disconnectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) { // 0 = disconnected
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    // Even if there's an error, we need to exit the process
    process.exit(1);
  }
};

// Export mongoose instance for models to use
export const db = mongoose.connection;

// Export mongoose for convenience
export { mongoose };

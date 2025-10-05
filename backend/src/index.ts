import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { nasaRoutes } from './routes/nasa';
import { missionRoutes } from './routes/mission.routes';
import profileRoutes from './routes/profile.routes'; // Import profile routes
import authRoutes from './routes/auth.routes'; // Import auth routes
import communityRoutes from './routes/community.routes'; // Import community routes
import { errorHandler } from './middleware/errorHandler';
import { connectDB, disconnectDB } from './config/database'; // Uncommented database imports

// Load environment variables
dotenv.config({ path: '.env' });

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
// Configure CORS with multiple allowed origins
const allowedOrigins = process.env.FRONTEND_URLS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' })); // Increased payload limit
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Increased payload limit

// Routes
app.use('/api/nasa', nasaRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/profile', profileRoutes); // Use profile routes
app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/communities', communityRoutes); // Use community routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Mars Quest Backend API'
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Connect to MongoDB
  connectDB().catch(err => { // Uncommented connectDB
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(async () => {
    await disconnectDB(); // Uncommented disconnectDB
    console.log('Process terminated');
    process.exit(0);
  });
});


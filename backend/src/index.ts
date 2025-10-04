import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { nasaRoutes } from './routes/nasa';
import { missionRoutes } from './routes/missions';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/nasa', nasaRoutes);
app.use('/api/missions', missionRoutes);

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

app.listen(PORT, () => {
  console.log(`🚀 Mars Quest Backend API running on port ${PORT}`);
  console.log(`📡 NASA API integration ready`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

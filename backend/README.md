# Mars Quest Backend API

A Node.js/Express backend API that integrates with NASA's official APIs to provide Mars mission data for the Mars Quest educational platform.

## 🚀 Features

- **NASA API Integration**: Real-time Mars data from official NASA APIs
- **Mission Management**: Pre-defined Mars settlement missions
- **TypeScript**: Full type safety and IntelliSense support
- **RESTful API**: Clean, documented endpoints
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Helmet.js security headers and CORS protection

## 📡 NASA APIs Integrated

- **Mars Rover Photos API**: Images from Curiosity, Opportunity, Spirit, and Perseverance
- **Mars Weather Service**: Real-time weather data from InSight lander
- **Astronomy Picture of the Day (APOD)**: Daily space images
- **Mars Rover Manifest**: Mission details and photo counts

## 🛠️ Setup

### 1. Get NASA API Key
1. Visit [NASA API Portal](https://api.nasa.gov/)
2. Fill out the registration form
3. Copy your API key

### 2. Environment Setup
```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your NASA API key
NASA_API_KEY=your_nasa_api_key_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Development
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 API Endpoints

### NASA Data Endpoints
- `GET /api/nasa/mars-photos` - Get Mars rover photos
- `GET /api/nasa/mars-weather` - Get Mars weather data
- `GET /api/nasa/apod` - Get Astronomy Picture of the Day
- `GET /api/nasa/rover-manifest/:rover` - Get rover mission details
- `GET /api/nasa/rovers` - Get available rovers
- `GET /api/nasa/cameras/:rover` - Get available cameras for a rover
- `GET /api/nasa/random-photo` - Get random Mars photo for missions

### Mission Endpoints
- `GET /api/missions` - Get all missions (with optional filters)
- `GET /api/missions/:id` - Get specific mission
- `GET /api/missions/category/:category` - Get missions by category
- `GET /api/missions/meta/categories` - Get available categories
- `GET /api/missions/meta/difficulties` - Get difficulty levels

### Health Check
- `GET /health` - API health status

## 🔧 Example Usage

### Get Mars Photos
```bash
curl "http://localhost:3001/api/nasa/mars-photos?rover=curiosity&sol=1000&camera=MAST"
```

### Get Mars Weather
```bash
curl "http://localhost:3001/api/nasa/mars-weather"
```

### Get Missions
```bash
curl "http://localhost:3001/api/missions?category=habitat&difficulty=intermediate"
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic and NASA API integration
│   ├── types/           # TypeScript type definitions
│   ├── middleware/      # Express middleware
│   └── index.ts         # Main application entry point
├── dist/                # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 Frontend Integration

The backend is designed to work seamlessly with the React frontend:

1. **CORS**: Configured to allow requests from `http://localhost:5173`
2. **JSON API**: All responses are in JSON format
3. **Error Handling**: Consistent error response format
4. **TypeScript**: Shared types can be used in frontend

## 🚀 Next Steps

- [ ] Add user authentication and profiles
- [ ] Implement mission progress tracking
- [ ] Add leaderboard functionality
- [ ] Integrate with database (PostgreSQL/MongoDB)
- [ ] Add caching for NASA API responses
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger

## 📝 Environment Variables

```env
# NASA API Configuration
NASA_API_KEY=your_nasa_api_key_here
NASA_API_BASE_URL=https://api.nasa.gov

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Mars Quest educational platform.

# Mars Quest Innovate

A full-stack educational platform that provides Mars mission data through a modern web application. The project is structured as a monorepo with separate frontend and backend services.

## 🚀 Features

### Frontend (React/TypeScript)
- Modern, responsive UI with React 18
- Type-safe development with TypeScript
- State management with React Context
- Beautiful UI components with Tailwind CSS
- Real-time data visualization

### Backend (Node.js/Express)
- RESTful API with Express
- NASA API integration
- TypeScript for type safety
- Secure API endpoints
- Comprehensive error handling

## 🛠️ Project Structure

```
mars-quest-innovate/
├── frontend/            # React frontend application
│   ├── public/          # Static assets
│   ├── src/             # Source code
│   │   ├── assets/      # Images, fonts, etc.
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── types/       # TypeScript type definitions
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/             # Node.js/Express backend
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic
│   │   ├── types/      # TypeScript types
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── package.json         # Root package.json with shared scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- NASA API key (get one from [NASA API Portal](https://api.nasa.gov/))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mars-quest-innovate.git
   cd mars-quest-innovate
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend and backend dependencies
   npm run install:all
   ```

3. **Environment Setup**
   - Backend: Copy `.env.example` to `.env` in the backend directory and add your NASA API key
   - Frontend: No additional setup required for development

4. **Development**
   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```
   - Frontend will be available at: http://localhost:3000
   - Backend API will be available at: http://localhost:3001

## 🏗️ Available Scripts

### Root Scripts
- `npm install:all` - Install all dependencies (root, frontend, and backend)
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm start` - Start the production server

### Frontend Scripts (run from /frontend)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend Scripts (run from /backend)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
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

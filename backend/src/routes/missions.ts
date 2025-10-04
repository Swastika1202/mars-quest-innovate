import { Router, Request, Response } from 'express';
import { MissionData } from '../types/nasa';

const router = Router();

// Sample mission data - in a real app, this would come from a database
const missions: MissionData[] = [
  {
    id: 'habitat-design-001',
    title: 'Design a Mars Habitat',
    description: 'Create a sustainable habitat design using real Mars environmental data from NASA\'s InSight mission.',
    difficulty: 'intermediate',
    category: 'habitat',
    nasaDataRequired: true,
    dataSource: 'mars_weather',
    requirements: [
      'Analyze Mars atmospheric pressure data',
      'Design for extreme temperature variations',
      'Include radiation protection',
      'Plan for dust storm resilience'
    ],
    rewards: {
      points: 500,
      badges: ['habitat-designer', 'data-analyst']
    }
  },
  {
    id: 'solar-power-001',
    title: 'Optimize Solar Power System',
    description: 'Design an efficient solar power system for Mars using actual solar irradiance data.',
    difficulty: 'advanced',
    category: 'energy',
    nasaDataRequired: true,
    dataSource: 'mars_weather',
    requirements: [
      'Calculate optimal panel angles',
      'Account for dust accumulation',
      'Design energy storage systems',
      'Plan for seasonal variations'
    ],
    rewards: {
      points: 750,
      badges: ['energy-engineer', 'solar-expert']
    }
  },
  {
    id: 'water-extraction-001',
    title: 'Water Extraction from Regolith',
    description: 'Develop a system to extract water from Martian soil using NASA\'s mineral composition data.',
    difficulty: 'advanced',
    category: 'water',
    nasaDataRequired: true,
    dataSource: 'mars_photos',
    requirements: [
      'Analyze soil composition from rover data',
      'Design extraction mechanisms',
      'Calculate water yield potential',
      'Plan purification systems'
    ],
    rewards: {
      points: 800,
      badges: ['water-engineer', 'resource-manager']
    }
  },
  {
    id: 'greenhouse-001',
    title: 'Mars Greenhouse Design',
    description: 'Create a controlled environment agriculture system for Mars using atmospheric data.',
    difficulty: 'intermediate',
    category: 'food',
    nasaDataRequired: true,
    dataSource: 'mars_weather',
    requirements: [
      'Design atmospheric control systems',
      'Select appropriate crops',
      'Plan for low gravity effects',
      'Include waste recycling'
    ],
    rewards: {
      points: 600,
      badges: ['agricultural-engineer', 'life-support-specialist']
    }
  },
  {
    id: 'rover-mission-001',
    title: 'Plan a Rover Mission',
    description: 'Design a scientific mission for a Mars rover using real terrain data from NASA images.',
    difficulty: 'beginner',
    category: 'transportation',
    nasaDataRequired: true,
    dataSource: 'mars_photos',
    requirements: [
      'Select landing site from available images',
      'Plan scientific objectives',
      'Design rover specifications',
      'Create mission timeline'
    ],
    rewards: {
      points: 400,
      badges: ['mission-planner', 'rover-engineer']
    }
  }
];

// Get all missions
router.get('/', (req: Request, res: Response) => {
  const { category, difficulty, limit } = req.query;
  
  let filteredMissions = [...missions];
  
  if (category) {
    filteredMissions = filteredMissions.filter(mission => 
      mission.category === category
    );
  }
  
  if (difficulty) {
    filteredMissions = filteredMissions.filter(mission => 
      mission.difficulty === difficulty
    );
  }
  
  if (limit) {
    const limitNum = parseInt(limit as string);
    filteredMissions = filteredMissions.slice(0, limitNum);
  }
  
  res.json({
    success: true,
    data: filteredMissions,
    meta: {
      total: filteredMissions.length,
      filters: { category, difficulty, limit }
    }
  });
});

// Get mission by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const mission = missions.find(m => m.id === id);
  
  if (!mission) {
    return res.status(404).json({
      success: false,
      error: 'Mission not found'
    });
  }
  
  res.json({
    success: true,
    data: mission
  });
});

// Get missions by category
router.get('/category/:category', (req: Request, res: Response) => {
  const { category } = req.params;
  const categoryMissions = missions.filter(mission => 
    mission.category === category
  );
  
  res.json({
    success: true,
    data: categoryMissions,
    meta: {
      category,
      total: categoryMissions.length
    }
  });
});

// Get mission categories
router.get('/meta/categories', (req: Request, res: Response) => {
  const categories = [...new Set(missions.map(mission => mission.category))];
  
  res.json({
    success: true,
    data: categories,
    meta: {
      total: categories.length
    }
  });
});

// Get difficulty levels
router.get('/meta/difficulties', (req: Request, res: Response) => {
  const difficulties = [...new Set(missions.map(mission => mission.difficulty))];
  
  res.json({
    success: true,
    data: difficulties,
    meta: {
      total: difficulties.length
    }
  });
});

export { router as missionRoutes };

import { Router, Request, Response } from 'express';
import { createMission, getAllMissions, getMissionById } from '../services/missionService';
import { IMission } from '../models/mission';

const router = Router();

// Create a new mission
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate incoming data here if needed
    const missionData: Omit<IMission, 'createdAt' | 'updatedAt'> = req.body;

    // Create and save mission to DB
    const newMission = await createMission(missionData);

    res.status(201).json({
      success: true,
      data: newMission,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Get all missions
router.get('/', async (req: Request, res: Response) => {
  try {
    // Optional filters could be added here in query parsing
    const missions = await getAllMissions();

    res.json({
      success: true,
      data: missions,
      meta: {
        total: missions.length,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Get mission by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const mission = await getMissionById(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        error: 'Mission not found',
      });
    }

    res.json({
      success: true,
      data: mission,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export { router as missionRoutes };

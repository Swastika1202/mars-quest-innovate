import { Request, Response } from 'express';
import {
  createMission,
  getMissionById,
  getAllMissions,
  updateMission,
  deleteMission,
  addTelemetryData
} from '../services/missionService';
import { IMission } from '../models/mission';

export const createMissionHandler = async (req: Request, res: Response) => {
  try {
    const mission = await createMission(req.body as IMission);
    res.status(201).json({
      success: true,
      data: mission,
      meta: {
        createdAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const getMissionHandler = async (req: Request, res: Response) => {
  try {
    const mission = await getMissionById(req.params.id);
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
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const getAllMissionsHandler = async (_req: Request, res: Response) => {
  try {
    const missions = await getAllMissions();
    res.json({
      success: true,
      data: missions,
      meta: {
        total: missions.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const updateMissionHandler = async (req: Request, res: Response) => {
  try {
    const mission = await updateMission(req.params.id, req.body as IMission);
    if (!mission) {
      return res.status(404).json({ 
        success: false,
        error: 'Mission not found' 
      });
    }
    res.json({
      success: true,
      data: mission,
      meta: {
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const deleteMissionHandler = async (req: Request, res: Response) => {
  try {
    const mission = await deleteMission(req.params.id);
    if (!mission) {
      return res.status(404).json({ 
        success: false,
        error: 'Mission not found' 
      });
    }
    res.json({ 
      success: true,
      data: { message: 'Mission deleted successfully' },
      meta: {
        deletedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const addTelemetryDataHandler = async (req: Request, res: Response) => {
  try {
    const mission = await addTelemetryData(req.params.id, req.body);
    if (!mission) {
      return res.status(404).json({ 
        success: false,
        error: 'Mission not found' 
      });
    }
    res.status(201).json({
      success: true,
      data: mission,
      meta: {
        telemetryAddedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

// New handlers for mission metadata
export const getMissionCategoriesHandler = async (_req: Request, res: Response) => {
  try {
    const categories = ['habitat', 'energy', 'water', 'food', 'transportation'];
    res.json({
      success: true,
      data: categories,
      meta: {
        total: categories.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const getMissionDifficultiesHandler = async (_req: Request, res: Response) => {
  try {
    const difficulties = ['beginner', 'intermediate', 'advanced'];
    res.json({
      success: true,
      data: difficulties,
      meta: {
        total: difficulties.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

export const getMissionsByCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    // For now, return empty array since we don't have actual mission data
    // In a real implementation, you would filter missions by category
    const missions: any[] = [];
    res.json({
      success: true,
      data: missions,
      meta: {
        category,
        total: missions.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

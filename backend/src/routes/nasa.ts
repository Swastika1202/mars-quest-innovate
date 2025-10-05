import { Router, Request, Response } from 'express';
import { nasaService } from '../services/nasaService';

const router = Router();

// Get Mars photos with optional filters
router.get('/mars-photos', async (req: Request, res: Response) => {
  try {
    const { 
      rover = 'curiosity', 
      sol, 
      earth_date, 
      camera, 
      page = '1'
    } = req.query;

    // Validate rover name
    const validRovers = ['curiosity', 'opportunity', 'spirit', 'perseverance'];
    if (!validRovers.includes(rover as string)) {
      return res.status(400).json({
        success: false,
        error: `Invalid rover name. Must be one of: ${validRovers.join(', ')}`
      });
    }

    // Validate page number
    const pageNum = parseInt(page as string);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        error: 'Page must be a positive number'
      });
    }

    const photos = await nasaService.getMarsPhotos(
      rover as string,
      sol ? parseInt(sol as string) : undefined,
      earth_date as string,
      camera as string,
      pageNum
    );

    res.json({
      success: true,
      data: photos,
      meta: {
        rover,
        sol: sol ? parseInt(sol as string) : undefined,
        earth_date,
        camera,
        page: pageNum
      }
    });
  } catch (error: unknown) {
    const err = error as Error;
    const statusCode = err.message.includes('Invalid') || 
                       err.message.includes('missing') ? 400 : 500;

    console.error('Mars photos error:', err);
    res.status(statusCode).json({
      success: false,
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});

// Get Mars weather data
router.get('/mars-weather', async (req: Request, res: Response) => {
  try {
    const weatherData = await nasaService.getMarsWeather();
    
    res.json({
      success: true,
      data: weatherData,
      meta: {
        source: 'InSight Mars Weather Service',
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Get Astronomy Picture of the Day
router.get('/apod', async (req: Request, res: Response) => {
  try {
    const { date, hd = 'true' } = req.query;
    
    const apodData = await nasaService.getAPOD(
      date as string,
      hd === 'true'
    );

    res.json({
      success: true,
      data: apodData,
      meta: {
        date: date || 'today',
        hd: hd === 'true'
      }
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Get rover manifest
router.get('/rover-manifest/:rover', async (req: Request, res: Response) => {
  try {
    const { rover } = req.params;
    const manifest = await nasaService.getRoverManifest(rover);

    res.json({
      success: true,
      data: manifest,
      meta: {
        rover,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Get available rovers
router.get('/rovers', (req: Request, res: Response) => {
  const rovers = nasaService.getAvailableRovers();
  
  res.json({
    success: true,
    data: rovers,
    meta: {
      total: rovers.length
    }
  });
});

// Get available cameras for a rover
router.get('/cameras/:rover', (req: Request, res: Response) => {
  const { rover } = req.params;
  const cameras = nasaService.getAvailableCameras(rover);
  
  res.json({
    success: true,
    data: cameras,
    meta: {
      rover,
      total: cameras.length
    }
  });
});

// Get random Mars photo for missions
router.get('/random-photo', async (req: Request, res: Response) => {
  try {
    const randomPhoto = await nasaService.getRandomMarsPhoto();
    
    res.json({
      success: true,
      data: randomPhoto,
      meta: {
        purpose: 'mission_inspiration',
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export { router as nasaRoutes };

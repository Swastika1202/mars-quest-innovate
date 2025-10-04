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
      page = 1 
    } = req.query;

    const photos = await nasaService.getMarsPhotos(
      rover as string,
      sol ? parseInt(sol as string) : undefined,
      earth_date as string,
      camera as string,
      parseInt(page as string)
    );

    res.json({
      success: true,
      data: photos,
      meta: {
        rover,
        sol,
        earth_date,
        camera,
        page: parseInt(page as string)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Mars photos'
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Mars weather data'
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch APOD data'
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch rover manifest'
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch random Mars photo'
    });
  }
});

export { router as nasaRoutes };

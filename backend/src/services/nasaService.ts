import axios, { AxiosResponse } from 'axios';
import { 
  MarsPhotosResponse, 
  MarsWeatherData, 
  APODData, 
  MarsRoverManifest 
} from '../types/nasa';

class NASAService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.NASA_API_BASE_URL || 'https://api.nasa.gov';
    this.apiKey = process.env.NASA_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️  NASA_API_KEY not found in environment variables');
    }
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          ...params,
          api_key: this.apiKey
        },
        timeout: 10000 // 10 second timeout
      });
      return response.data;
    } catch (error) {
      console.error(`NASA API Error for ${endpoint}:`, error);
      throw new Error(`Failed to fetch data from NASA API: ${endpoint}`);
    }
  }

  // Mars Rover Photos API
  async getMarsPhotos(
    rover: string = 'curiosity',
    sol?: number,
    earthDate?: string,
    camera?: string,
    page: number = 1
  ): Promise<MarsPhotosResponse> {
    const endpoint = `/mars-photos/api/v1/rovers/${rover}/photos`;
    const params: Record<string, any> = { page };
    
    if (sol) params.sol = sol;
    if (earthDate) params.earth_date = earthDate;
    if (camera) params.camera = camera;

    return this.makeRequest<MarsPhotosResponse>(endpoint, params);
  }

  // Mars Weather Service API
  async getMarsWeather(): Promise<MarsWeatherData> {
    const endpoint = '/insight_weather/';
    return this.makeRequest<MarsWeatherData>(endpoint);
  }

  // Astronomy Picture of the Day API
  async getAPOD(date?: string, hd: boolean = true): Promise<APODData> {
    const endpoint = '/planetary/apod';
    const params: Record<string, any> = {};
    
    if (date) params.date = date;
    if (hd) params.hd = hd;

    return this.makeRequest<APODData>(endpoint, params);
  }

  // Mars Rover Manifest API
  async getRoverManifest(rover: string = 'curiosity'): Promise<MarsRoverManifest> {
    const endpoint = `/mars-photos/api/v1/manifests/${rover}`;
    return this.makeRequest<MarsRoverManifest>(endpoint);
  }

  // Get available rovers
  getAvailableRovers(): string[] {
    return ['curiosity', 'opportunity', 'spirit', 'perseverance'];
  }

  // Get available cameras for a rover
  getAvailableCameras(rover: string): string[] {
    const cameraMap: Record<string, string[]> = {
      curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
      opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
      spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
      perseverance: ['EDL_RUCAM', 'EDL_RDCAM', 'EDL_DDCAM', 'EDL_PUCAM1', 'EDL_PUCAM2', 'NAVCAM_LEFT', 'NAVCAM_RIGHT', 'MCZ_LEFT', 'MCZ_RIGHT', 'FRONT_HAZCAM_LEFT_A', 'FRONT_HAZCAM_RIGHT_A', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT', 'EDL_WATSON', 'SHERLOC_WATSON', 'SUPERCAM_RMI', 'LCAM']
    };
    return cameraMap[rover] || [];
  }

  // Get random Mars photo for missions
  async getRandomMarsPhoto(): Promise<any> {
    const rovers = this.getAvailableRovers();
    const randomRover = rovers[Math.floor(Math.random() * rovers.length)];
    
    try {
      const response = await this.getMarsPhotos(randomRover, undefined, undefined, undefined, 1);
      if (response.photos && response.photos.length > 0) {
        const randomPhoto = response.photos[Math.floor(Math.random() * response.photos.length)];
        return randomPhoto;
      }
    } catch (error) {
      console.error('Error fetching random Mars photo:', error);
    }
    
    return null;
  }
}

export const nasaService = new NASAService();

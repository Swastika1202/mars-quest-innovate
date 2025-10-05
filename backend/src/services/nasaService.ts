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
    this.apiKey = process.env.NASA_API_KEY || 'YLrI2y7waH9U8PkrjabVyBXaI4uBqzDkgA0Wfw6C';
    if (!this.apiKey || this.apiKey === 'your_nasa_api_key_here') {
      console.warn('⚠️  Using DEMO_KEY for NASA API. For production, set NASA_API_KEY in environment variables.');
      this.apiKey = 'DEMO_KEY';
    }
  }

  // Helper delay function for retries
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}, retries = 3): Promise<T> {
    if (!this.apiKey) {
      throw new Error('NASA API key is not configured');
    }

    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          ...params,
          api_key: this.apiKey
        },
        timeout: 10000, // 10 second timeout
        validateStatus: (status) => status < 500 // Don't throw for 4xx errors automatically
      });

      
      // Handle rate limit with retries
      if (response.status === 429) {
        if (retries > 0) {
          console.warn(`NASA API rate limit hit for ${endpoint}. Retrying after delay... Retries left: ${retries}`);
          await this.delay(1000 * (4 - retries));  // Exponential backoff
          return this.makeRequest(endpoint, params, retries - 1);
        } else {
          throw new Error('NASA API rate limit exceeded. Please try again later.');
        }
      }

      if (response.status === 403) {
        throw new Error('Invalid or missing NASA API key');
      }
      if (response.status === 404) {
        throw new Error('Requested resource not found');
      }
      if (response.status >= 400) {
        throw new Error(`NASA API returned status ${response.status}`);
      }

      return response.data;
    } catch (error: any) {
      console.error(`NASA API Error for ${endpoint}:`, error.message);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received from NASA API');
      }

      throw new Error(`NASA API request failed: ${error.message}`);
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

// API service for connecting frontend to backend
const API_BASE_URL = 'http://localhost:3001/api';

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'habitat' | 'energy' | 'water' | 'food' | 'transportation';
  nasaDataRequired: boolean;
  dataSource?: 'mars_photos' | 'mars_weather' | 'apod' | 'rover_manifest';
  requirements: string[];
  rewards: {
    points: number;
    badges: string[];
  };
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export interface APODData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface MarsWeatherData {
  sol_keys: number[];
  validity_checks: {
    [key: string]: {
      sol_hours_with_data: number[];
      valid: boolean;
    };
  };
  [sol: string]: any;
}

// Generic API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: any;
  error?: string;
}

// Generic fetch wrapper with error handling
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'API request failed');
    }

    return result.data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// Mission API functions
export const missionApi = {
  // Create a new mission
  createMission: async (missionData: Omit<Mission, 'id'>): Promise<Mission> => {
    return apiRequest<Mission>('/missions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(missionData),
    });
  },
  // Get all missions with optional filters
  getMissions: async (filters?: {
    category?: string;
    difficulty?: string;
    limit?: number;
  }): Promise<Mission[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const queryString = params.toString();
    const endpoint = queryString ? `/missions?${queryString}` : '/missions';
    
    return apiRequest<Mission[]>(endpoint);
  },

  // Get mission by ID
  getMission: async (id: string): Promise<Mission> => {
    return apiRequest<Mission>(`/missions/${id}`);
  },

  // Get missions by category
  getMissionsByCategory: async (category: string): Promise<Mission[]> => {
    return apiRequest<Mission[]>(`/missions/category/${category}`);
  },

  // Get available categories
  getCategories: async (): Promise<string[]> => {
    return apiRequest<string[]>('/missions/meta/categories');
  },

  // Get difficulty levels
  getDifficulties: async (): Promise<string[]> => {
    return apiRequest<string[]>('/missions/meta/difficulties');
  },
};

// NASA API functions
export const nasaApi = {
  // Get Mars photos
  getMarsPhotos: async (params?: {
    rover?: string;
    sol?: number;
    earth_date?: string;
    camera?: string;
    page?: number;
  }): Promise<{ photos: MarsPhoto[] }> => {
    const searchParams = new URLSearchParams();
    if (params?.rover) searchParams.append('rover', params.rover);
    if (params?.sol) searchParams.append('sol', params.sol.toString());
    if (params?.earth_date) searchParams.append('earth_date', params.earth_date);
    if (params?.camera) searchParams.append('camera', params.camera);
    if (params?.page) searchParams.append('page', params.page.toString());
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/nasa/mars-photos?${queryString}` : '/nasa/mars-photos';
    
    return apiRequest<{ photos: MarsPhoto[] }>(endpoint);
  },

  // Get Mars weather data
  getMarsWeather: async (): Promise<MarsWeatherData> => {
    return apiRequest<MarsWeatherData>('/nasa/mars-weather');
  },

  // Get Astronomy Picture of the Day
  getAPOD: async (date?: string, hd: boolean = true): Promise<APODData> => {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (hd) params.append('hd', hd.toString());
    
    const queryString = params.toString();
    const endpoint = queryString ? `/nasa/apod?${queryString}` : '/nasa/apod';
    
    return apiRequest<APODData>(endpoint);
  },

  // Get available rovers
  getRovers: async (): Promise<string[]> => {
    return apiRequest<string[]>('/nasa/rovers');
  },

  // Get available cameras for a rover
  getCameras: async (rover: string): Promise<string[]> => {
    return apiRequest<string[]>(`/nasa/cameras/${rover}`);
  },

  // Get random Mars photo
  getRandomPhoto: async (): Promise<MarsPhoto | null> => {
    return apiRequest<MarsPhoto | null>('/nasa/random-photo');
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<{ status: string; timestamp: string; service: string }> => {
    const response = await fetch('http://localhost:3001/health');
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    return response.json();
  },
};

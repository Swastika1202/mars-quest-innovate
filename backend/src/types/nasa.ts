// NASA API Response Types

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

export interface MarsPhotosResponse {
  photos: MarsPhoto[];
}

export interface MarsWeatherData {
  sol_keys: number[];
  validity_checks: {
    [key: string]: {
      sol_hours_with_data: number[];
      valid: boolean;
    };
  };
  [sol: string]: any; // Dynamic sol data
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

export interface MarsRoverManifest {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: Array<{
      sol: number;
      earth_date: string;
      total_photos: number;
      cameras: string[];
    }>;
  };
}

export interface MissionData {
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

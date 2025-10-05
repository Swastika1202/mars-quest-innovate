import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { missionApi, nasaApi, healthApi, Mission, MarsPhoto, APODData, MarsWeatherData } from '../services/api';

// Mission hooks
export const useMissions = (filters?: {
  category?: string;
  difficulty?: string;
  limit?: number;
}): UseQueryResult<Mission[], Error> => {
  return useQuery({
    queryKey: ['missions', filters],
    queryFn: () => missionApi.getMissions(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMission = (id: string): UseQueryResult<Mission, Error> => {
  return useQuery({
    queryKey: ['mission', id],
    queryFn: () => missionApi.getMission(id),
    enabled: !!id,
  });
};

export const useMissionsByCategory = (category: string): UseQueryResult<Mission[], Error> => {
  return useQuery({
    queryKey: ['missions', 'category', category],
    queryFn: () => missionApi.getMissionsByCategory(category),
    enabled: !!category,
  });
};

export const useMissionCategories = (): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['missions', 'categories'],
    queryFn: () => missionApi.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMissionDifficulties = (): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['missions', 'difficulties'],
    queryFn: () => missionApi.getDifficulties(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// NASA API hooks
export const useMarsPhotos = (params?: {
  rover?: string;
  sol?: number;
  earth_date?: string;
  camera?: string;
  page?: number;
}): UseQueryResult<{ photos: MarsPhoto[] }, Error> => {
  return useQuery({
    queryKey: ['nasa', 'mars-photos', params],
    queryFn: () => nasaApi.getMarsPhotos(params),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useMarsWeather = (): UseQueryResult<MarsWeatherData, Error> => {
  return useQuery({
    queryKey: ['nasa', 'mars-weather'],
    queryFn: () => nasaApi.getMarsWeather(),
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
  });
};

export const useAPOD = (date?: string, hd: boolean = true): UseQueryResult<APODData, Error> => {
  return useQuery({
    queryKey: ['nasa', 'apod', date, hd],
    queryFn: () => nasaApi.getAPOD(date, hd),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export const useRovers = (): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['nasa', 'rovers'],
    queryFn: () => nasaApi.getRovers(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export const useRoverCameras = (rover: string): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['nasa', 'cameras', rover],
    queryFn: () => nasaApi.getCameras(rover),
    enabled: !!rover,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export const useRandomMarsPhoto = (): UseQueryResult<MarsPhoto | null, Error> => {
  return useQuery({
    queryKey: ['nasa', 'random-photo'],
    queryFn: () => nasaApi.getRandomPhoto(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Health check hook
export const useHealthCheck = (): UseQueryResult<{ status: string; timestamp: string; service: string }, Error> => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => healthApi.check(),
    refetchInterval: 30 * 1000, // Check every 30 seconds
    retry: 3,
  });
};

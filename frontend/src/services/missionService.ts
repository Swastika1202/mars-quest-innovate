const API_URL = 'http://localhost:3001/api/missions';

export interface MissionData {
  name: string;
  launchDate: Date;
  status: 'planned' | 'active' | 'completed' | 'failed';
  crew: string[];
}

export const createMission = async (missionData: MissionData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(missionData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create mission');
  }

  return response.json();
};

export const getMissions = async () => {
  const response = await fetch(API_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch missions');
  }

  return response.json();
};

export const getMissionById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch mission');
  }

  return response.json();
};

export const updateMission = async (id: string, updates: Partial<MissionData>) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update mission');
  }

  return response.json();
};

export const deleteMission = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete mission');
  }

  return response.json();
};

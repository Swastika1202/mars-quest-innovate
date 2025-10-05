import { Mission, IMission, ITelemetry } from '../models/mission';

export const createMission = async (missionData: Omit<IMission, 'createdAt' | 'updatedAt'>): Promise<IMission> => {
  try {
    const mission = new Mission(missionData);
    return await mission.save();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Error creating mission: ${errorMessage}`);
  }
};

export const getMissionById = async (id: string): Promise<IMission | null> => {
  try {
    return await Mission.findById(id);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Error fetching mission: ${errorMessage}`);
  }
};

export const getAllMissions = async (): Promise<IMission[]> => {
  try {
    return await Mission.find().sort({ launchDate: -1 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Error fetching missions: ${errorMessage}`);
  }
};

export const updateMission = async (
  id: string,
  updateData: Partial<IMission>
): Promise<IMission | null> => {
  try {
    return await Mission.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Error updating mission: ${errorMessage}`);
  }
};

export const deleteMission = async (id: string): Promise<IMission | null> => {
  try {
    return await Mission.findByIdAndDelete(id);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Error deleting mission: ${errorMessage}`);
  }
};

export const addTelemetryData = async (
  missionId: string,
  telemetryData: Omit<ITelemetry, 'timestamp'>
): Promise<IMission | null> => {
  try {
    return await Mission.findByIdAndUpdate(
      missionId,
      { $push: { telemetry: { ...telemetryData, timestamp: new Date() } } },
      { new: true }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    throw new Error(`Error adding telemetry data: ${errorMessage}`);
  }
};

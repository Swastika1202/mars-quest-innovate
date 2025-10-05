import { Schema, model, Document } from 'mongoose';

export interface ITelemetry {
  temperature: number;
  pressure: number;
  altitude: number;
  timestamp: Date;
}

export interface IMission extends Document {
  name: string;
  launchDate: Date;
  status: 'planned' | 'active' | 'completed' | 'failed';
  crew: string[];
  telemetry: ITelemetry[];
  createdAt: Date;
  updatedAt: Date;
}

const telemetrySchema = new Schema<ITelemetry>({
  temperature: { type: Number, required: true },
  pressure: { type: Number, required: true },
  altitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const missionSchema = new Schema<IMission>(
  {
    name: { type: String, required: true, unique: true },
    launchDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['planned', 'active', 'completed', 'failed'],
      default: 'planned'
    },
    crew: [{ type: String }],
    telemetry: [telemetrySchema]
  },
  {
    timestamps: true
  }
);

export const Mission = model<IMission>('Mission', missionSchema);

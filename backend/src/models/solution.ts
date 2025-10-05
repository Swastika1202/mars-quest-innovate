import { Schema, model, Document } from 'mongoose';

export interface ISolution extends Document {
  title: string;
  description: string;
  community: Schema.Types.ObjectId; // The community this solution belongs to
  creator: Schema.Types.ObjectId; // The user who created the solution
  userName: string;
  email: string;
  universityName: string;
  category: string;
  reportFileUrl?: string; // URL to the uploaded report file
  youtubeLink?: string;
  prototypeLink?: string;
  votes: number;
  createdAt: Date;
  updatedAt: Date;
}

const solutionSchema = new Schema<ISolution>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    universityName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    reportFileUrl: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    prototypeLink: {
      type: String,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Solution = model<ISolution>('Solution', solutionSchema);

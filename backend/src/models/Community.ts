import { Schema, model, Document } from 'mongoose';

export interface ICommunity extends Document {
  name: string;
  description: string;
  members: Schema.Types.ObjectId[]; // Array of User IDs
  admin: Schema.Types.ObjectId; // User ID of the admin
  solutionsCount: number; // New field to track the number of solutions
  createdAt: Date;
  updatedAt: Date;
}

const communitySchema = new Schema<ICommunity>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 4, // Changed from 10 to 4
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    solutionsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Community = model<ICommunity>('Community', communitySchema);

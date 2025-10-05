import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  fullName?: string;
  schoolUniversity?: string;
  classStreamCourse?: string;
  location?: string;
  gender?: string;
  contactNumber?: string;
  avatarUrl?: string;
  notificationsEnabled?: boolean;
  communities?: Schema.Types.ObjectId[]; // Added communities field
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: { 
      type: String, 
      required: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    fullName: {
      type: String,
      trim: true,
    },
    schoolUniversity: {
      type: String,
      trim: true,
    },
    classStreamCourse: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: "https://github.com/shadcn.png",
    },
    notificationsEnabled: {
      type: Boolean,
      default: true,
    },
    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Community',
      },
    ],
  },
  {
    timestamps: true
  }
);

// Index for faster querying
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = model<IUser>('User', userSchema);

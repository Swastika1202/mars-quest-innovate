declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';
  import { v2 as cloudinary } from 'cloudinary';

  interface CloudinaryStorageOptions {
    cloudinary: typeof cloudinary;
    params?: {
      folder?: string;
      allowed_formats?: string[];
      public_id?: (req: Express.Request, file: Express.Multer.File) => string;
      transformation?: any;
    };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);
    _handleFile(req: Express.Request, file: Express.Multer.File, callback: (error?: any, info?: Partial<Express.Multer.File>) => void): void;
    _removeFile(req: Express.Request, file: Express.Multer.File, callback: (error: Error) => void): void;
  }
}

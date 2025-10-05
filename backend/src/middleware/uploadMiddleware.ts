import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mars-quest-solutions',
    allowed_formats: ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'],
  } as any, // Cast to any to bypass strict type checking for `allowed_formats`
});

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'text/plain' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG are allowed!'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;

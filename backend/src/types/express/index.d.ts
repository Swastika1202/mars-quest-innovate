import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      param: (name: string) => string; // Add param method to Request
    }
  }
}

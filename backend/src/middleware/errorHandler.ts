import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`Error ${statusCode}: ${message}`, {
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method
    },
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

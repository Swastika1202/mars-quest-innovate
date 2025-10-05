import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult, body, ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validateRequest = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map((err: any) => ({
        param: err.param,
        message: err.msg,
        location: err.location,
        value: err.value
      }))
    });
  };
};

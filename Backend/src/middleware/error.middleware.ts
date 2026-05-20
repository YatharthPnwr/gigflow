import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorMiddleware = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${statusCode}] ${err.message}`);
  }

  res.status(statusCode).json({ success: false, message });
};

export default errorMiddleware;

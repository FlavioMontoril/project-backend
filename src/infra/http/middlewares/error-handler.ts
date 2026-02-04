import { AppException } from "@/core/exceptions/AppException.js";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      issues: error.issues,
    });
  }

  if (error instanceof AppException) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error({
    message: "Unhandled error",
    error,
    path: req.path,
    method: req.method,
  });

  return res.status(500).json({
    message: "Internal server error",
  });
}

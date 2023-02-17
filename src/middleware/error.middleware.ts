import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(error.name);

  response.status(400).json({ errorType: error.name, message: error.message });
  next();
};

export default errorMiddleware;

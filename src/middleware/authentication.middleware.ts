import { Request, Response, NextFunction } from "express";

const authenticationMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction
) => {
  console.log("Authenticating User");

  next();
};

export default authenticationMiddleware;

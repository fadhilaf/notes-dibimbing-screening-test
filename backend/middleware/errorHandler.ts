import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const parsedError = JSON.parse(err.message) || err.message;

  return res.status(400).json(parsedError);
};

export default errorHandler;

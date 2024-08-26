import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default function authorize(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  try {
    const token = (req.get('Authentiaction') as string).split(' ')[1];
    jwt.verify(token, process.env.SECRET_TOKEN as string);
    next();
  } catch (err) {
    return res.status(503).json(err);
  }
}

import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();


export default function authorize(req: Request, res: Response, next: Function): void | Response {
  try {
    let token = (req.get('Authentiaction') as string).split(' ')[1]
    jwt.verify(token, process.env.SECRET_TOKEN as string)
    next()
  } catch (err) {
    res.status(503).json(err)
  }
}
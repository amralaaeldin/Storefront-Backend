import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world!');
});

app.use('/', userRoutes);

app.use('/', productRoutes);

app.use('/', orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.PORT}...`);
});

export default app;

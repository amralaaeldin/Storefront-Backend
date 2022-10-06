import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'

const app: Application = express();
const port = 7000;


app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world!');
});

app.use('/', userRoutes)

app.use('/', productRoutes)

app.listen(port, () => {
  console.log(`Running on ${port}...`);
});

export default app;

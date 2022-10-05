import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';


const app: Application = express();
const port = 7000;


app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('hello world!');
});

app.listen(port, () => {
  console.log(`Running on ${port}...`);
});

export default app;

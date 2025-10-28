import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

app.use(express.json());
app.use(cors());

//all routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('This is IHAM University API!\n');
});

app.all('{*splat}', notFound);

//global error handling
app.use(globalErrorHandler);

export default app;

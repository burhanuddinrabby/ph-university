import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { success } from 'zod';

app.use(express.json());
app.use(cors());

//all routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('This is IHAM University API!\n');
});

app.all('{*splat}', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `${req.path} is not a valid path`
  });
});
export default app;

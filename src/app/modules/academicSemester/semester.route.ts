import express from 'express';
import { AcademicSemesterController } from './semester.controller';

const router = express.Router();

router.post('/create-semester', AcademicSemesterController.createAcademicSemester);

export const AcademicSemesterRoutes = router;
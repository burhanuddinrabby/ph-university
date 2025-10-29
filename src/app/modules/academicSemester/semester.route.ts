import express from 'express';
import { AcademicSemesterController } from './semester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './semester.validation';

const router = express.Router();

router.post('/create-semester', validateRequest(academicSemesterValidations.createAcademicSemesterValidation), AcademicSemesterController.createAcademicSemester);

export const AcademicSemesterRoutes = router;
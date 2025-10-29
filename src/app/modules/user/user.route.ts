import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();


// router.get('/', UserControllers.getAllStudents);
// router.get('/:studentID', UserControllers.getSingleStudent);
router.post('/create-student', validateRequest(studentValidations.createStudentValidation), UserControllers.createStudent);
// router.delete('/:studentID', UserControllers.deleteStudent);


export const UserRoutes = router;

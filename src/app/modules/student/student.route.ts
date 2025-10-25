import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentID', StudentController.getSingleStudent);
// router.post('/create-student', StudentController.createStudent);
router.delete('/:studentID', StudentController.deleteStudent);


export const StudentRoutes = router;

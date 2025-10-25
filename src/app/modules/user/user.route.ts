import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// router.get('/', UserControllers.getAllStudents);
// router.get('/:studentID', UserControllers.getSingleStudent);
router.post('/create-student', UserControllers.createStudent);
// router.delete('/:studentID', UserControllers.deleteStudent);


export const UserRoutes = router;

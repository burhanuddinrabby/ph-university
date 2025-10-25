import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentValidation } from './student.validation';
import sendResponse from '../../utils/sentResponse';
import status from 'http-status';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All Students fetched successfully',
      data: result,
    })
  } catch (error: any) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentID = req.params.studentID;
    const result = await StudentServices.getSingleStudentFromDB(studentID);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student fetched successfully',
      data: result,
    })
  } catch (error: any) {
    next(error);
  }
};
const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentID = req.params.studentID;
    const result = await StudentServices.deleteStudentFromDB(studentID);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    })
  } catch (error: any) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};

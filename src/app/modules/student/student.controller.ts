import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import * as z from "zod";
import { studentValidation } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    //zod validation
    const parsedData = studentValidation.parse(student);

    const result = await StudentServices.createStudentIntoDB(parsedData);
    
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || 'Something went wrong!',
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All Students fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentID = req.params.studentID;
    const result = await StudentServices.getSingleStudentFromDB(studentID);
    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};

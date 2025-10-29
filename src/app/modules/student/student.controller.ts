import { StudentServices } from './student.service';
import sendResponse from '../../utils/sentResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Students fetched successfully',
    data: result,
  })
});

const getSingleStudent = catchAsync(async (req, res) => {
  const studentID = req.params.studentID;

  const result = await StudentServices.getSingleStudentFromDB(studentID);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  })

});
const deleteStudent = catchAsync(async (req, res) => {
  const studentID = req.params.studentID;

  const result = await StudentServices.deleteStudentFromDB(studentID);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};

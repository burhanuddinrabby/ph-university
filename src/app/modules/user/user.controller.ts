import { UserServices } from "./user.service";
import sendResponse from "../../utils/sentResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {

    const { password, student } = req.body;

    //zod validation
    // const parsedData = studentValidation.parse(student);

    const result = await UserServices.createStudentIntoDB(password, student);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Student is created successfully',
        data: result,
    });
});

export const UserControllers = {
    createStudent
}
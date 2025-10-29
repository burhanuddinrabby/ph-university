import sendResponse from "../../utils/sentResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./semester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const { password } = req.body;

    const result = await AcademicSemesterServices.createSemesterIntoDB(password);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'New semester is created successfully!',
        data: result,
    });
});

export const AcademicSemesterController = {
    createAcademicSemester
}
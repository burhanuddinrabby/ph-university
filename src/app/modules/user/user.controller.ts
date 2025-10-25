import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sentResponse";
import status from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error: any) {
        next(error);
    }
};

export const UserControllers = {
    createStudent
}
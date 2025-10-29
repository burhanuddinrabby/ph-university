import { Request, Response, NextFunction } from "express";
import status from "http-status";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = status.INTERNAL_SERVER_ERROR;
    let message = err?.message || 'Something went wrong!'

    res.status(statusCode).json({
        success: false,
        message,
        err,
    });
}

export default globalErrorHandler;
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = err?.message || 'Something went wrong!'

    res.status(statusCode).json({
        success: false,
        message,
        err,
    });
}

export default globalErrorHandler;
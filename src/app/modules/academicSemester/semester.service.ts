import { TAcademicSemester } from "./semester.interface";
import { AcademicSemesterModel } from "./semester.model";

const createSemesterIntoDB = async (payload: TAcademicSemester) => {
    const result = await AcademicSemesterModel.create(payload);
    return result;
};


export const AcademicSemesterServices = {
    createSemesterIntoDB
}
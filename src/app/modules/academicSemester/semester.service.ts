import { AcademicSemesterModel } from "./semester.model";

const createSemesterIntoDB = async (studentData: any) => {
    const newStudent = await AcademicSemesterModel.create(studentData);
    return newStudent;
};


export const AcademicSemesterServices = {
    createSemesterIntoDB
}
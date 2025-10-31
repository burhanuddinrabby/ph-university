import { TAcademicSemester } from "../academicSemester/semester.interface";
import { UserModel } from "./user.model";

const lastStudentId = async () => {
    const lastStudent = await UserModel.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0
        }
    ).sort({
        createdAt: -1
    }).lean();

    //2024011018
    //2024 01 1018
    return lastStudent?.id.substring(6) || '0';
};

export const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
    const currentId = await lastStudentId();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`
    return incrementId;
}
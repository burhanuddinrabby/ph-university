import config from "../../config";
import { TAcademicSemester } from "../academicSemester/semester.interface";
import { AcademicSemesterModel } from "../academicSemester/semester.model";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    const userData: Partial<TUser> = {}

    //if pass not given and set role
    userData.password = password || (config.default_password as string);
    userData.role = 'student'

    //find academic semester info
    const admissionSemester = await AcademicSemesterModel.findOne({
        _id: studentData.admissionSemester
    });
    userData.id = await generateStudentId(admissionSemester as TAcademicSemester);
    
    //create a user
    const newUser = await UserModel.create(userData);

    //create student
    if (Object.keys(newUser).length) {
        //set id _id
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }
};


export const UserServices = {
    createStudentIntoDB
}
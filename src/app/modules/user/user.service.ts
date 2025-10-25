import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    const userData: Partial<TUser> = {}

    //if pass not given
    userData.password = password || (config.default_password as string);

    // set role
    userData.role = 'student'

    //manually generated id
    userData.id = '2025100001'


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
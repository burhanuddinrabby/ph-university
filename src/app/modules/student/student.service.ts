import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  if (await StudentModel.isUserExists(student.id)) {
    throw new Error("User already exists!");
  }
  const result = await StudentModel.create(student);


  //instance method
  /*const studentInstance = new StudentModel(student);
  
    //static methods
    if (await studentInstance.isUserExists(student.id)) {
      throw new Error("User already exists!");
    }
  
    const result = studentInstance.save(); */

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {
    isDeleted: true
  });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};

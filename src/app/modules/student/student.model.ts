import { Schema, model, connect } from 'mongoose';
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUsername,
} from './student.interface';

const userNameSchema = new Schema<IUsername>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: String,
  motherContactNo: String,
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: userNameSchema,
    required: true
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "{VALUE} is not a valid gender"
    },
    required: true
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active"
  },
  profileImg: String,
});

export const StudentModel = model<IStudent>('Student', studentSchema);

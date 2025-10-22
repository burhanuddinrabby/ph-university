import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  TUsername,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<TUsername>({
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

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, TStudentModel>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
    unique: [true, "Email is already exists!"],
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
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON:{
    virtuals: true
  }
});

//hashing the password using pre save middleware
studentSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(this?.password, Number(config.bcrypt_salt_round));

  next();
})

studentSchema.post('save', function(doc, next){
  doc.password = '';
  next();
});

studentSchema.virtual('fullname').get(function () {
  // return this.name?.firstName + ' ' + (
  //   this.name?.middleName
  // ) + this.name?.lastName;
  return this.name?.firstName + (this.name?.middleName ? (' ' + this.name?.middleName) : '') + ' ' + this.name?.lastName;
});

//find not deleted students
studentSchema.pre('find', function(next){
  //filter undeleted students
  this.find({
    isDeleted: {
      $ne: true
    }
  });
  next();
})
// studentSchema.post('find', function (doc, next) {
//   doc.forEach((d: { password: string; })  => d.password = '');
//   next();
// });

studentSchema.pre('findOne', function(next){
  //filter undeleted students
  this.find({
    isDeleted: {
      $ne: true
    }
  });
  next();
})
// studentSchema.post('findOne', function (doc, next) {
//   doc.password = '';
//   next();
// });

//instance method
/* studentSchema.methods.isUserExists = async function (id: string) {
  const user = await StudentModel.findOne({ id });
  return user;
} */
studentSchema.statics.isUserExists = async function (id: string) {

  const user = await StudentModel.findOne({ id });
  return user;

}

export const StudentModel = model<TStudent, TStudentModel>('Student', studentSchema);

import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./semester.interface";
import { months, semesterCode, semesterName } from "./semester.constants";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: semesterName,
        required: true
    },
    code: {
        type: String,
        enum: semesterCode,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    startMonth: {
        type: String,
        enum: months,
        required: true
    },
    endMonth: {
        type: String,
        enum: months,
        required: true
    },

}, {
    timestamps: true
}
);

export const AcademicSemesterModel = model<TAcademicSemester>('Semester', academicSemesterSchema);
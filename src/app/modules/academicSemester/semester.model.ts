import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./semester.interface";
import { months, semesterCode, semesterName } from "./semester.constants";
import { NextFunction, Request, Response } from 'express';

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: semesterName,
        required: true
    },
    code: {
        type: String,
        enum: semesterCode,
    },
    year: {
        type: String,
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

academicSemesterSchema.pre("save" as any, async function( next: NextFunction) {
    // check for existing semester with same name and year
    const isSemesterExist = await AcademicSemesterModel.findOne({
        name: this.name,
        year: this.year
    });

    if (isSemesterExist) {
        return next(new Error('Academic semester already exists'));
    }
    
    const codeMapper: { [key: string]: string } /* map type, key and value both string */ = {
        Spring: '01',
        Summer: '02',
        Fall: '03'
    }
    
    this.code = codeMapper[this.name] as any;
    next();

});

export const AcademicSemesterModel = model<TAcademicSemester>('Semester', academicSemesterSchema);
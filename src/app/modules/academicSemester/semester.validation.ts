import z from "zod";
import { months, semesterCode, semesterName } from "./semester.constants";

const createAcademicSemesterValidation = z.object({
    body: z.object({
        name: z.enum([...semesterName]),
        code: z.enum([...semesterCode]).optional(),
        year: z.string(),
        startMonth: z.enum([...months]),
        endMonth: z.enum([...months]),
    })
});

export const academicSemesterValidations = {
    createAcademicSemesterValidation
}
import z from "zod";

// username schema
const userNameValidation = z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
});

// guardian schema
const guardianValidation = z.object({
    fatherName: z.string().min(1, "Father name is required"),
    fatherOccupation: z.string().min(1, "Father occupation is required"),
    fatherContactNo: z.string().min(1, "Father contact no is required"),
    motherName: z.string().min(1, "Mother name is required"),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
});

// local guardian schema
const localGuardianValidation = z.object({
    name: z.string().min(1, "Local guardian name is required").max(25, "Name can't be more than 25 characters"),
    occupation: z.string().min(1, "Local guardian occupation is required"),
    contactNo: z.string().min(1, "Local guardian contact no is required"),
    address: z.string().min(1, "Local guardian address is required"),
});

// main student schema
export const createStudentValidation = z.object({
    body: z.object({
        password: z.string().min(8, "Password must be minimum 8 characters"),
        student: z.object({
            name: userNameValidation,
            gender: z.enum(["male", "female", "other"], "Invalid gender"),
            dateOfBirth: z.string().optional(),
            email: z.email("Invalid email address"),
            contactNo: z.string().min(1, "Contact number is required"),
            emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
            bloodGroup: z
                .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"])
                .optional(),
            presentAddress: z.string().min(1, "Present address is required"),
            permanentAddress: z.string().min(1, "Permanent address is required"),
            guardian: guardianValidation,
            localGuardian: localGuardianValidation,
            profileImg: z.url("Invalid URL").optional(),
            admissionSemester: z.string()
        })
    })
});

export const studentValidations = {
    createStudentValidation
}
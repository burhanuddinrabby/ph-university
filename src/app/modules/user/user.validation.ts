import z from "zod";

const userValidationSchema = z.object({
    password: z.string({
        error: 'Password must be string'
    }).max(20, { message: 'Password can\'t be more than 20 characters' }).optional()

});

export default userValidationSchema;
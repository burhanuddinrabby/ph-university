import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema <TUser>({
    id : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
//hashing the password using pre save middleware
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(this?.password, Number(config.bcrypt_salt_round));

    next();
})

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
export const UserModel = model<TUser>('User', userSchema);
import mongoose, { model } from "mongoose";

export interface IUser extends Document{
    name: String;
    email: String;
    userTypeId: number
    password?: String;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: [true, 'is required field'] },
    email: {
        type: String,
        required: [true, 'is required field'],
        unique: true,
        lowercase: true,
    },
    userTypeId: {type: Number, default: 2},
    password: {
        type: String,
        required: [true, 'is required field'],
        select: false,
    },
},
{ timestamps: true });

const User = model<IUser>('user', userSchema);

export default User;
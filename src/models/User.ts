import mongoose, { model } from "mongoose";

export interface IUser extends Document{
    name: String;
    email: String;
    userTypeId: number,
    uid?: String,
    gender?: String,
    password?: String;
    profileImage? : String,
    mobile: Number
}

const userSchema = new mongoose.Schema<IUser>({
    uid: {type: String},
    name: { type: String, required: [true, 'is required field'] },
    email: {
        type: String,
        required: [true, 'is required field'],
        unique: true,
        lowercase: true,
    },
    mobile: {type: Number},
    userTypeId: {type: Number, default: 2},
    gender: {type: String, enum:['Male', 'Female', 'Other']},
    profileImage: {type: String},
    password: {
        type: String,
        select: false,
    },
},
{ timestamps: true });

const User = model<IUser>('user', userSchema);

export default User;
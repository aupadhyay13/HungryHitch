import {Schema, model} from 'mongoose';

export interface User{
    email:string;
    password: string;
    name:string;
    address:string;
    isAdmin:boolean;
    isDisabled:boolean;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, default:null},
    isAdmin: {type: Boolean, required: true},
    isDisabled: {type: Boolean, default: false}
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);
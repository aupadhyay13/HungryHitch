import {Schema, model} from 'mongoose';

export interface Resturant{
    name:string;
    description:string;
    address:string;
    logo: String;
    isDisabled: Boolean;
}

export const ResturantSchema = new Schema<Resturant>(
    {
        name: {type: String, required:true},
        description: {type: String, required:true},
        address: {type: String, required:true},
        logo: {type: String, required:false},
        isDisabled: {type: Boolean, default: false}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const ResturantModel = model<Resturant>('resturant', ResturantSchema);
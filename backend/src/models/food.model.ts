import {Schema, model} from 'mongoose';

export interface Food{
    name:string;
    price:number;
    cookTime:string;
    image: String;
    isDisabled: Boolean;
}

export const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        cookTime: {type: String, required:true},
        image: {type: String, required:true},
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

export const FoodModel = model<Food>('food', FoodSchema);
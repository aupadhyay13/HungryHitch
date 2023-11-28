import mongoose, {Schema, model} from 'mongoose';

export interface Food{
    name:string;
    price:number;
    cookTime:string;
    image: String;
    isDisabled: Boolean;
    resturant: Schema.Types.ObjectId;
    categories: Schema.Types.Array;
}

export const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        cookTime: {type: String, required:true},
        image: {type: String, required:false},
        isDisabled: {type: Boolean, default: false},
        resturant: {type: Schema.Types.ObjectId, ref: 'resturants'},
        categories: {type: Array,default: []}
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
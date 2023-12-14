import mongoose from "mongoose";
const { ObjectId } = require("mongodb");
import { Cloudinary } from "../../../helpers/cloudinary";
import { Utils } from "../../../helpers/utils";
import { Category, CategoryModel } from "../../../models/category.model";
import { Food, FoodModel } from "../../../models/food.model";
import { Resturant, ResturantModel } from "../../../models/resturant.model";
import { User, UserModel } from "../../../models/user.model";
import bcrypt from 'bcryptjs';
import { OrderModel } from "../../../models/order.model";
export class AdminUtil{
    private utils: Utils = new Utils();
    private cloudinary : any = new Cloudinary();
    public async createAdmin(adminObj){
        try{
            const {name, email, address, password} = adminObj;
            const encryptedPassword = await bcrypt.hash(password, 10);

            const admin:any = {
              name,
              email: email.toLowerCase(),
              password: encryptedPassword,
              isAdmin: true
            }
        
            const adminUser = await UserModel.create(admin);
            return await this.utils.jwt(adminUser);
        }catch(err){
            console.log("Error in creating Admin isss--->",err);
            throw err;
        }
        
    }

    public async login(reqObj){
        try{
            const {email, password} = reqObj;
            const user = await UserModel.findOne({email});
          
             if(user && (await bcrypt.compare(password,user.password))) {
                return await this.utils.jwt(user);
             }
             else{
                return false;
             }
        }catch(err){
            console.log("Error in Login API isss--->",err);
            throw err;
        }
    }

    public async addFoodItem(foodObj){
        try{
            let imgResult;
            console.log("foodObj is--->",foodObj.file);
            if(foodObj.file){
                imgResult = await this.cloudinary.uploadImage(foodObj);
            }
          
           
            const {name,cookTime,price,resturant,categories} = foodObj.body;

            const foodItem: Food = {
                name,
                cookTime,
                price: +price,
                resturant: new ObjectId(resturant),
                categories: categories.split(","),
                image : imgResult ? imgResult.url : '',
                isDisabled: false
              }
          
              const fItem = await FoodModel.create(foodItem);
              return fItem;
        }catch(err){
            console.log("Error in creating food item isss--->",err);
            throw err;
        }
    }

    public async addResturant(restObj){
        try{
            let imgResult;
            console.log("restObj is--->",restObj.file);
            if(restObj.file){
                imgResult = await this.cloudinary.uploadImage(restObj);
            }
          
           
            const {name,address,description} = restObj.body;

            const resturantItem: Resturant = {
                name,
                address,
                description,
                logo : imgResult ? imgResult.url : '',
                isDisabled: false
              }
          
              const rItem = await ResturantModel.create(resturantItem);
              return rItem;
        }catch(err){
            console.log("Error in creating food item isss--->",err);
            throw err;
        }
    }

    public async addFoodCategory(restObj){
        try{
            const {name,description} = restObj.body;

            const categoryItem: Category = {
                name,
                description
              }
          
              const catItem = await CategoryModel.create(categoryItem);
              return catItem;
        }catch(err){
            console.log("Error in creating food category isss--->",err);
            throw err;
        }
    }


    public async getFoodItems(){
        try{
          
              const data = await FoodModel.find({});
              return data;
        }catch(err){
            console.log("Error in getting food item list isss--->",err);
            throw err;
        }
    }

    public async getResturants(){
        try{
          
              const data = await ResturantModel.find({});
              return data;
        }catch(err){
            console.log("Error in getting resturant list isss--->",err);
            throw err;
        }
    }

    public async getCategories(){
        try{
          
              const data = await CategoryModel.find({});
              return data;
        }catch(err){
            console.log("Error in getting category list isss--->",err);
            throw err;
        }
    }


    public async getAdminList(){
        try{
          
              const data = await UserModel.find({isAdmin: true});
              return data;
        }catch(err){
            console.log("Error in getting admin list isss--->",err);
            throw err;
        }
    }

    public async changeAdminStatus(_id, status){
        try{
                console.log("_id is--->",_id);
                console.log("status is--->",status);
              const data = await UserModel.updateOne({_id: _id}, {$set: {isDisabled : status}});
              return data;
        }catch(err){
            console.log("Error in getting admin list isss--->",err);
            throw err;
        }
    }

    public async changeFoodStatus(_id, status){
        try{
                console.log("_id is--->",_id);
                console.log("status is--->",status);
              const data = await FoodModel.updateOne({_id: _id}, {$set: {isDisabled : status}});
              return data;
        }catch(err){
            console.log("Error in getting admin list isss--->",err);
            throw err;
        }
    }

    public async changeResturantStatus(_id, status){
        try{
                console.log("_id is--->",_id);
                console.log("status is--->",status);
              const data = await ResturantModel.updateOne({_id: _id}, {$set: {isDisabled : status}});
              return data;
        }catch(err){
            console.log("Error in getting resturant status isss--->",err);
            throw err;
        }
    }


    public async getUserList(){
        try{
          
              const data = await UserModel.find({isAdmin: false});
              return data;
        }catch(err){
            console.log("Error in getting admin list isss--->",err);
            throw err;
        }
    }

    public async getOrderList(){
        try{
          
              const data = await OrderModel.find({}).sort({"createdAt" : -1});
              return data;
        }catch(err){
            console.log("Error in getting food item list isss--->",err);
            throw err;
        }
    }

}
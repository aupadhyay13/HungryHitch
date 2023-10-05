import { Constants } from "../../../configs/constants";
import { UserModel } from "../../../models/user.model";
import { AdminUtil } from "./adminUtil";
import { Request, Response } from "express";
export class AdminController{
    private adminUtil: AdminUtil = new AdminUtil();
    public createAdmin =  async (req: Request, res : Response) => {
        try{
            const {email} = req.body;
            const user = await UserModel.findOne({email});
            if(user){
                res.status(200)
                .send({
                    message: 'User is already exist for this email, please create with another email!',
                    status: Constants.FAIL
                });
                return;
              }else{
                const result = await this.adminUtil.createAdmin(req.body);
                res.status(200).send({
                    status : Constants.SUCCEESS,
                    message: "Admin Created Successfully!",
                    data: result
                })
              }
            
        }catch(error){
            console.log("Error is---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error in creating your account.Please try again later."
            })
        }
        
    }

    public login =  async (req: Request, res : Response) => {
        try{
            const result = await this.adminUtil.login(req.body);
            if(result){
                res.status(200).send({
                    status: Constants.SUCCEESS,
                    message: "You are logged in successully!",
                    data: result
                })
            }else{
                res.status(200).send({
                    status: Constants.FAIL,
                    message: "Sorry email or password is incorrect!",
                })
            }
        }catch(error){
            console.log("Error in Login---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error.Please try again later."
            })
        }
        
    }


    public addProduct =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.addFoodItem(req.body);
            res.status(200).send({
                status: Constants.SUCCEESS,
                message: "Food Item Created Successfully!"
            })
        }catch(error){
            console.log("Error in adding product---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while adding product.Please try again later."
            })
        }
        
    }

    public getProducts =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.getFoodItems();
            res.status(200).send({
                status: Constants.SUCCEESS,
                data: result
            })
        }catch(error){
            console.log("Error in getting products---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching products.Please try again later."
            })
        }
        
    }
}
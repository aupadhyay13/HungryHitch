import { Constants } from "../../../configs/constants";
import { UserModel } from "../../../models/user.model";
import { UserUtil } from "./userUtil";
import { Request, Response } from "express";
export class UserController{
    private userUtil: UserUtil = new UserUtil();
    public signUp =  async (req: Request, res : Response) => {
        try{
            const {email} = req.body;
            const user = await UserModel.findOne({email});
            if(user){
                res.status(200)
                .send({
                    message: 'User is already exist, please login!',
                    status: Constants.FAIL
                });
                return;
              }else{
                const result = await this.userUtil.signUpUser(req.body);
                res.status(200).send({
                    status : Constants.SUCCEESS,
                    message: "Your account Created Successfully!",
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
            const result = await this.userUtil.login(req.body);
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

    public getProducts =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.userUtil.getFoodItems();
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
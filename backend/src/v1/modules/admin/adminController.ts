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
            console.log("result is----->",result);
        
            if(result){
                if(result['isDisabled']){
                    res.status(200).send({
                        status: Constants.FAIL,
                        message: "Sorry your account is disabled.Please contact support to enable it.",
                    })
                }else{
                    res.status(200).send({
                        status: Constants.SUCCEESS,
                        message: "You are logged in successully!",
                        data: result
                    })
                }
               
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
           
            const result = await this.adminUtil.addFoodItem(req);
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

    public addResturant =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.addResturant(req);
            res.status(200).send({
                status: Constants.SUCCEESS,
                message: "Resturant added Successfully!"
            })
        }catch(error){
            console.log("Error in adding product---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while adding resturant.Please try again later."
            })
        }
        
    }

    public addFoodCategory =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.addFoodCategory(req);
            res.status(200).send({
                status: Constants.SUCCEESS,
                message: "Category added Successfully!"
            })
        }catch(error){
            console.log("Error in adding category---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while adding food category.Please try again later."
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

    public getCategoryList =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.getCategories();
            res.status(200).send({
                status: Constants.SUCCEESS,
                data: result
            })
        }catch(error){
            console.log("Error in getting categories---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching categories.Please try again later."
            })
        }
        
    }

    public getResturants =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.getResturants();
            res.status(200).send({
                status: Constants.SUCCEESS,
                data: result
            })
        }catch(error){
            console.log("Error in getting resturants---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching resturants.Please try again later."
            })
        }
        
    }

    public getAdminList =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.getAdminList();
            res.status(200).send({
                status: Constants.SUCCEESS,
                data: result
            })
        }catch(error){
            console.log("Error in getting admins---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching admin list.Please try again later."
            })
        }
        
    }

    public changeAdminStatus =  async (req: Request, res : Response) => {
        try{
            const {_id , status} = req.query;

            const result = await this.adminUtil.changeAdminStatus(_id, status);
            res.status(200).send({
                status: Constants.SUCCEESS,
                message: "Status Changed Successfully!"
            })
        }catch(error){
            console.log("Error in updaing admin status---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while updating admin status.Please try again later."
            })
        }
        
    }

    public getUserList =  async (req: Request, res : Response) => {
        try{
           
            const result = await this.adminUtil.getUserList();
            res.status(200).send({
                status: Constants.SUCCEESS,
                data: result
            })
        }catch(error){
            console.log("Error in getting user---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching user list.Please try again later."
            })
        }
        
    }


    public changeFoodStatus =  async (req: Request, res : Response) => {
        try{
            const {_id , status} = req.query;

            const result = await this.adminUtil.changeFoodStatus(_id, status);
            res.status(200).send({
                status: Constants.SUCCEESS,
                message: "Status Changed Successfully!"
            })
        }catch(error){
            console.log("Error in updaing food status---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while updating food status.Please try again later."
            })
        }
        
    }

    public changeResturantStatus =  async (req: Request, res : Response) => {
        try{
            const {_id , status} = req.query;

            const result = await this.adminUtil.changeResturantStatus(_id, status);
            res.status(200).send({
                status: Constants.SUCCEESS,
                message: "Status Changed Successfully!"
            })
        }catch(error){
            console.log("Error in updaing resturant status---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while updating food status.Please try again later."
            })
        }
        
    }
}
import { Constants } from "../../../configs/constants";
import { orderStratus } from "../../../configs/order_status";
import { Cloudinary } from "../../../helpers/cloudinary";
import { Utils } from "../../../helpers/utils";
import { OrderModel } from "../../../models/order.model";
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
                if(result.isDisabled){
                    res.status(200).send({
                        status: Constants.FAIL,
                        message: "Your account is currently disabled.Please contact support.",
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


    public getProduct =  async (req: Request, res : Response) => {
        try{
           
            const {foodId} = req.query;
            const result = await this.userUtil.getFoodItem(foodId);
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

    public getUserProfile =  async (req: Request, res : Response) => {
        try{
           
            const {_id} = req['authUser'];
            const result = await this.userUtil.getUserProfile(_id);
            res.status(200).send({
                status: Constants.SUCCEESS,
                data: result
            })
        }catch(error){
            console.log("Error in getting user profile---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching user profile.Please try again later."
            })
        }
        
    }

    public updateProfile =  async (req: Request, res : Response) => {
        try{
            const { email } =  req.body;
            const result = await this.userUtil.updateUserProfile(req.body,email);
           if(result){
                res.status(200).send({
                    status: Constants.SUCCEESS,
                    message: "Your Profile Updated Successfully!",
                    data: result
                })
           }else{
            res.status(200).send({
                status: Constants.FAIL,
                message: "Sorry! email already associated with another user.",
                data: result
            })
           }

        }catch(error){
            console.log("Error in updating profile---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while updating your profile.Please try again later."
            })
        }
        
    }


    public createOrder =  async (req: Request, res : Response) => {
        try{
            const requestOrder = req.body;

             if(requestOrder.items.length <= 0){
                    res.status(400).send('Cart Is Empty!');
                    return;
             }

            await OrderModel.deleteOne({
                user: requestOrder.userId,
                status: orderStratus.NEW
            });

            const newOrder = new OrderModel({...requestOrder,user: requestOrder.userId});
            await newOrder.save();
            res.send(newOrder);

        }catch(error){
            console.log("Error in creating order---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while creating order.Please try again later."
            })
        }
        
    }

    public getNewOrderForUser =  async (req: Request, res : Response) => {
        try{
            const { _id } =  req['authUser']
            const order= await this.userUtil.getNewOrderForCurrentUser(_id);
            if(order) res.send(order);
            else res.status(400).send();
        }catch(error){
            console.log("Error in getting new order for current user---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while fetching new order for current user.Please try again later."
            })
        }
        
    }

    public pay =  async (req: Request, res : Response) => {
        try{
            const {paymentId, userId} = req.body;
            const order = await this.userUtil.getNewOrderForCurrentUser(userId);
            if(!order){
                res.status(400).send('Order Not Found!');
                return;
            }
        
            order.paymentId = paymentId;
            order.status = orderStratus.PAID;
            await order.save();
        
            res.send(order._id);

        }catch(error){
            console.log("Error in paying order---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while paying order.Please try again later."
            })
        }
        
    }


    public orderTrack =  async (req: Request, res : Response) => {
        try{
            const order = await OrderModel.findById(req.params.id);
            res.send(order);
        }catch(error){
            console.log("Error in tracking order for user---->",error);
            res.status(400).send({
                status : Constants.FAIL,
                message: "There is an error while tracking order for user.Please try again later."
            })
        }
        
    }


}
import { Request, Response } from "express";
import { Utils } from "./helpers/utils";
import { UserModel } from "./models/user.model";
import { Constants } from "./configs/constants";
export class Middleware {
    private utils: Utils = new Utils();
    public getAuthorizedAdmin= async (req: Request, res : Response, next: () => void) => {
        try{
            console.log(`Request body for ${req.url} ==> `, req.body);
            const tokenInfo : any= this.utils.decodeAuthToken(req.headers.authorization);
            console.log("tokenInfo is------>",tokenInfo);
            if(tokenInfo){
                const result: any = await UserModel.find({ _id: tokenInfo.id, isAdmin: true });
                if(result){
                    console.log("admin login chheeeee bhai");
                    next();
                }else{
                    res.status(400).send({
                        staus: Constants.FAIL,
                        error: "You are unauthorized!",
                      });
                }
            }else{
                res.status(400).send({
                    staus: Constants.FAIL,
                    error: "You are unauthorized!",
                  });
            }
            
        }catch(err){
            console.log("Error in middleare is--->",err);
            res.status(400).send({
                staus: Constants.FAIL,
                error: "You are unauthorized!",
              });
        }
    }

    public getAuthorizedUser= async (req: Request, res : Response, next: () => void) => {
        try{
            console.log(`Request body for ${req.url} ==> `, req.body);
            const tokenInfo : any= this.utils.decodeAuthToken(req.headers.authorization);
            console.log("tokenInfo is------>",tokenInfo);
            if(tokenInfo){
                const result: any = await UserModel.find({ _id: tokenInfo.id});
                if(result){
                    console.log("User login chheeeee bhai");
                    next();
                }else{
                    res.status(400).send({
                        staus: Constants.FAIL,
                        error: "You are unauthorized!",
                      });
                }
            }else{
                res.status(400).send({
                    staus: Constants.FAIL,
                    error: "You are unauthorized!",
                  });
            }
            
        }catch(err){
            console.log("Error in middleare is--->",err);
            res.status(400).send({
                staus: Constants.FAIL,
                error: "You are unauthorized!",
              });
        }
    }
}
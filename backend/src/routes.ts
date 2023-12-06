import express from "express";
import { UserRoute } from "./v1/modules/user/userRoute";
import { AdminRoute } from "./v1/modules/admin/adminRoute";

export class Routes{
    constructor() {
  
      }
    
    public path(){
        const router = express.Router();

        router.use('/user',UserRoute);
        router.use('/admin',AdminRoute);
        return router;
    }


}
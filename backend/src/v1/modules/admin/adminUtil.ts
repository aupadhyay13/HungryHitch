import { Utils } from "../../../helpers/utils";
import { User, UserModel } from "../../../models/user.model";
import bcrypt from 'bcryptjs';
export class AdminUtil{
    private utils: Utils = new Utils();
    public async createAdmin(adminObj){
        try{
            const {name, email, address, password} = adminObj;
            const encryptedPassword = await bcrypt.hash(password, 10);

            const admin:User = {
              name,
              email: email.toLowerCase(),
              password: encryptedPassword,
              address,
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

}
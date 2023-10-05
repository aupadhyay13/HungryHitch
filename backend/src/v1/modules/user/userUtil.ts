import bcrypt from 'bcryptjs';
import { User, UserModel } from '../../../models/user.model';
import { Utils } from '../../../helpers/utils';
import { FoodModel } from '../../../models/food.model';
export class UserUtil{
    private utils: Utils = new Utils();
    public async signUpUser(userObj){
        try{
            console.log("aai gyu util maaaa");
            const {name, email, address, password} = userObj;
            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser:User = {
              name,
              email: email.toLowerCase(),
              password: encryptedPassword,
              address,
              isAdmin: false
            }
        
            const dbUser = await UserModel.create(newUser);
            return await this.utils.jwt(dbUser);
        }catch(err){
            console.log("Error in signup API isss--->",err);
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

    public async getFoodItems(){
        try{
          
              const data = await FoodModel.find({});
              return data;
        }catch(err){
            console.log("Error in creating food item isss--->",err);
            throw err;
        }
    }
}
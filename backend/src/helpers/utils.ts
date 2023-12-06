import jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";
export class Utils{
    public jwt = async (user : any) => {
        console.log("user isssss-------->",user);
        const token = jwt.sign({
          id: user._id, email:user.email, isAdmin: user.isAdmin
        },'dd56gfg8uh23gdkc09afshdvcfsda5',{
          expiresIn:"30d"
        });
      
        return {
          email: user.email,
          name: user.name,
          address: user.address,
          isDisabled: user.isDisabled,
          token: token
        };
      }

      public decodeAuthToken(token: string) {
        if (token) {
          try {
            return jwt.verify(token, 'dd56gfg8uh23gdkc09afshdvcfsda5');
          } catch (error) {
            return false;
          }
        }
        return false;
      }

      public deleteFile(folderName,fileName){
        console.log("aayu ho lyaaaa");
        const filePathToDelete = path.join(__dirname,"..", folderName, fileName);
        console.log("filePathToDelete is--->",filePathToDelete);
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(filePathToDelete)) {
          // Delete the file
          fs.unlinkSync(filePathToDelete);
          console.log('File deleted successfully.');
        } else {
          console.log('File not found. Unable to delete.');
        }
      }

}
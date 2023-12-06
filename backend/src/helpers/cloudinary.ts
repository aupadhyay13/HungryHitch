import {v2 as cloudinary} from 'cloudinary';
import streamifier from "streamifier";
export class Cloudinary{

    public async uploadImage(req){
        cloudinary.config({ 
            cloud_name: 'd******x', 
            api_key: '1*******5', 
            api_secret: 'd************' 
          });
          let streamUpload = async (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
            let result = await streamUpload(req);
            return result;
    }
}


import jwt from 'jsonwebtoken';
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

}
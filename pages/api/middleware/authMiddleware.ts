// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";

const authMiddleware = (handler: any) => {
  return async (req: any, res: any) => {
    const token = await getToken({ req });
    if (token) {
      // Signed in
      console.log("JSON Web Token", JSON.stringify(token, null, 2));
      await connect();
      const { User } = await UserSchema(); // connect to database
      const userInfo = await User.findOne({"_id": token.sub});
      if(userInfo){
        if(userInfo.isDeleted){
          res.status(401).json({ status: false, user: userInfo, title: "Profile deleted!", message: "Opps! You profile has been deleted. Please, Talk with technical team."});
        }
        else if(!userInfo.isActive){
          res.status(401).json({ status: false, user: userInfo, title: "Profile blocked!", message: "Opps! You profile has been blocked by admin. Please, Talk with technical team."});
        }
        else {
          return handler(req, res);
        }
      }
      else {
        res.status(401).json({ status: false, title: "User not exist", message: "Opps! User not exist with provided information."})
      }
    } else {
      res.status(401).json({ status: false, title: "Unauthorised user", message: "Opps! Login info not found. Please, try again."})
    }
  }
}

export default authMiddleware;
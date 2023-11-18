import { getToken } from "next-auth/jwt";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";

const sellerMiddleware = (handler: any) => {
    return async (req: any, res: any) => {
        const token = await getToken({ req });
        if(token){
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
                else if(userInfo.user_role != "Seller"){
                    res.status(401).json({ status: false, user: userInfo, title: "Not Seller profile", message: "Opps! You profile is not seller account. Please, Become a seller to access service."});
                }
                else {
                    return handler(req, res);
                }
            }
            else {
                res.status(401).json({ status: false, title: "User not exist", message: "Opps! User not exist with provided information."})
            }
        }
        else {
            res.status(401).json({status: false, title: "Unauthorised access", message: "Opps! Trying to access without API token"});
        }
    }
}

export default sellerMiddleware;
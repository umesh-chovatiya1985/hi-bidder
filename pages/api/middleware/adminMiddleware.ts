import { getToken } from "next-auth/jwt";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";

const adminMiddleware = (handler: any) => {
    return async (req: any, res: any) => {
        const token = await getToken({ req });
        if(token){
            await connect();
            const { User } = await UserSchema();
            const userInfo = await User.findOne({"_id": token.sub});
            if(userInfo){
                if(userInfo.isDeleted){
                    res.status(401).json({status: false, title: "Admin deleted!", message: "Opps! Admin has been deleted, Please, talk with technical team"});
                }
                else if(!userInfo.isActive){
                    res.status(401).json({status: false, title: "Admin blocked!", message: "Opps! Admin has been blocked, Please, talk with technical team"});
                }
                else if(userInfo.user_role != 'Admin'){
                    res.status(401).json({status: false, title: "User role not matched!", message: "Opps! You are not authorised user to access the service."});
                }
                else {
                    return handler(req, res);
                }
            }
            else {
                res.status(401).json({status: false, title: "Not user found", message: "Opps! No any user found as Admin user."});
            }
        }
        else {
            res.status(401).json({status: false, title: "Unauthorised access", message: "Opps! Not found required API token."})
        }
    }
}
export default adminMiddleware;
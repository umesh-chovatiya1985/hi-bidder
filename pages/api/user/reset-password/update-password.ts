import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/connection";
import { ResetPasswordSchema } from "../../../../utils/schemas/resetpasswordSchema";
import { UserSchema } from "../../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { verifyToken } from "../../middleware/JWTUtil";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const authHeader = req.headers['authorization'];
            if(!authHeader){
                return res.status(200).json({status: 0, message: "Sorry, Unauthorised access! Trying to access authorised api."});
            }
            const jwtToken = authHeader.split(" ")[1];
            const jwtUser = verifyToken(jwtToken);
            if(!jwtUser){
                return res.status(200).json({status: 0, message: "Sorry! Provided token is not valid or expired. Please, try again later."});
            }
            const { ResetPassword } = await ResetPasswordSchema();
            const resp = await ResetPassword.findOne({user_id: jwtUser.sub, isActive: true});
            if(!resp){
                return res.status(200).json({status: 0, message: "Sorry! Provided token is not valid or expired. Please, try again later."});            
            }
            const password = req.body.password;
            const  { User } = await UserSchema();
            /** Password encrypted */
            const hash = createHash('sha256');
            hash.update(password);
            const encripted = hash.digest('hex');
            /** End of password encrypted */
            const passwordData = { password: encripted };
            const respo = await User.findByIdAndUpdate(jwtUser.sub, passwordData);
            if(respo){
                await ResetPassword.findByIdAndDelete(resp._id);
                return res.status(200).json({status: 1, message: "Your password has been reset successfully."});    
            }
            return res.status(200).json({status: 0, message: "Some error found on server, Try after sometime", response: respo});
        }
    };
    const response = await handleCase[method];
    if(response) response(req, res);
    else res.status(401).json({error: "Provided method is invalid"});
}
export default handler;
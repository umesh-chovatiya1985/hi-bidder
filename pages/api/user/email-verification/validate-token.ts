import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/connection";
import { UserSchema } from "../../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { verifyToken } from "../../middleware/JWTUtil";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const userToken = req.body.userToken;
            const jwtUser = await verifyToken(userToken);
            if(jwtUser){
                const { User } = await UserSchema();
                const resp = await User.findOne({_id: jwtUser.sub, isActive: true});
                if(!resp){
                    return res.status(200).json({status: 0, message: "Sorry! Provided token is not valid or expired. Please, try again later."});            
                }
                if(resp.emailVerified){
                    return res.status(200).json({status: 1, message: "Email Id already verified by you. Thanks for recheck."});            
                }
                resp.emailVerified = true;
                await resp.save();
                return res.status(200).json({status: 1, message: "Great! User Email Id verified successfully."});    
            }
            return res.status(200).json({status: 0, message: "Sorry! Provided token is not valid or expired. Please, try again later."});    
        }
    }

    const response = await handleCase[method];
    if(response) response(req, res);
    else res.status(401).json({error: "Not valid method request"});
}

export default handler;
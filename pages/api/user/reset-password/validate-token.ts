import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../utils/connection";
import { ResetPasswordSchema } from "../../../../utils/schemas/resetpasswordSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { verifyToken } from "../../middleware/JWTUtil";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const userToken = req.body.userToken;
            const user = req.body.user;
            const jwtUser = await verifyToken(userToken);
            console.log(jwtUser);
            if(jwtUser){
                if(jwtUser.user != user){
                    return res.status(200).json({status: 0, message: "Not authorised to reset password link. Please, check url again and try later."});            
                }
                const { ResetPassword } = await ResetPasswordSchema();
                const resp = await ResetPassword.findOne({user_id: jwtUser.sub, isActive: true});
                if(!resp){
                    return res.status(200).json({status: 0, message: "Sorry! Provided token is not valid or expired. Please, try again later."});            
                }
                return res.status(200).json({status: 1, message: "Great! user has valid request link"});    
            }
            return res.status(200).json({status: 0, message: "Sorry! Provided token is not valid or expired. Please, try again later."});    
        }
    }

    const response = await handleCase[method];
    if(response) response(req, res);
    else res.status(401).json({error: "Not valid method request"});
}

export default handler;
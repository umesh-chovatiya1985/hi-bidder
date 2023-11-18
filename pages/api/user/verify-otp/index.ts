import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import { connect } from "../../../../utils/connection";
import { UserSchema } from "../../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const requestType = req.body.type ?? "contact";
            const errorMessage = requestType == 'contact' ? "Contact No is required!" : "Email Id is required!";
            let bodyData = JSON.parse(req.body.data);
            if(requestType == 'contact'){
                if(!bodyData.contact_otp){
                    return res.status(200).json({status: 0, message: "Otp is required field."});
                }
                if(bodyData.contact_otp == ""){
                    return res.status(200).json({status: 0, message: "Otp is required field."});
                }
            }
            if(requestType == 'email'){
                if(!bodyData.email_otp){
                    return res.status(200).json({status: 0, message: "Otp is required field."});
                }
                if(bodyData.email_otp == ""){
                    return res.status(200).json({status: 0, message: "Otp is required field."});
                }
            }
            bodyData._id = token.sub;
            const { User } = await UserSchema();
            const existUser = await User.findOne(bodyData);
            if(!existUser){
                return res.status(200).json({status: 0, message: "Otp not matched with account. Please, try again"});
            }
            if(requestType == 'contact'){
                existUser.is_contact_verified = true;
                existUser.contact_otp = "";
            }
            if(requestType == 'email'){
                existUser.emailVerified = true;
                existUser.email_otp = "";
            }
            await existUser.save().then((resp: any) => {
                     res.json({status: 1, message: requestType =='contact' ? "Contact No verified successfully" : "Email Id verified successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const requestType = req.body.type ?? "contact";
            const errorMessage = requestType == 'contact' ? "Contact No is required!" : "Email Id is required!"
            if(!req.body.contact){
                return res.status(200).json({status: 0, message: errorMessage});
            }
            if(req.body.contact == ''){
                return res.status(200).json({status: 0, message: errorMessage});
            }
            const { User } = await UserSchema();
            const existUser = await User.findOne({contact: req.body.contact, _id: { $ne: token.sub }});
            if(existUser){
                return res.status(200).json({status: 0, message: "Fail to send Otp, User already exist with provided Contact No."});
            }
            const userData = await User.findById(token.sub);
            userData.contact = req.body.contact;
            userData.contact_otp = (Math.floor(100000 + Math.random() * 900000)).toString();
            userData.save();
            return res.status(200).json({status: 1, message: "OTP sent successfully"});
        }
    }

    const response = handleCase[method];
    if(response) response(req, res);
    else res.status(400).json({message: "Invalid request type."});
}

export default handler;
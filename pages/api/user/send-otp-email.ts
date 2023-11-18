import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const requestType = req.body.type ?? "contact";
            const errorMessage = requestType == 'contact' ? "Contact No is required!" : "Email Id is required!"
            if(!req.body.email){
                return res.status(200).json({status: 0, message: errorMessage});
            }
            if(req.body.email == ''){
                return res.status(200).json({status: 0, message: errorMessage});
            }
            const { User } = await UserSchema();
            const existEmail = await User.findOne({email: req.body.email});
            if(!existEmail){
                return res.status(200).json({status: 0, message: "User does not exist with provided email."});
            }
            existEmail.contact_otp = (Math.floor(100000 + Math.random() * 900000)).toString();
            existEmail.save();
            return res.status(200).json({status: 1, message: "OTP sent successfully"});
        }
    }

    const response = handleCase[method];
    if(response) response(req, res);
    else res.status(400).json({message: "Invalid request type."});
}

export default handler;
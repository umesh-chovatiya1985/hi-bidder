import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { contactotpSchema } from "../../../utils/schemas/contactotpSchema";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
            const existContact = await User.findOne({contact: req.body.contact});
            if(existContact){
                return res.status(200).json({status: 0, user: existContact, message: "User already exist with provided contact no."});
            }
            const { ContactOtp } = await contactotpSchema();
            const otpExist = await ContactOtp.findOne({contactno: req.body.contact});
            if(otpExist){
                const present_date = new Date();
                const otpDate: any = otpExist.createdOn;
                const otpDatetime = new Date(otpDate);
                const otpWaiting = 1000;
                var Result = Math.floor(Math.round(present_date.getTime() - otpDatetime.getTime()) / (otpWaiting));
                if(Result < parseInt(process.env.OTP_WAIT_TIME))
                {
                    return res.status(200).json({status: 0, message: "Request failed! Wait for new request for resend OTP."});
                }
                otpExist.contact_otp = (Math.floor(100000 + Math.random() * 900000)).toString();
                otpExist.isVerified = false;
                await otpExist.save();
                return res.status(200).json({status: 1, Result: Result, message: "OTP sent successfully"});
            }            
            const requestBody = {contactno: req.body.contact, contact_otp: "123000"};
            await ContactOtp.create(requestBody);
            return res.status(200).json({status: 1, message: "OTP sent successfully"});
        }
    }

    const response = handleCase[method];
    if(response) response(req, res);
    else res.status(400).json({message: "Invalid request type."});
}

export default handler;
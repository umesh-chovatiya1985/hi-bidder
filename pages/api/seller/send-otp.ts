import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { sellerSchema } from "../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../utils/types";

function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            if(!req.body.contact){
                return res.status(200).json({status: 0, message: "Contact No is required!"});
            }
            if(req.body.contact == ''){
                return res.status(200).json({status: 0, message: "Contact No is required!"});
            }
            const { Seller } = await sellerSchema();
            if(req.body.resend == 'No'){
                const existContact = await Seller.findOne({seller_contact: req.body.contact});
                if(existContact){
                    return res.status(200).json({status: 0, user: existContact, message: "Seller already exist with provided contact no."});
                }
            }
            const userSeller = await Seller.findOne({user_id: req.body.user_id});
            if(userSeller){
                userSeller.seller_contact = req.body.contact;
                userSeller.contact_otp = generate(6); //"123000";
                await userSeller.save();
                return res.status(200).json({status: 1, message: "OTP sent successfully"});
            }
            return res.status(200).json({status: 0, message: "No seller found with User Id. Please, check it again"});
        }
    }

    const response = handleCase[method];
    if(response) response(req, res);
    else res.status(400).json({message: "Invalid request type."});
}

export default handler;
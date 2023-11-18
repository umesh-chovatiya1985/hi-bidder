import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { sellerSchema } from "../../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const id: string = req.query._id as string
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Seller } = await sellerSchema();
               const sellerInfo = await Seller.findOne({_id: id, contact_otp: req.body.contact_otp});
               if(!sellerInfo){
                    return res.json({status: 0, message: "OTP did not matched. Please, check it again"});
               }
               await Seller.findByIdAndUpdate(id, req.body, { new: true }).then((resp: any) => {
                    return res.json({status: 1, message: "Seller updated successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { selleraddressSchema } from "../../../../utils/schemas/selleraddressSchema";
import { sellerSchema } from "../../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const id: string = req.query.user_id as string
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Seller } = await sellerSchema();
               await Seller.findOne({user_id: id}).then(async (resp: any) => {
                    const { SellerAddress } = await selleraddressSchema();
                    const addressSeller = await SellerAddress.findOne({seller_id: resp._id});
                    res.json({status: (resp ? "1" : "0"), record: resp, address: addressSeller});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
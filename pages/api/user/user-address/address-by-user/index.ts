import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import { connect } from "../../../../../utils/connection";
import { buyeraddressSchema } from "../../../../../utils/schemas/buyeraddressSchema";
import { ResponseFuncs } from "../../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { BuyerAddress } = await buyeraddressSchema();
               await BuyerAddress.find({user_id: token.sub}).then((resp: any) => {
                     res.json({status: resp.length>0?1:0, records: resp});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
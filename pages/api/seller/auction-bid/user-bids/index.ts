import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../../utils/connection";
import { auctionbidSchema } from "../../../../../utils/schemas/auctionbidSchema";
import { ResponseFuncs } from "../../../../../utils/types";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const token = await getToken({ req });
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { auctionBid } = await auctionbidSchema();
               await auctionBid.find({user: token.sub}).then((resp: any) => {
                     res.json({status: 1, record: resp});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
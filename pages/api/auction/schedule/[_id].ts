import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const id: string = req.query._id as string
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
               const { ProductAuction } = await productauctionSchema();
               let bodyData = req.body;
               await ProductAuction.findByIdAndUpdate(id, bodyData, { new: true }).then((resp: any) => {
                     res.json({status: 1, message: "Auction schedule saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next"
import { productauctionSchema } from "../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "../../../utils/connection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { return res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { ProductAuction } = await productauctionSchema();
               var d = new Date();
               d.setDate(d.getDate()+7);
               let dataUpdate = { status: "Publish", isActive: true, scheduleTime: null, activeAt: new Date(), expiryDate: d};
               let condition = { scheduleTime: { $lt: new Date() }, status: 'Scheduled'};
               let multi = { "multi": true };
               await ProductAuction.updateMany(condition, dataUpdate, multi)
                    .then((resp: any) => {
                        return res.json({status: 1, records: resp});
                    }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
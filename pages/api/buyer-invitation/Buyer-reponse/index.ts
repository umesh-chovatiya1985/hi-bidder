import { NextApiRequest, NextApiResponse } from "next"
import { buyerinviteSchema } from "../../../../utils/schemas/buyerinviteSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { connect } from "../../../../utils/connection";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { BuyerInvite } = await buyerinviteSchema();
               await BuyerInvite.find({}).then((resp: any) => {
                     res.json({status: 1, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { BuyerInvite } = await buyerinviteSchema();
               let buyerInvitaion = new BuyerInvite(req.body);
               await buyerInvitaion.save().then((resp: any) => {
                     res.json({status: 1, message: "Buyer Invitation saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
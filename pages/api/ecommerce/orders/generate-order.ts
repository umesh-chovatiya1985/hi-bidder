import { NextApiRequest, NextApiResponse } from "next"
import { auctionorderSchema } from "../../../../utils/schemas/ecommerce/auctionorderSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { connect } from "../../../../utils/connection";
import moment from "moment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { auctionOrder } = await auctionorderSchema();
               await auctionOrder.find({}).then((resp: any) => {
                     res.json({status: 1, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { auctionOrder } = await auctionorderSchema();
               let orderData = req.body;
               const constNumber = Math.floor(Math.random() * 100000) < 9999 ? "0"+Math.floor(Math.random() * 100000) : Math.floor(Math.random() * 100000);
               orderData.order_id = "ORH-"+moment().format("DDMMYYYY")+"-"+constNumber;
               orderData.shipping_charge = 30;
               orderData.admin_charge = 100;
               orderData.payable_amount = (parseFloat(orderData.order_amount) + 30 + 100).toString();
               let AuctionOrder = new auctionOrder(orderData);
               await AuctionOrder.save().then((resp: any) => {
                     res.json({status: 1, message: "Auction Order saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
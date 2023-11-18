import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import { connect } from "../../../../utils/connection";
import { auctionshippingSchema } from "../../../../utils/schemas/auctionshippingSchema";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    const token = await getToken({ req });
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { AuctionShipping } = await auctionshippingSchema();
            await AuctionShipping.find({}).then((resp: any) => {
                res.json({ status: 1, records: resp });
            }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { AuctionShipping } = await auctionshippingSchema();
            const { ProductAuction } = await productauctionSchema();
            const bodyData = req.body;
            const sellerId: any = token.sub;
            bodyData.seller_id = sellerId;
            const auctionId = bodyData?.product_id;
            const auctionProduct = await ProductAuction.findById({ _id: auctionId });
            const auctionShipping = await AuctionShipping.create(bodyData);
            if (auctionShipping) {
                const shipping_id: any = auctionShipping._id;
                auctionProduct.auctionshipping_id = shipping_id;
                await auctionProduct.save().then((resp: any) => {
                    return res.json({ status: 1, records: auctionShipping, message: "Auction Shipping saved successfully" });
                }).catch((err: any) => { catcher(err); });
            }
            res.status(400).json({ error: "Auction Shipping failed!" });
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
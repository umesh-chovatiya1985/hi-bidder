import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { auctionpricingSchema } from "../../../../utils/schemas/auctionpricingSchema";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { return res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { AuctionPricing } = await auctionpricingSchema();
            await AuctionPricing.find({}).then((resp: any) => {
                res.json({ status: 1, records: resp });
            }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { AuctionPricing } = await auctionpricingSchema();
            const { ProductAuction } = await productauctionSchema();
            const bodyData = req.body;
            const auctionId = bodyData?.product_id;
            const auctionProduct = await ProductAuction.findById({ _id: auctionId });
            const auctionPricing = await AuctionPricing.create(bodyData);
            if (auctionPricing) {
                const price_id: any = auctionPricing._id;
                auctionProduct.auctionpricing_id = price_id;
                await auctionProduct.save().then((resp: any) => {
                    return res.json({ status: 1, records: auctionPricing, message: "Pricing saved successfully" });
                }).catch((err: any) => { catcher(err); });
            }
            return res.status(400).json({ error: "Pricing failed!" });
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
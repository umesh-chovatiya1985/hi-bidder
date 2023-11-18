import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { auctionbidSchema } from "../../../../utils/schemas/auctionbidSchema";
import { auctionpricingSchema } from "../../../../utils/schemas/auctionpricingSchema";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const id: string = req.query.auction_id as string;
    const limit = req.query?.per_page;
    let skipRec = 0;
    if (limit && req.query?.page) {
        const page = req.query?.page ?? 1;
        const pageNo = parseInt(page.toString()) - 1;
        skipRec = parseInt(pageNo.toString()) * parseInt(limit.toString());
    }
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductAuction } = await productauctionSchema();
            let productInfo = await ProductAuction.findOne({slug: id});
            if(!productInfo){
                return res.status(400).json({ error: "No Response for This Request" });
            }
            const productId = productInfo._id;
            const { auctionBid } = await auctionbidSchema();
            let mongoQuery = auctionBid.find({product: productId}).populate('user', 'name image').populate('product', 'slug -_id').sort({bid_amount:-1, createdAt:-1});
            const count = await auctionBid.countDocuments({product: productId});
            const maxBid = await auctionBid.findOne({product: productId}).sort({max_bid: -1});
            const lastMaxBid = maxBid ? maxBid.max_bid : 0;
            if (limit) {
                mongoQuery = auctionBid.find({product: productId}).populate('user', 'name image').populate('product', 'slug -_id').sort({bid_amount:-1, createdAt:-1}).skip(skipRec).limit(parseInt(limit.toString()));
            }
            let bid_amount: String = "0";
            if(count == 0){
                const { AuctionPricing } = await auctionpricingSchema();
                const productStartPrice = await AuctionPricing.findOne({product_id: productId});
                if(productStartPrice){
                    bid_amount = (parseFloat(productStartPrice.starting_bid.toString()) - 100).toString();
                }
            }
            await mongoQuery.then((resp: any) => {
                    if(count > 0){
                        bid_amount = resp[0].bid_amount;
                    }
                    res.json({status: 1, total: count, bid_amount: bid_amount, max_bid: lastMaxBid, record: resp});
            }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
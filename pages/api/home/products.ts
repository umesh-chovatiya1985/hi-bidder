import { NextApiRequest, NextApiResponse } from "next"
import { productauctionSchema } from "../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "../../../utils/connection";
import { auctionpricingSchema } from "../../../utils/schemas/auctionpricingSchema";
import { sellerSchema } from "../../../utils/schemas/sellerSchema";
import { productphotosSchema } from "../../../utils/schemas/productphotosSchema";
import { CategorySchema } from "../../../utils/schemas/categorySchema";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    await auctionpricingSchema();
    await sellerSchema();
    await productphotosSchema();
    await CategorySchema();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductAuction } = await productauctionSchema();
            // { $regex: '.*' + fetchCategory._id + '.*' } category_id: fetchCategory._id
            const recentAuction = await ProductAuction.find({isActive: true, status: "Publish"})
                            .populate('seller_id', 'company_name company_number  -_id')
                            .populate('category_id', 'title slug image -_id')
                            .populate('categories_ids', 'title slug image -_id')
                            .populate('photos_ids', 'photo_url photo_alt is_default -_id')
                            .populate('auctionpricing_id', '-_id')
                            .sort({'scheduleTime': -1});
            const auctionForYou = await ProductAuction.find({isActive: true, status: "Publish"})
                            .populate('seller_id', 'company_name company_number  -_id')
                            .populate('category_id', 'title slug image -_id')
                            .populate('categories_ids', 'title slug image -_id')
                            .populate('photos_ids', 'photo_url photo_alt is_default -_id')
                            .populate('auctionpricing_id', '-_id');
            const expireAuction = await ProductAuction.find({isActive: true, status: "Publish"})
                            .populate('seller_id', 'company_name company_number  -_id')
                            .populate('category_id', 'title slug image -_id')
                            .populate('categories_ids', 'title slug image -_id')
                            .populate('photos_ids', 'photo_url photo_alt is_default -_id')
                            .populate('auctionpricing_id', '-_id')
                            .sort({'expiryDate': -1});
            return res.status(200).json({ status: 1, record: { recentAuction: recentAuction, auctionForYou: auctionForYou, expiredSoon: expireAuction }});
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
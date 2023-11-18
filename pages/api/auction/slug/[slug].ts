import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { auctionpricingSchema } from "../../../../utils/schemas/auctionpricingSchema";
import { auctionshippingSchema } from "../../../../utils/schemas/auctionshippingSchema";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { productphotosSchema } from "../../../../utils/schemas/productphotosSchema";
import { selleraddressSchema } from "../../../../utils/schemas/selleraddressSchema";
import { sellerSchema } from "../../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const slug: string = req.query.slug as string
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    await auctionshippingSchema();
    await auctionpricingSchema();
    await selleraddressSchema();
    await productphotosSchema();
    await sellerSchema();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductAuction } = await productauctionSchema();
            await ProductAuction.findOne({ slug: slug })
                .populate({path: 'seller_id', populate: {path: 'address_id', select: ('country state city address_one address_two building pin_code -_id')}, select: ('user_id company_name company_number')})
                .populate('category_id', ('title slug image -_id'))
                .populate('categories_ids', ('title slug image -_id'))
                .populate('auctionpricing_id', '-_id')
                .populate('auctionshipping_id', '-_id')
                .populate('photos_ids', ('photo_url photo_alt is_default -_id'))
                .then((resp: any) => {
                    res.status(200).json({ status: 1, record: resp });
                });
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
// .catch((err: any) => { catcher(err); })
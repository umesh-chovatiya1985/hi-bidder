import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { auctionpricingSchema } from "../../../../utils/schemas/auctionpricingSchema";
import { CategorySchema } from "../../../../utils/schemas/categorySchema";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { productphotosSchema } from "../../../../utils/schemas/productphotosSchema";
import { sellerSchema } from "../../../../utils/schemas/sellerSchema";
import { UserSchema } from "../../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const slug: string = req.query.category as string;
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    await auctionpricingSchema();
    await sellerSchema();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductAuction } = await productauctionSchema();
            await UserSchema();
            const { Category } = await CategorySchema();
            await productphotosSchema();
            const fetchCategory = await Category.findOne({ slug: slug });
            if (!fetchCategory) {
                return res.status(400).json({ error: "No category found!" });
            }
            // { $regex: '.*' + fetchCategory._id + '.*' } category_id: fetchCategory._id
            await ProductAuction.find({isActive: true, status: "Publish"})
                .or([{ categories_ids : fetchCategory._id }, {category_id: fetchCategory._id}])
                .populate('seller_id', 'company_name company_number  -_id')
                .populate('category_id', 'title slug image -_id')
                .populate('categories_ids', 'title slug image -_id')
                .populate('photos_ids', 'photo_url photo_alt is_default -_id')
                .populate('auctionpricing_id', '-_id')
                .then((resp: any) => {
                    return res.status(200).json({ status: resp.length > 0 ? 1 : 0, record: resp });
                });
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
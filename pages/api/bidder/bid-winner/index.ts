import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFuncs } from "../../../../utils/types";
import { connect } from "../../../../utils/connection";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { getToken } from "next-auth/jwt";
import { auctionbidSchema } from "../../../../utils/schemas/auctionbidSchema";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const token = await getToken({ req });
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { ProductAuction } = await productauctionSchema();
               const { auctionBid } = await auctionbidSchema();
               await ProductAuction.find({winner_id: token.sub, payment_status: false, is_completed: false})
                    .populate('seller_id', 'company_name company_number  -_id')
                    .populate('category_id', 'title slug image -_id')
                    .populate('categories_ids', 'title slug image -_id')
                    .populate('photos_ids', 'photo_url photo_alt is_default -_id')
                    .populate('auctionpricing_id', '-_id')
                    .then(async (resp: any) => { 
                        return res.status(200).json({ status: resp.length > 0 ? 1 : 0, record: resp });
                    }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
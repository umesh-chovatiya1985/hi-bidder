import { NextApiRequest, NextApiResponse } from "next"
import { buyerinviteSchema } from "../../../../utils/schemas/buyerinviteSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { connect } from "../../../../utils/connection";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { getToken } from "next-auth/jwt";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const id: string = req.query.invitation_id as string
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const token = await getToken({ req });
    await connect();
    const handleCase: ResponseFuncs = {
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
            const { BuyerInvite } = await buyerinviteSchema();
            const respo = await BuyerInvite.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher);
            res.status(200).json({status: 1, record: respo, message: "Invitation updated successfully"});
        },
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { BuyerInvite } = await buyerinviteSchema();
               const { ProductAuction } = await productauctionSchema();
               await BuyerInvite.findOne({_id: id, buyer: token.sub, isActive: true, status: "Pending"}).then(async (resp: any) => {                
                        if(resp){
                            const productInfo = await ProductAuction.find({_id: resp.product})
                                .populate('seller_id', 'company_name company_number  -_id')
                                .populate('category_id', 'title slug image -_id')
                                .populate('categories_ids', 'title slug image -_id')
                                .populate('photos_ids', 'photo_url photo_alt is_default -_id')
                                .populate('auctionpricing_id', '-_id');
                            return res.json({status: 1, record: resp, productInfo: productInfo});
                        }
                        return res.json({status: 0, record: resp});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import { connect } from "../../../../utils/connection";
import { auctionpricingSchema } from "../../../../utils/schemas/auctionpricingSchema";
import { auctionshippingSchema } from "../../../../utils/schemas/auctionshippingSchema";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../../utils/types";
import { ObjectId } from "mongodb";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    const token = await getToken({ req });
    if(!token){
        return res.status(400).json({ status: 0, title: "Unauthorised", message: "To access auctions list, You must have login. Please, Login now" });
    }
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const status = req.query?.status;
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { ProductAuction } = await productauctionSchema();
               await auctionpricingSchema();
               await auctionshippingSchema();
               let condition: any = {seller_id : token.sub, status: "Expired", isActive: false};
               if(status != 'All'){
                    condition = {seller_id : token.sub, status: status, isActive: false};
               }

                const statusCounter = {
                    'Expired': 0,
                    'Payment_pending': 0,
                    'Payment_reject': 0
                }
               const statusData = await ProductAuction.aggregate([
                    {
                        $group: {
                            _id: {
                                "seller_id": "$seller_id",
                                "status": "$status"
                            },
                            seller_id: { $first: "$seller_id" },
                            count: { $sum: 1 },
                        }
                    },
                    {   
                        $project: {
                            _id: 1,
                            seller_id: 1,
                            count: 1
                        }
                    }, 
                    {
                        $match: { seller_id: new ObjectId(token.sub), isActive: false }
                    }  
               ]);
               if(statusData.length > 0){
                    statusData.forEach((element: any) => {
                        statusCounter[element._id.status] = element.count;
                    });
               }
               const AllStatusData = await ProductAuction.aggregate([
                    {
                        $group: {
                            _id: "$seller_id",
                            count: { $sum: 1 }
                        }
                    },
                    {   
                        $project: {
                            _id: 1,
                            count: 1
                        }
                    }, 
                    {
                        $match: { _id: new ObjectId(token.sub), isActive: false }
                    }  
                ]);
                if(AllStatusData.length > 0){
                    statusCounter['All'] = AllStatusData[0].count;
                }

               await ProductAuction.find(condition)
                    .populate("categories_ids", ('title slug -_id'))
                    .populate("category_id", ('title slug -_id'))
                    .populate("auctionpricing_id", ('-_id -product_id'))
                    .populate("auctionshipping_id", ('-_id -product_id -seller_id'))
                .then((resp: any) => {
                    return res.json({status: 1, record: resp, status_counter: statusCounter});
                })
                .catch((err) => catcher(err));
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next"
import { auctionbidSchema } from "../../../../../utils/schemas/auctionbidSchema";
import { ResponseFuncs } from "../../../../../utils/types";
import { connect } from "../../../../../utils/connection";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id: string = req.query._id as string;
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { auctionBid } = await auctionbidSchema();
            const getUniqueBids = await auctionBid.aggregate(
                [
                    {
                        $group: {
                            _id: "$user",
                            bid_amount: { $last: '$bid_amount'},
                            bid_others: { $push: '$bid_amount'},
                            auction_id: { $first: '$product'},
                            count: { $sum: 1 }
                        }
                    },
                    { 
                        $lookup: {
                            from: "users",
                            localField: "_id",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    {   
                        $project: {
                            "_id": 1,
                            "bid_amount": 1,
                            "bid_others": 1,
                            "count": 1,
                            "auction_id": 1,
                            "user.name": 1,
                            "user.email": 1,
                            "user.contact": 1
                        }
                    },
                    {
                        $match: { auction_id: new ObjectId(id) }
                    },
                    { $sort : { bid_amount : -1 } }
                ]               
            );
            return res.json({status: getUniqueBids.length > 0 ? 1 : 0, record: getUniqueBids});
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
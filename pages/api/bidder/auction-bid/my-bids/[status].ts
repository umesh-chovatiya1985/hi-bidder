import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../../utils/connection";
import { auctionbidSchema } from "../../../../../utils/schemas/auctionbidSchema";
import { ResponseFuncs } from "../../../../../utils/types";
import { ObjectId } from "mongodb";
import { user } from "../../../../../utils/models/user";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const status: string = req.query.status as string;
    const token = await getToken({ req });
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { auctionBid } = await auctionbidSchema();
            let matchCondition: any = { "user": new ObjectId(token.sub), "isActive": true};
            if(status == 'win'){
                matchCondition = { "user": new ObjectId(token.sub), "winner_id": new ObjectId(token.sub), "isActive": false };
            }
            else if(status == 'lost'){
                matchCondition = { "user": new ObjectId(token.sub), "winner_id": { $ne: new ObjectId(token.sub)}};
            }                
            var pipeline = [                
                {
                    $group: {
                        "_id": "$product",
                        "bid_amount": { $max: "$bid_amount" },
                        "user_amount": { $push: "$bid_amount" },
                        "product": { $first: "$product" },
                        "user": { $push: "$user" },
                        "seller": { $first: "$seller" }
                    }
                },
                {   
                    $project: {
                        product: 1,
                        bid_amount: 1,
                        user: 1,
                        seller: 1,
                        user_amount: 1
                    }
                },                  
                {
                    "$lookup": {
                        "from": "productauctions",
                        "localField": "product",
                        "foreignField": "_id",
                        "as": "products",
                    }
                },     
                {
                    $lookup: {
                        from: "categories",
                        localField: "products.categories_ids",
                        foreignField: "_id",
                        as: "categories"
                    }
                },           
                {
                    "$lookup": {
                        "from": "sellers",
                        "localField": "seller",
                        "foreignField": "_id",
                        "as": "sellers_mapping",
                    }
                },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "user",
                        "foreignField": "_id",
                        "as": "user_mapping",
                    }
                },
                {
                    "$set": {
                        "products": {"$first": "$products"},
                        "sellers_mapping": {"$first": "$sellers_mapping"},
                        "user_mapping": {"$first": "$user_mapping"},
                    }
                },  
                {
                    "$set": {
                        "seller_name": "$sellers_mapping.company_name",
                        "user_name": "$user_mapping.name",
                        "email": "$user_mapping.email",
                        "image": "$user_mapping.image",
                        "contact": "$user_mapping.contact",
                        "isActive": "$products.isActive",
                        "winner_id": "$products.winner_id"
                    }
                },
                {
                    "$unset": [
                        "product",
                        "seller",
                        "sellers_mapping",
                        "user_mapping"
                    ]
                },                
                {
                    $match: matchCondition
                },
                {
                    "$sort": {
                        "_id": -1
                    }
                }
            ];
            const auctionAggregate = await auctionBid.aggregate(pipeline);

            res.json({status: auctionAggregate.length, record: auctionAggregate});
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
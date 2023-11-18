import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "../../../utils/connection";
import Stripe from "stripe";
import { buyerinviteSchema } from "../../../utils/schemas/buyerinviteSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const offer_id = req.query?.offer_id;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15', typescript: true });
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { BuyerInvite } = await buyerinviteSchema();     
            const inviteDetail = await BuyerInvite.findOne({_id: offer_id});  
            if(inviteDetail) {
                const paymentIntent = await stripe.paymentIntents.create({
                    currency: "GBP",
                    description: "Testing by product register",
                    amount: (parseFloat(inviteDetail.bidAmount.toString()) + 300) * 100,
                    automatic_payment_methods: { enabled: true },
                });
                return res.send({
                    clientSecret: paymentIntent.client_secret,
                });
            }
            return res.status(400).json({status: 0, error: "Something wrong, Try again after sometime." });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
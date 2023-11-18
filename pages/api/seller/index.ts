import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection";
import { sellerSchema } from "../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
      const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
      const catcher = (error: Error) => { res.status(400).json({ error }) };
      await connect();
      const handleCase: ResponseFuncs = {
            GET: async (req: NextApiRequest, res: NextApiResponse) => {
                  const { Seller } = await sellerSchema();
                  await Seller.find({}).populate('user_id').then((resp: any) => {
                        res.json({ status: 1, records: resp });
                  }).catch((err: any) => { catcher(err); });
            },
            POST: async (req: NextApiRequest, res: NextApiResponse) => {
                  const { Seller } = await sellerSchema();
                  let seller = new Seller(req.body);
                  await seller.save().then((resp: any) => {
                        res.json({ status: 1, message: "Seller created successfully" });
                  }).catch((err: any) => { catcher(err); });
            }
      }
      const response = handleCase[method];
      if (response) response(req, res);
      else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
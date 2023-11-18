import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection";
import { selleraddressSchema } from "../../../utils/schemas/selleraddressSchema";
import { sellerSchema } from "../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
      const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
      const catcher = (error: Error) => { res.status(400).json({ error }) };
      await connect();
      const handleCase: ResponseFuncs = {
            GET: async (req: NextApiRequest, res: NextApiResponse) => {
                  const { SellerAddress } = await selleraddressSchema();
                  await SellerAddress.find({}).populate('seller_id').then((resp: any) => {
                        res.json({ status: 1, records: resp });
                  }).catch((err: any) => { catcher(err); });
            },
            POST: async (req: NextApiRequest, res: NextApiResponse) => {
                  const { SellerAddress } = await selleraddressSchema();
                  let sellerAddress = new SellerAddress(req.body);
                  const sellerQuery = await sellerAddress.save()
                  const { Seller } = await sellerSchema();
                  const userData = await Seller.findById({_id: req.body.seller_id});
                  userData.address_id = sellerQuery._id;
                  await userData.save().then(async (resp: any) => {                  
                        res.json({ status: 1, message: "Seller Address saved successfully" });
                  }).catch((err: any) => { catcher(err); });
            },
            PUT: async (req: NextApiRequest, res: NextApiResponse) => {
                  const id: string = req.query._id as string;
                  const { SellerAddress } = await selleraddressSchema();
                  await SellerAddress.findByIdAndUpdate(id, req.body, { new: true }).then((resp: any) => {
                        res.json({ status: 1, message: "Seller Address updated successfully" });
                  }).catch((err: any) => { catcher(err); });
            },
      }
      const response = handleCase[method];
      if (response) response(req, res);
      else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
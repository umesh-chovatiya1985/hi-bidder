import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection";
import { bannerSchema } from "../../../utils/schemas/bannerSchema";
import { ResponseFuncs } from "../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();

    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Banner } = await bannerSchema();
               await Banner.find({}).then((resp: any) => {
                     res.json({status: resp.length > 0 ? 1 : 0, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Banner } = await bannerSchema();
               let banners = new Banner(req.body);
               await banners.save().then((resp: any) => {
                  res.json({status: 1, message: "Banner saved successfully", records: resp});
               }).catch((err: any) => { catcher(err); });
       }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
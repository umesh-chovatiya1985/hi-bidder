import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { attributeSchema } from "../../../../utils/schemas/attributeSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Attribute } = await attributeSchema();
               await Attribute.find({}).then((resp: any) => {
                     res.json({status: 1, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Attribute } = await attributeSchema();
               let attribute = new Attribute(req.body);
               await attribute.save().then((resp: any) => {
                     res.json({status: 1, record: resp, message: "Attribute saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
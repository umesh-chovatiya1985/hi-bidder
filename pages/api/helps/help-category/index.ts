import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { helpcategorySchema } from "../../../../utils/schemas/helpcategorySchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { HelpCategory } = await helpcategorySchema();
               await HelpCategory.find({}).populate("topic_id", ('topic_name -_id')).then((resp: any) => {
                     res.json({status: 1, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { HelpCategory } = await helpcategorySchema();
               let helpcategoryModel = new HelpCategory(req.body);
               await helpcategoryModel.save().then((resp: any) => {
                     res.json({status: 1, message: "Help Category saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
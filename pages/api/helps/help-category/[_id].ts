import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { helpcategorySchema } from "../../../../utils/schemas/helpcategorySchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const id: string = req.query._id as string
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { HelpCategory } = await helpcategorySchema();
               await HelpCategory.findById(id).then((resp: any) => {
                     res.json({status: 1, record: resp});
               }).catch((err: any) => { catcher(err); });
        },
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
               const { HelpCategory } = await helpcategorySchema();
               await HelpCategory.findByIdAndUpdate(id, req.body, { new: true }).then((resp: any) => {
                     res.json({status: 1, message: "Help Category updated successfully"});
               }).catch((err: any) => { catcher(err); });
        },
        DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
               const { HelpCategory } = await helpcategorySchema();
               await HelpCategory.findByIdAndRemove(id).then((resp: any) => {
                     res.json({status: 1, message: "Help Category deleted successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler; 
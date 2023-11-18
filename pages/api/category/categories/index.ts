import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { CategorySchema } from "../../../../utils/schemas/categorySchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { Category } = await CategorySchema();
               await Category.find({"parent_id": null}).then((resp: any) => {
                     res.status(200).json({status: 1, record: resp});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
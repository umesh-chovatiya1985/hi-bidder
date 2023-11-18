import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { departmentSchema } from "../../../../utils/schemas/departmentSchema";
import { RolesSchema } from "../../../../utils/schemas/roleSchema";
import { ResponseFuncs } from "../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    let tableSchema: any;
    if(req.query?.tableschema == 'department'){
      const { Department } = await departmentSchema();
      tableSchema = Department;
    }
    if(req.query?.tableschema == 'role'){
      const { Roles } = await RolesSchema();
      tableSchema = Roles;
    }
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {               
               await tableSchema.find({}).then((resp: any) => {
                     res.json({status: 1, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               let departmentModel = new tableSchema(req.body);
               await departmentModel.save().then((resp: any) => {
                     res.json({status: 1, message: "Department saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
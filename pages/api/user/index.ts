import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const limit = req.query?.limit;
    const user = req.query?.user_role;

    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { User } = await UserSchema();
               let condition = {};
               if(user){
                    if(user == 'bidders'){
                        condition = {'user_role': 'User'};
                    }
                    else if(user == 'sellers'){
                        condition = {'is_seller': true};
                    }
               }
               let mongoQuery = User.find(condition);
               if(limit){
                    mongoQuery = User.find(condition).limit(parseInt(limit.toString()));
                }
               await mongoQuery.then((resp: any) => {
                     res.json({status: 1, records: resp});
               }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { User } = await UserSchema();
               let userModel = new User(req.body);
               await userModel.save().then((resp: any) => {
                     res.json({status: 1, message: "User saved successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
               const { User } = await UserSchema();
               const resp = await User.findOne({_id: token.sub}).select('-password -contact_otp -email_otp -user_role -isDeleted');
            //    await (await User.findOne({_id: token.sub}).select('-password -_id')).then((resp: any) => {
            //          res.json({status: 1, records: resp});
            //    }).catch((err: any) => { catcher(err); });
            return res.json({status: 1, records: resp});
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { User } = await UserSchema();
               await User.findByIdAndUpdate(token.sub, req.body).then((resp: any) => {
                     res.json({status: 1, message: "User Profile updated successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
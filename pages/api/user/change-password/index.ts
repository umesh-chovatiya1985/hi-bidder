import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import { connect } from "../../../../utils/connection";
import { UserSchema } from "../../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { User } = await UserSchema();
               if(req.body.password != req.body.retype_password){
                    return res.json({status: 0, message: "New password and Retype New Password must have same. Please, check it again."});
               }
               const hash = createHash('sha256');
                hash.update(req.body.old_password);
                const oldPassword = hash.digest('hex');
               const userInfo = await User.findOne({_id: token.sub, password: oldPassword});
               if(!userInfo){
                    return res.json({status: 0, message: "Old password not match with login account. Try again."});
               }
               const hash1 = createHash('sha256');
               hash1.update(req.body.password);
               userInfo.password = hash1.digest('hex');
               await userInfo.save().then((resp: any) => {
                     res.json({status: 1, message: "User Password changed successfully"});
               }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
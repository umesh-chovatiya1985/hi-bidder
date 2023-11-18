import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { UserSchema } from "../../../utils/schemas/userSchema"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
  //function for catch errors
  const catcher = (error: Error) => { return res.status(400).json({ error }); }
  await connect();
  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const { User } = await UserSchema(); // connect to database
        // const userRecord = await User.findOne({"_id": req.body.sub}).select('user_role createdOn isDeleted isActive');
        const userRecord = await User.findOne({"email": req.body.email}).select('-password -contact_otp -email_otp -isDeleted');
        if(!userRecord){
            const exist = {status: 0, title: "No user found.", message: "Sorry, No user register with given email Id"};
            return res.status(201).json(exist);
        }
        /** Save successfully */
        const success = {status: 1, title: "User saved!", message: "User register successfully", user: userRecord};
        return res.status(200).json(success);
    },
  }
  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = await handleCase[method];
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for this Request" })
}

export default handler
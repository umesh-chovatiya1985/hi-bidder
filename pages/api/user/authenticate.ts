import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { ResponseFuncs } from "../../../utils/types";

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
        const loginFor = req.body.loginFor ?? "User";
        if(req.body.email == "" && req.body.password == ""){
          const exist = {status: 0, title: "Required field missing", message: "Opps! Credentials are required to login."};
          return res.status(201).json(exist);
        }
        if(req.body.email == ""){
          const exist = {status: 0, title: "Email Id is required", message: "Opps! Email Id is required to login."};
          return res.status(201).json(exist);
        }
        if(req.body.password == ""){
          const exist = {status: 0, title: "Password is required", message: "Opps! Password is required to login."};
          return res.status(201).json(exist);
        }
        const userEmail = await User.findOne({"email": req.body.email});
        if(!userEmail){
          const exist = {status: 0, title: "No user found.", message: "Sorry, No user register with given email Id"};
          return res.status(201).json(exist);
        }
        if(userEmail.password){
          // if(req.body.password){
          const hash = createHash('sha256');
          hash.update(req.body.password);
          const encripted = hash.digest('hex');
          if(userEmail.password != encripted){
              const exist = {status: 0, title: "Invalid password!", message: "Sorry, Password not match with account. Try again."};
              return res.status(201).json(exist);
          }
        }
        if(loginFor == 'Admin' && userEmail.user_role != 'Admin'){
          const exist = {status: 0, title: "Invalid request!", message: "Sorry, You don't have permission to login as request role."};
          return res.status(201).json(exist);
        }
        /** Save successfully */
        // const userResponse = await User.create(req.body);
        console.log(userEmail);
        const success = {status: 1, title: "User login!", message: "User login successfully", user: userEmail};
        return res.status(200).json(success);
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = await handleCase[method];
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
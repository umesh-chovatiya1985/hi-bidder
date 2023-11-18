// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";

export default async (req: any, res: any) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  if (token) {
    // Signed in
    //function for catch errors
    const catcher = (error: Error) => { return res.status(400).json({ error }); }
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
    res.status(401).json({ status: "1", user: token, message: "Opps! Bearer token not found. Please, try again."})
  } else {
    // Not Signed in
    res.status(401)
  }
}
import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { homesliderSchema } from "../../../utils/schemas/homesliderSchema"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // GRAB ID FROM req.query (where next stores params)
  const id: string = req.query._id as string

  // Potential Responses for /todos/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect();
      const { HomeSlider } = await homesliderSchema() // connect to database
      res.json(await HomeSlider.findById(id).catch(catcher))
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect();
      const { HomeSlider } = await homesliderSchema() // connect to database
      const respo = await HomeSlider.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher);
      res.status(200).json({status: 1, message: "Home Slider updated successfully"});
    },
    // RESPONSE FOR DELETE REQUESTS
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      await connect();
      const { HomeSlider } = await homesliderSchema() // connect to database
      res.json(await HomeSlider.findByIdAndRemove(id).catch(catcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
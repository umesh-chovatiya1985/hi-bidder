import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection"
import { HtmlTemplateSchema } from "../../../../utils/schemas/htmltemplateSchema"
import { ResponseFuncs } from "../../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // GRAB ID FROM req.query (where next stores params)
  const slug: string = req.query.slug as string

  // Potential Responses for /todos/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        await connect();
        const { HtmlTemplate } = await HtmlTemplateSchema() // connect to database
        const resp = await HtmlTemplate.findOne({slug: slug}).catch(catcher);
        if(resp) return res.json({ status: 1, response: resp});
        return res.json({ status: 0, message: "No template found", response: resp});
    }
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
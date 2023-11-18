import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { HtmlTemplateSchema } from "../../../utils/schemas/htmltemplateSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    await connect();
    const catcher = (error: Error) => res.status(400).json({ error })
    const handleCase: ResponseFuncs = {
         // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { HtmlTemplate } = await HtmlTemplateSchema(); // connect to database
            return res.json(await HtmlTemplate.find({}).catch(catcher))
        },
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { HtmlTemplate } = await HtmlTemplateSchema(); // connect to database
            const isExist = await HtmlTemplate.findOne({slug: req.body.slug});
            if(isExist){
                return res.json({status: 0, title: "Email already exist", message: "Duplicate slug, Please, check the mail is already exist or not."});
            }
            return res.json(await HtmlTemplate.create(req.body).catch(catcher))
        }
    }
    const response = await handleCase[method];
    if(response) response(req, res);
    else res.status(401).json({error: "Invalid request method"});
}

export default handler;
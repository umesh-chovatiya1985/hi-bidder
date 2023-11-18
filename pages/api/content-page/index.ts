import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import { connect } from "../../../utils/connection";
import { ContentPageSchema } from "../../../utils/schemas/contentpageSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    //function for catch errors
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ContentPage } = await ContentPageSchema(); // connect to database
            await ContentPage.find({}).then((resp: any) => {
                res.json(resp);
            })
            .catch((err: any) => {
                catcher(err);
            });
        },
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ContentPage } = await ContentPageSchema(); // connect to database
            const contentData = req.body;
            contentData.slug = slugify(contentData.title, { lower: true, trim: true });
            let contentpage = new ContentPage(contentData);
            await contentpage.save().then((resp: any) => {
                res.status(200).json({status: 1, message: "Content Page saved successfully"});
            })
            .catch((err: any) => {
                catcher(err);
            });
        },
    }
    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
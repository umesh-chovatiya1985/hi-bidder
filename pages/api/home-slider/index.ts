import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import { homesliderSchema } from "../../../utils/schemas/homesliderSchema";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();

    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { HomeSlider } = await homesliderSchema(); // connect to database
            await HomeSlider.find({isActive: true}).then((resp: any) => {
              res.json(resp);
            })
            .catch((err: any) => {
              catcher(err);
            });
        },
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { HomeSlider } = await homesliderSchema(); // connect to database
            let homeslider = new HomeSlider(req.body);
            await homeslider.save().then((resp: any) => {
              res.json(resp);
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
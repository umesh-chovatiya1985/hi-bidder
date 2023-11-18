import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { uploadFile } from "../upload/uploadFile";
import { bannerSchema } from "../../../utils/schemas/bannerSchema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images", "/banners"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images", "/banners"));
  }
  try {
    const catcher = (error: Error) => res.status(400).json({ error });    
    const response = await uploadFile(req, true, "/banners");
    let apiResponse = { status: 0, message: "No action done with api." };
    if(response.fields){
        const bannerData = JSON.parse(response.fields.data.toString());
        const { Banner } = await bannerSchema();
        if(bannerData._id && bannerData._id!=''){
            const editBanner = await Banner.findById(bannerData._id);
            if(editBanner){
                const pageId = bannerData._id;
                delete bannerData._id;
                const resp = await Banner.findByIdAndUpdate(pageId, bannerData, { new: true }).catch(catcher);
                apiResponse = { status: 1, message: "Banner updated successfully." };
                return res.status(200).json(apiResponse);;
            }     
        }
        let banner = new Banner(bannerData);
        const bannerRespo = await banner.save().catch(catcher);
        apiResponse = { status: 1, message: "Banner created successfully." };
        return res.status(200).json(apiResponse);
    }
  }
  catch(error) {
    res.status(400).json({ error });
  }
};

export default handler;

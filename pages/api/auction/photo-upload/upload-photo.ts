import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { productphotosSchema } from "../../../../utils/schemas/productphotosSchema";
import { uploadFile } from "../../upload/uploadFile";
import { NextApiResponseServerIO } from "../../../../types/next";

export const config = {
    api: {
        bodyParser: false,
    },
}
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/images", "/auction"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/images", "/auction"));
    }
    try {
        const catcher = (error: Error) => res.status(400).json({ error });
        const response = await uploadFile(req, true, "/auction");
        let apiResponse = { status: 0, message: "No action done with api." };
        if (response.fields) {
            const fieldData = JSON.parse(response.fields.data.toString());
            const { ProductPhoto } = await productphotosSchema();
            if (fieldData._id && fieldData._id != '') {
                const editData = await ProductPhoto.findById(fieldData._id);
                if (editData) {
                    const primaryId = fieldData._id;
                    delete fieldData._id;
                    const resp = await ProductPhoto.findByIdAndUpdate(primaryId, fieldData, { new: true }).catch(catcher);
                    res?.socket?.server?.io?.emit("photos", resp);
                    return res.status(200).json({ status: 1, record: resp, message: "Product photos updated successfully." });
                }
            }
            let Productphotos = new ProductPhoto(fieldData);
            const saveRespo = await Productphotos.save().catch(catcher);
            res?.socket?.server?.io?.emit("photos", saveRespo);
            return res.status(200).json({ status: 1, record: saveRespo, message: "Product photos created successfully." });
        }
        return res.status(200).json(apiResponse);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
export default handler;
import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from "fs/promises";
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
        const response = await uploadFile(req, true, "/auction");
        const fieldData = JSON.parse(response.fields.data.toString());
        let record = { "indexKey": fieldData.indexKey, "file": response?.files?.file_url?.newFilename, "path": "/images/auction/" + response?.files?.file_url?.newFilename };
        res?.socket?.server?.io?.emit("photos", record);
        return res.status(200).json({ status: 1, record: record, message: "File uploaded" });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
export default handler;
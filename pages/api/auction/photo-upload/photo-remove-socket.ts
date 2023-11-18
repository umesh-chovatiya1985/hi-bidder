import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from "fs/promises";
import { NextApiResponseServerIO } from "../../../../types/next";

export const config = {
    api: {
        bodyParser: false,
    },
}
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    try {
        const respo = await fs.readFile(path.join(process.cwd() + "/public", "/images", "/auction", req?.query.imagePath.toString()));
        if (respo) {
            await fs.unlink(path.join(process.cwd() + "/public", "/images", "/auction", req?.query.imagePath.toString()));
        }
    } catch (error) {
        return res.status(400).json({ status: 1, message: error, data: req?.query.imagePath.toString() });
    }
    try {
        res?.socket?.server?.io?.emit("removephoto", { status: "success" });
        return res.status(200).json({ status: 1, record: "Removed", message: "File uploaded" });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}
export default handler;
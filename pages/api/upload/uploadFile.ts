import formidable from "formidable";
import { NextApiRequest } from "next";
import path from "path";

export const uploadFile = (req: NextApiRequest, saveLocally?: boolean, directUrl?: string) : Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/images", directUrl);
        options.filename = (name: any, ext: any, path: any, form: any) => {
            return path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

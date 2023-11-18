import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { default as slugify } from 'slugify';
import { uploadFile } from "../upload/uploadFile";
import { CategorySchema } from "../../../utils/schemas/categorySchema";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/images", "/category"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/images", "/category"));
    }
    // try {
    const catcher = (error: Error) => res.status(400).json({ error });

    const response = await uploadFile(req, true, "/category");
    let apiResponse = { status: 0, message: "No action done with api." };
    if (response.fields) {
        if (response.fields.table) {
            switch (response.fields.table) {
                case "category":
                    const categoryData = JSON.parse(response.fields.data.toString());
                    categoryData.slug = slugify(categoryData.title, { lower: true, trim: true });
                    const { Category } = await CategorySchema();
                    if (categoryData._id && categoryData._id != '') {
                        const editCategory = await Category.findById(categoryData._id);
                        if (editCategory) {
                            const categoryId = categoryData._id;
                            delete categoryData._id;
                            if (categoryData.parent_id) {
                                const parentCategory = await Category.findById(req.body.parent_id);
                                parentCategory.child_ids.push(categoryId);
                                await parentCategory.save();
                            }
                            const resp = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true }).catch(catcher);
                            apiResponse = { status: 1, message: "Category updated successfully." };
                            break;
                        }
                    }
                    let category = new Category(categoryData);
                    const resp = await category.save().catch(catcher);
                    if (categoryData.parent_id) {
                        const parentCategory = await Category.findById(categoryData.parent_id);
                        const categoryId: any = category._id;
                        parentCategory.child_ids.push(categoryId);
                        await parentCategory.save();
                    }
                    apiResponse = { status: 1, message: "Category created successfully." };
                    break;
                default:
                    apiResponse = { status: 0, message: "Opps! No case matched with given table." };
            }
        }
    }
    res.status(200).json(apiResponse);
};

export default handler;
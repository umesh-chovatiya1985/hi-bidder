import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { productphotosSchema } from "../../../../utils/schemas/productphotosSchema";
import { ResponseFuncs } from "../../../../utils/types";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const auctionId = req.query?.auctionId;
            const { ProductPhoto } = await productphotosSchema();
            await ProductPhoto.find({product_id: auctionId}).then((resp: any) => {
                res.json({ status: 1, records: resp });
            }).catch((err: any) => { catcher(err); });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductPhoto } = await productphotosSchema();
            const bodyData = req.body;
            const auctionId = bodyData?.auctionId;
            const images = bodyData?.photos;
            const { ProductAuction } = await productauctionSchema();
            const auctionProduct = await ProductAuction.findById({ _id: auctionId });
            const imageArr = [];
            let defaultImage = "";
            images.forEach((element: any) => {
                if (element.indexKey) {
                    imageArr.push(element);
                }
                if (element.indexKey === 1) {
                    defaultImage = element.path;
                }
            });
            if (!auctionProduct) {
                return res.json({ status: 0, records: [], message: "Product not found that you requested" });
            }
            auctionProduct.default_image = defaultImage;
            const insertData = [];
            imageArr.forEach((element: any) => {
                const photoData = {
                    product_id: auctionId,
                    photo_url: element.path,
                    photo_alt: auctionProduct.title,
                    is_default: false,
                    isActive: true
                }
                insertData.push(photoData);
            });
            const options = { ordered: true };
            if (insertData.length > 0) {
                const uploadedImages = await ProductPhoto.insertMany(insertData, options);
                if (uploadedImages) {
                    uploadedImages.forEach((element: any) => {
                        auctionProduct.photos_ids.push(element._id);
                    })
                }
            }
            await auctionProduct.save().then((resp: any) => {
                res.json({ status: 1, records: auctionProduct, message: "Product Photo saved successfully" });
            }).catch((err: any) => { catcher(err); });
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
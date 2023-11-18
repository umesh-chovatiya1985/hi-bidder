import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt";
import slugify from "slugify";
import { connect } from "../../../utils/connection";
import { productauctionSchema } from "../../../utils/schemas/productauctionSchema";
import { sellerSchema } from "../../../utils/schemas/sellerSchema";
import { ResponseFuncs } from "../../../utils/types";
import { auctionpricingSchema } from "../../../utils/schemas/auctionpricingSchema";
import { auctionshippingSchema } from "../../../utils/schemas/auctionshippingSchema";
import { CategorySchema } from "../../../utils/schemas/categorySchema";

async function uniqueSlug(slug: any, newslug: any, count: number = 1, _id: any = "") {
    const { ProductAuction } = await productauctionSchema();
    let condition: any = { slug: newslug };
    if (_id != "") {
        condition = { slug: newslug, _id: { $ne: _id } };
    }
    const slugData = await ProductAuction.findOne(condition);
    console.log(newslug);
    if (!slugData) {
        return newslug;
    }
    let newgslug = slug + "-" + count;
    return uniqueSlug(slug, newgslug, ++count, _id);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;
    const limit = req.query?.per_page;
    let skipRec = 0;
    if (limit && req.query?.page) {
        const page = req.query?.page ?? 1;
        const pageNo = parseInt(page.toString()) - 1;
        skipRec = parseInt(pageNo.toString()) * parseInt(limit.toString());
    }
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const { Seller } = await sellerSchema();
    const { AuctionPricing } = await auctionpricingSchema();
    const { AuctionShipping } = await auctionshippingSchema();
    const { Category } = await CategorySchema();
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductAuction } = await productauctionSchema();
            let mongoQueryTotal = await ProductAuction.find({})
                    .populate("categories_ids", ('title slug -_id'))
                    .populate("category_id", ('title slug -_id'))
                    .populate("seller_id", ('company_name createdOn -_id'))
                    .populate("auctionpricing_id", ('-_id -product_id'))
                    .populate("auctionshipping_id", ('-_id -product_id -seller_id'));
            const totalRecord = mongoQueryTotal ? mongoQueryTotal.length : 0;
            let mongoQuery = ProductAuction.find({})
                    .populate("categories_ids", ('title slug -_id'))
                    .populate("category_id", ('title slug -_id'))
                    .populate("seller_id", ('company_name createdOn -_id'))
                    .populate("auctionpricing_id", ('-_id -product_id'))
                    .populate("auctionshipping_id", ('-_id -product_id -seller_id'));
            if (limit) {
                mongoQuery = ProductAuction.find({})
                    .populate("categories_ids", ('title slug -_id'))
                    .populate("category_id", ('title slug -_id'))
                    .populate("seller_id", ('company_name createdOn -_id'))
                    .populate("auctionpricing_id", ('-_id -product_id'))
                    .populate("auctionshipping_id", ('-_id -product_id -seller_id'))
                    .skip(skipRec)
                    .limit(parseInt(limit.toString()));
            }
            await mongoQuery.then((resp: any) => {
                return res.status(200).json({ status: 1, products: resp, totalRecord: totalRecord });
            })
            .catch((err: any) => {
                catcher(err);
            });
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { ProductAuction } = await productauctionSchema();
            let auctionData = req.body;

            auctionData.descrption = auctionData.description;
            const { Seller } = await sellerSchema();
            const userData = await Seller.findOne({user_id: token.sub});
            auctionData.seller_id = userData._id;
            auctionData.categories_ids = [];
            if (auctionData.sub_category) {
                Object.keys(auctionData.sub_category).map((key: any) =>
                    auctionData.categories_ids.push(auctionData.sub_category[key])
                );
            }
            // console.log(auctionData);
            // res.json({ status: 1, slug: auctionData, message: "Product Auction saved successfully" });
            // auctionData.slug = slugify(auctionData.title, { lower: true, trim: true });
            if (auctionData._id && auctionData._id != '') {
                const primaryId = auctionData._id;
                delete auctionData._id;
                let slug = slugify(auctionData.title, { lower: true, trim: true });
                await uniqueSlug(slug, slug, 1, primaryId).then((data: any) => {
                    slug = data;
                });
                auctionData.slug = slug;
                const resp = await ProductAuction.findByIdAndUpdate(primaryId, auctionData, { new: true }).catch(catcher);
                return res.status(200).json({ status: 1, record: resp, message: "Product updated successfully." });
            }
            let slug = slugify(auctionData.title, { lower: true, trim: true });
            await uniqueSlug(slug, slug).then((data: any) => {
                slug = data;
            });
            auctionData.slug = slug;
            let auctionModel = new ProductAuction(auctionData);
            await auctionModel.save().then((resp: any) => {
                res.json({ status: 1, auction: resp._id, message: "Product saved in draft successfully." });
            }).catch((err: any) => { catcher(err); });
        }
    }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
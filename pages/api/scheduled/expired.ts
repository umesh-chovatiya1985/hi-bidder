import { NextApiRequest, NextApiResponse } from "next"
import { productauctionSchema } from "../../../utils/schemas/productauctionSchema";
import { ResponseFuncs } from "../../../utils/types";
import { connect } from "../../../utils/connection";
import { NextApiResponseServerIO } from "../../../types/next";
import { auctionbidSchema } from "../../../utils/schemas/auctionbidSchema";
import { UserSchema } from "../../../utils/schemas/userSchema";
import { HtmlTemplateSchema } from "../../../utils/schemas/htmltemplateSchema";
import HtmlParser from "../libs/HtmlParser";
import { mailer } from "../mail-sender/mailer";

export const notifyWinner = async (userId: any, product: any, bidAmount: any) => {
    const { User } = await UserSchema();
    const userInfo = await User.findById({"_id": userId});
    if(userInfo){
        const email = userInfo.email;
        const { HtmlTemplate } = await HtmlTemplateSchema();
        const htmlTemplate = await HtmlTemplate.findOne({'slug': 'auction-winner'});
        if(htmlTemplate){
          const { ProductAuction } = await productauctionSchema();
          const productData = await ProductAuction.findById(product);
          const mailRecords = {company_name: process.env.COMPANY_NAME, name: userInfo.name, product_name:productData.title, bidAmount: bidAmount};
          const mailMessage = await HtmlParser(htmlTemplate.htmlTemplate, mailRecords);
          const mailSubject = await HtmlParser(htmlTemplate.subject, mailRecords);
          /** Send email to user */
          const mailOptions = {
              from: process.env.EMAIL_FROM,
              to: userInfo.email,
              subject: mailSubject,
              text: "Product winner email by Hi! bidder",
              html: mailMessage
          }
          await mailer(mailOptions).then((respo: any) => {
            console.log(respo);
          }).catch((err: any) => {
            console.error(err);
          });
        }
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { return res.status(400).json({ error }) };
    await connect();
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponseServerIO) => {
               const { ProductAuction } = await productauctionSchema();
               const { auctionBid } = await auctionbidSchema();
               var d = new Date();
               let dataUpdate = { status: "Expired", isActive: false, activeAt: new Date()};
               let condition = { expiryDate: { $lt: new Date() }, status: 'Publish'};
               let multi = { "multi": true };
               const productExpired = await ProductAuction.find(condition);
               if(productExpired.length > 0){
                    productExpired.forEach(async (product: any) => {
                        let productIndv = await ProductAuction.findById({_id: product._id});
                        const lastBid = await auctionBid.findOne({product: product._id}).sort({_id: -1});
                        if(lastBid){
                            const winner_id = lastBid.user;
                            const bidAmount = lastBid.bid_amount;
                            productIndv.winner_id = winner_id;
                            productIndv.winner_price = lastBid.bid_amount.toString();
                            await productIndv.save();
                            await notifyWinner(winner_id, product._id, bidAmount);
                        }
                    });
               }
               await ProductAuction.updateMany(condition, dataUpdate, multi)
                    .then((resp: any) => {
                        return res.json({status: 1, records: resp});
                    }).catch((err: any) => { catcher(err); });
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
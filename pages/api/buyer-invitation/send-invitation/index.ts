import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFuncs } from "../../../../utils/types";
import { buyerinviteSchema } from "../../../../utils/schemas/buyerinviteSchema";
import { connect } from "../../../../utils/connection";
import { getToken } from "next-auth/jwt";
import { HtmlTemplateSchema } from "../../../../utils/schemas/htmltemplateSchema";
import HtmlParser from "../../libs/HtmlParser";
import { productauctionSchema } from "../../../../utils/schemas/productauctionSchema";
import { UserSchema } from "../../../../utils/schemas/userSchema";
import { mailer } from "../../mail-sender/mailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    const token = await getToken({ req });
    await connect();
    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
               const { BuyerInvite } = await buyerinviteSchema();
               const { ProductAuction } = await productauctionSchema();               
               const { User } = await UserSchema(); 
               var date = new Date();
               date.setDate(date.getDate() + 3);
               let inviteData = req.body;
               inviteData.validTill = date;
               let buyerInvite = new BuyerInvite(inviteData);
               await buyerInvite.save().then(async (resp: any) => {
                    /** Send mail here */
                        const userRecord = await User.findOne({"_id": resp.buyer}).select('name email -_id');
                        const productInfo = await ProductAuction.findOne({_id: resp.product}).populate('seller_id', 'company_name company_number  -_id');
                        const { HtmlTemplate } = await HtmlTemplateSchema();
                        const htmlTemplate = await HtmlTemplate.findOne({'slug': 'buyer-invite-mail'});
                        if(htmlTemplate){
                            const inviteLink = process.env.BASE_URL+"/invitation/"+resp.buyer+"/"+resp._id+"/"+productInfo.slug;
                            let month = date.getMonth() + 1 > 12 ? "0"+1 : (date.getMonth() + 1 < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1))
                            const dateFormat = date.getDate()+"/"+month+"/"+date.getFullYear();
                            const mailRecords = {company_name: process.env.COMPANY_NAME, buyer_name: userRecord.name, product_name: productInfo.title, offer_bidamount: resp.bidAmount, offer_link: inviteLink, offer_till: dateFormat};
                            const mailMessage = await HtmlParser(htmlTemplate.htmlTemplate, mailRecords);
                            const mailSubject = await HtmlParser(htmlTemplate.subject, mailRecords);
                            /** Send email to user */
                            const mailOptions = {
                                from: process.env.EMAIL_FROM,
                                to: userRecord.email,
                                subject: mailSubject,
                                text: "Buyer invite to order",
                                html: mailMessage
                            }           
                            await mailer(mailOptions).then((respo: any) => {
                                console.log(respo);
                            });
                        }
                    /** End of send mail */
                    res.json({status: 1, message: "Buyer Invite sent successfully"});
               }).catch((err: any) => { catcher(err); });
        },
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { BuyerInvite } = await buyerinviteSchema();
            await BuyerInvite.find({buyer:token.sub, isActive: true, status: "Pending"})
                        .populate({path: 'product', populate: 
                        [
                            {path: 'seller_id', model: 'seller', select: 'company_name company_number  -_id'},
                            {path: 'category_id', model: 'category', select: 'title slug image -_id'},
                            {path: 'categories_ids', model: 'category', select: 'title slug image -_id'},
                            {path: 'photos_ids', model: 'productphotos', select: 'photo_url photo_alt is_default -_id'},
                            {path: 'auctionpricing_id', model: 'auctionpricing', select: '-_id'}
                        ]
                })
                .then(async (resp: any) => {                
                     if(resp){
                         return res.json({status: 1, record: resp});
                     }
                     return res.json({status: 0, record: resp});
            }).catch((err: any) => { catcher(err); });
            
        }
     }
    const response = handleCase[method];
    if (response) response(req, res);
    else res.status(400).json({ error: "No Response for This Request" });
}

export default handler;
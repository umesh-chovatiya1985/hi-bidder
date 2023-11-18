import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextApiResponseServerIO } from "../../../types/next";
import { connect } from "../../../utils/connection";
import { auctionbidSchema } from "../../../utils/schemas/auctionbidSchema";
import { UserSchema } from "../../../utils/schemas/userSchema";
import HtmlParser from "../libs/HtmlParser";
import { HtmlTemplateSchema } from "../../../utils/schemas/htmltemplateSchema";
import { mailer } from "../mail-sender/mailer";
import { productauctionSchema } from "../../../utils/schemas/productauctionSchema";

export const setRepeadBid = async (
  _id: any
) => {
  const { auctionBid } = await auctionbidSchema();
  const bidInfo = await auctionBid.findById({_id: _id}).populate('user', 'name image _id').populate('product', 'slug _id');
  const maxBid = await auctionBid.findOne({product: bidInfo.product}).sort({max_bid: -1});
  const lastMaxBid = maxBid ? maxBid.max_bid : 0;
  const count = await auctionBid.countDocuments();
  const bidSocket = {
    _id: _id,
    product: bidInfo?.product?.slug,
    createdAt: bidInfo?.createdAt,
    name: bidInfo?.user?.name,
    bid_amount: bidInfo?.bid_amount,
    max_bid: lastMaxBid,
    total_bids: count
  }
  bidInfo.max_bid  = lastMaxBid;
  bidInfo.total_bids = count;
  return {socketBid: bidSocket, bidInfo: bidInfo, maxBid: maxBid};
}

export const notifyMaxBid = async (userId: any, product: any, bidAmount: any, max_bid: any) => {
  const { User } = await UserSchema();
  const userInfo = await User.findById({"_id": userId});
  if(userInfo){
      const email = userInfo.email;
      const { HtmlTemplate } = await HtmlTemplateSchema();
      const htmlTemplate = await HtmlTemplate.findOne({'slug': 'max-outbid'});
      if(htmlTemplate){
        const { ProductAuction } = await productauctionSchema();
        const productData = await ProductAuction.findById(product);
        const mailRecords = {company_name: process.env.COMPANY_NAME, name: userInfo.name, email: userInfo.email, product_name:productData.title, maxBid: max_bid, currentBid: bidAmount};
        const mailMessage = await HtmlParser(htmlTemplate.htmlTemplate, mailRecords);
        const mailSubject = await HtmlParser(htmlTemplate.subject, mailRecords);
        /** Send email to user */
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: userInfo.email,
            subject: mailSubject,
            text: "Maximum Bid has been outbid by another bidder",
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

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const newbid = req.body;
    const token = await getToken({ req });
    await connect();    
    const { auctionBid } = await auctionbidSchema();
    /** Get last bid to check max bid */
    if(newbid.max_bid != 0){
      const lastBid = await auctionBid.findOne({product: newbid.product_id}).sort({_id: -1});
      if(lastBid){
        if(lastBid.user.equals(token.sub)){
            lastBid.max_bid = newbid.max_bid;
            await lastBid.save();
            const count = await auctionBid.countDocuments();
            let bidSocket = {
              _id: lastBid._id,
              product: lastBid?.product,
              createdAt: lastBid?.createdAt,
              name: lastBid?.user,
              bid_amount: lastBid?.bid_amount,
              max_bid: newbid.max_bid,
              total_bids: count
            }
            res?.socket?.server?.io?.emit("newbid", bidSocket);
            return  res.json({ status: 1, message: "Auction max bid placed successfully." });
        }
      }
      /** Inform last maxbid user */
        const lastMaxBid = await auctionBid.findOne({product: newbid.product_id}).sort({max_bid: -1});
        if(lastMaxBid){
          if(!(lastMaxBid.user.equals(token.sub))){
            newbid.bid_amount = (parseFloat(lastMaxBid.max_bid.toString()) + 100).toString();
            await notifyMaxBid(lastMaxBid.user, lastMaxBid.product, newbid.max_bid, newbid.bid_amount);
            lastMaxBid.isMaxNotified = true;
            await lastMaxBid.save();
        }
      }
      /** End of last maxbid user */
    }
    /** End of last bid */
    // dispatch to channel "message"
    const auctionData = {
      product: newbid.product_id,
      seller: newbid.seller_id,
      user: token.sub,
      bid_amount: newbid.bid_amount,
      max_bid: newbid.max_bid
    }
    let auctionBidModel = new auctionBid(auctionData);
    const catcher = (error: Error) => { res.status(400).json({ error }) };
    await auctionBidModel.save().then(async (resp: any) => { 
        const respoFun = await setRepeadBid(resp._id);
        res?.socket?.server?.io?.emit("newbid", respoFun.socketBid);
        let bidInfo = respoFun.bidInfo;
        let maxBid = respoFun.maxBid;
        /*** Replace new bid if max amount is exist */
        if(!(maxBid.user.equals(bidInfo.user._id))){
          if(parseFloat(bidInfo.max_bid.toString()) > parseFloat(bidInfo.bid_amount.toString())){
            const auctionData = {
              product: bidInfo?.product?._id,
              seller: bidInfo?.seller?._id,
              user: maxBid.user,
              bid_amount: (parseFloat(bidInfo.bid_amount.toString()) + 100),
              max_bid: 0
            }
            let auctionReBidModel = new auctionBid(auctionData);
            const reBidData = await auctionReBidModel.save();
            if(reBidData){
                const repeatRespoFun = await setRepeadBid(reBidData._id);
                res?.socket?.server?.io?.emit("newbid", repeatRespoFun.socketBid);
            }
          }
          else {
            const lastMaxBid = await auctionBid.findOne({product: newbid.product_id, isMaxNotified: false, max_bid: { $ne: 0 }}).sort({max_bid: -1});
            if(lastMaxBid){
              await notifyMaxBid(lastMaxBid.user, lastMaxBid.product, newbid.bid_amount, newbid.bid_amount);
              lastMaxBid.isMaxNotified = true;
              await lastMaxBid.save();
            }
          }
        }
        /*** Bid renew */
        return  res.json({ status: 1, message: "Auction bid placed successfully." });
    }).catch((err: any) => { catcher(err); });
  }
};

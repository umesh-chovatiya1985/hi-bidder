import mongoose, { model, Schema } from "mongoose"
import { auctionbid } from "../models/auctionbid";

 export const auctionbidSchema = async () => {
    const schemaOptions = {
       timestamps: { createdAt: 'createdAt' },
    };
    const auctionbidSchema = new Schema<auctionbid>({
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'productauction'
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            trim: true,
            ref: 'seller'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'user'
        },
        bid_amount: {
            type: Number,
            default: 0
        },
        max_bid: {
            type: Number,
            default: 0
        },
        is_winner: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        isMaxNotified: {
            type: Boolean,
            default: false
        },
    }, schemaOptions);

   const auctionBid = (mongoose.models.auctionbid as mongoose.Model<auctionbid>) || model<auctionbid>('auctionbid', auctionbidSchema);
   return { auctionBid }
}
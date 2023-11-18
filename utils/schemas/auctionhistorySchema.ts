import mongoose, { model, Schema } from "mongoose"
import { auctionhistory } from "../models/auctionhistory";

export const auctionhistorySchema = async () => {

    const schemaOptions = {
        timestamps: { createdAt: 'createdAt' },
    };

    const auctionhistorySchema = new Schema<auctionhistory>({
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'productauction'
        },
        auction_duration: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: String,
            required: true,
            trim: true
        },
        starting_bid: {
            type: String,
            required: true,
            trim: true
        },
        reserved_price: {
            type: String,
            required: true,
            trim: true
        },
        auction_start_date: {
            type: Date,
            required: false,
            default: null
        },
        auction_end_date: {
            type: Date,
            required: false,
            default: null
        }
    }, schemaOptions);

    const AuctionHistory = (mongoose.models.auctionhistory as mongoose.Model<auctionhistory>) || model<auctionhistory>('auctionhistory', auctionhistorySchema);
    return { AuctionHistory }
}
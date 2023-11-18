import mongoose, { model, Schema } from "mongoose"
import { auctionpricing } from "../models/auctionpricing";

export const auctionpricingSchema = async () => {

    const schemaOptions = {
        timestamps: { createdAt: 'createdAt' },
    };

    const auctionpricingSchema = new Schema<auctionpricing>({
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true
        },
        auction_duration: {
            type: String,
            required: true,
            trim: true
        },
        wharehouse_qty: {
            type: String,
            required: false,
            trim: true
        },
        inventory_qty: {
            type: String,
            required: false,
            trim: true
        },
        quantity: {
            type: String,
            required: true,
            trim: true
        },
        is_bulk: {
            type: Boolean,
            default: false
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

    const AuctionPricing = (mongoose.models.auctionpricing as mongoose.Model<auctionpricing>) || model<auctionpricing>('auctionpricing', auctionpricingSchema);
    return { AuctionPricing }
}
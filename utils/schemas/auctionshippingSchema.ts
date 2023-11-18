import mongoose, { model, Schema } from "mongoose"
import { auctionshipping } from "../models/auctionshipping";

export const auctionshippingSchema = async () => {

    const schemaOptions = {
        timestamps: { createdAt: 'createdAt' },
    };

    const auctionshippingSchema = new Schema<auctionshipping>({
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'user'
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'productauction'
        },
        shipping_cost: {
            type: String,
            required: false,
            trim: true
        },
        package_weight_kg: {
            type: String,
            required: false,
            trim: true
        },
        package_weight_gm: {
            type: String,
            required: false,
            trim: true
        },
        package_weight_width: {
            type: String,
            required: false,
            trim: true
        },
        package_weight_length: {
            type: String,
            required: false,
            trim: true
        },
        package_weight_height: {
            type: String,
            required: false,
            trim: true
        },
        offer_free_shipping: {
            type: String,
            required: false,
            trim: true
        },
        save_default_setting: {
            type: Boolean,
            trim: true,
            default: false
        }
    }, schemaOptions);

    const AuctionShipping = (mongoose.models.auctionshipping as mongoose.Model<auctionshipping>) || model<auctionshipping>('auctionshipping', auctionshippingSchema);
    return { AuctionShipping }
}
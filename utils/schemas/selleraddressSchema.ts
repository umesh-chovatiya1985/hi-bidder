import mongoose, { model, Schema } from "mongoose"
import { selleraddress } from "../models/selleraddress";

 export const selleraddressSchema = async () => {
    const schemaOptions = {
        timestamps: { createdAt: 'createdOn' },
    };
    const selleraddressSchema = new Schema<selleraddress>({
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: "seller"
        },
        country: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        address_one: {
            type: String,
            trim: true,
            required: true
        },
        address_two: {
            type: String,
            trim: true
        },
        building: {
            type: String,
            trim: true,
            required: true
        },
        pin_code: {
            type: String,
            trim: true,
            required: true
        },
        isVerified: {
            type: Boolean,
            trim: true,
            default: false
        },
        isActive: {
            type: Boolean,
            trim: true,
            default: false
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }, schemaOptions);

   const SellerAddress = (mongoose.models.selleraddress as mongoose.Model<selleraddress>) || model<selleraddress>('selleraddress', selleraddressSchema);
   
   return { SellerAddress }
}
import mongoose, { model, Schema } from "mongoose"
import { buyeraddress } from "../models/buyeraddress";

 export const buyeraddressSchema = async () => {
    const schemaOptions = {
        timestamps: { createdAt: 'createdOn' },
    };
    const buyeraddressSchema = new Schema<buyeraddress>({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: "users"
        },
        first_name: {
            type: String,
            trim: true,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            required: true
        },
        mobile_number: {
            type: String,
            trim: true,
            required: true
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
        address_for: {
            type: String, 
            trim: true,
            default: "shipping"
        },
        is_default: {
            type: Boolean, 
            trim: true,
            default: false
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

   const BuyerAddress = (mongoose.models.buyeraddress as mongoose.Model<buyeraddress>) || model<buyeraddress>('buyeraddress', buyeraddressSchema);
   return { BuyerAddress }
}
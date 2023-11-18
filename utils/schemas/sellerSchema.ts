import mongoose, { model, Schema } from "mongoose"
import { seller } from "../models/seller";

export const sellerSchema = async () => {
    const schemaOptions = {
        timestamps: { createdAt: 'createdOn' },
    };
    const sellerSchema = new Schema<seller>({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'user'
        },
        address_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            trim: true,
            ref: 'selleraddress'
        },
        seller_type: {
            type: String,
            required: true,
            trim: true
        },
        date_of_birth: {
            type: String,
            required: true,
            trim: true
        },
        company_name: {
            type: String,
            required: true,
            trim: true
        },
        company_number: {
            type: String,
            trim: true
        },
        pancard_number: {
            type: String,
            trim: true
        },
        gstin_number: {
            type: String,
            trim: true
        },
        seller_contact: {
            type: String,
            trim: true
        },
        contact_otp: {
            type: String,
            trim: true
        },
        seller_email: {
            type: String,
            trim: true
        },
        email_otp: {
            type: String,
            trim: true
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
        activateOn: {
            type: Date,
            trim: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }, schemaOptions);

    const Seller = (mongoose.models.seller as mongoose.Model<seller>) || model<seller>('seller', sellerSchema);
    return { Seller }
}
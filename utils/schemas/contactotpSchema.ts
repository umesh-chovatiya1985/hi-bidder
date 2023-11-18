import mongoose, { model, Schema } from "mongoose"
import { contactotp } from "../models/contactotp"

export const contactotpSchema = async () => {

    const schemaOptions = {
        timestamps: { updatedAt: 'updatedAt' },
    };

    const contactotpSchema = new Schema<contactotp>({
        contactno: {
            type: String,
            trim: true,
            required: true
        },
        contact_otp: {
            type: String,
            trim: true,
            required: true
        },
        isVerified: { 
            type: Boolean,
            default: false
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }, schemaOptions);

    const ContactOtp = (mongoose.models.contactotp as mongoose.Model<contactotp>) || model<contactotp>("contactotp", contactotpSchema);
    return { ContactOtp }
}
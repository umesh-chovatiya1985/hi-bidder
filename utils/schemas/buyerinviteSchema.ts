import mongoose, { model, Schema } from "mongoose"
import { buyerinvite } from "../models/buyerinvite";

 export const buyerinviteSchema = async () => {
    const schemaOptions = {
       timestamps: { createdAt: 'createdAt' },
    };
    const buyerinviteSchema = new Schema<buyerinvite>({
        product: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: true,
            ref: 'productauction'
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: true,
            ref: 'user'
        },
        bidAmount: {
            type: String,
            trim: true,
            required: true
        },
        status: {
            type: String,
            trim: true,
            default: "Pending"
        },
        rejectReason: {
            type: String
        },
        validTill: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            trim: true,
            default: true
        },
    }, schemaOptions);

   const BuyerInvite = (mongoose.models.buyerinvite as mongoose.Model<buyerinvite>) || model<buyerinvite>('buyerinvite', buyerinviteSchema);
   return { BuyerInvite }
}
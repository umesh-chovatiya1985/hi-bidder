import mongoose, { model, Schema } from "mongoose"
import { auction_winner } from "../../models/ecommerce/auction_winner";
import { boolean } from "yup";

 export const auctionwinnerSchema = async () => {

    const schemaOptions = {
       timestamps: { createdAt: 'createdAt' },
    };

    const auctionwinnerSchema = new Schema<auction_winner>({
        auction: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'productauction'
        },
        bid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'auctionbid'
        },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'user'
        },
        bid_amount: {
            type: Number,
            default: 0
        },        
        status: {
            type: Boolean,
            default: false
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        isOffer: {
            type: Boolean,
            default: false
        },
        offerStatus: {
            type: String,
            default: "Pending"
        },
        description: {
            type: String,
            default: ""
        },
        lastMailSend: {
            type: Date,
            default: null
        },
       isActive: {
           type: Boolean,
           trim: true,
           default: false
       },
    }, schemaOptions);

   const AuctionWinner = (mongoose.models.auctionwinner as mongoose.Model<auction_winner>) || model<auction_winner>('auctionwinner', auctionwinnerSchema);
   return { AuctionWinner }
}
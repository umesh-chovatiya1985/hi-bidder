import mongoose, { model, Schema } from "mongoose"
import { auctionorder } from "../../models/ecommerce/auctionorder";

 export const auctionorderSchema = async () => {

    const schemaOptions = {
       timestamps: { createdAt: 'createdAt' },
    };

    const auctionorderSchema = new Schema<auctionorder>({
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'productauction'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'user'
        },
        order_id: {
            type: String,
            required: true,
            trim: true
        },
        order_amount: {
            type: String,
            required: true,
            trim: true
        },
        shipping_charge: {
            type: String,
            required: true,
            trim: true
        },
        admin_charge: {
            type: String,
            required: true,
            trim: true
        },
        payable_amount: {
            type: String,
            required: true,
            trim: true
        },
        total_items: {
            type: String,
            required: true,
            trim: true,
            default: "1"
        },
        is_paid: {
            type: Boolean,
            default: false
        },
        payment_type: {
            type: String,
            trim: true
        },
        payment_ref : {
            type: String,
            trim: true
        },
        order_status: {
            type: String,
            trim: true
        },
        status_history: {
            type: String,
            trim: true
        },
        shipped_by: {
            type: String,
            trim: true
        },
        shipping_code: {
            type: String,
            trim: true
        },
        shipping_url: {
            type: String,
            trim: true
        },
        delivered_date: {
            type: String
        },
        order_date: {
            type: Date,
            default: null
        },
        order_expiry_date: {
            type: Date,
            default: null
        },
       isActive: {
           type: Boolean,
           trim: true,
           default: false
       },
    }, schemaOptions);

   const auctionOrder = (mongoose.models.auctionorder as mongoose.Model<auctionorder>) || model<auctionorder>('auctionorder', auctionorderSchema);
   return { auctionOrder }
}
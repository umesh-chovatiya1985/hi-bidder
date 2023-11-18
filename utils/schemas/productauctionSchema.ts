import mongoose, { model, Schema } from "mongoose"
import { productauction } from "../models/productauction";

export const productauctionSchema = async () => {

    const schemaOptions = {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    };

    const productauctionSchema = new Schema<productauction>({
        seller_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'seller'
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'category',
            default: null
        },
        categories_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'category',
            default: null
        }],
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        sku: {
            type: String,
            required: false,
            trim: true,
            default: null
        },
        condition: {
            type: String,
            required: true,
            trim: true
        },
        brand: {
            type: String,
            required: false,
            trim: true,
            default: null
        },
        model_no: {
            type: String,
            required: false,
            trim: true,
            default: null
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        long_description: {
            type: String,
            required: true,
            trim: true
        },
        default_image: {
            type: String,
            required: false,
            trim: true,
            default: null
        },
        photos_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'productphotos',
            default: null
        }],
        featured_ids: [{
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'productfeatured',
            default: null
        }],
        auctionpricing_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'auctionpricing',
            default: null
        },
        auctionshipping_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'auctionshipping',
            default: null
        },
        winner_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'users',
            default: null
        },
        winner_price: {
            type: String,
            required: false
        },
        payment_status: {
            type: Boolean,
            trim: true,
            default: false
        },
        is_completed: {
            type: Boolean,
            trim: true,
            default: false
        },
        isActive: {
            type: Boolean,
            trim: true,
            default: false
        },
        scheduleTime: {
            type: Date,
            default: null
        },
        activeAt: {
            type: Date,
            default: null
        },
        expiryDate: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            required: false,
            trim: true,
            default: "draft"
        },
        isDeleted: {
            type: Boolean,
            trim: true,
            default: false
        }
    }, schemaOptions);

    const ProductAuction = (mongoose.models.productauction as mongoose.Model<productauction>) || model<productauction>('productauction', productauctionSchema);
    return { ProductAuction }
}
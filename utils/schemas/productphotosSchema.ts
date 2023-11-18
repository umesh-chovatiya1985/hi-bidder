import mongoose, { model, Schema } from "mongoose"
import { productphotos } from "../models/productphotos";

export const productphotosSchema = async () => {

    const schemaOptions = {
        timestamps: { createdAt: 'createdAt' },
    };

    const productphotosSchema = new Schema<productphotos>({
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
            ref: 'productauction'
        },
        photo_url: {
            type: String,
            required: true,
            trim: true
        },
        photo_alt: {
            type: String,
            required: true,
            trim: true
        },
        is_default: {
            type: Boolean,
            trim: true,
            default: false
        },
        isActive: {
            type: Boolean,
            trim: true,
            default: false
        },
    }, schemaOptions);

    const ProductPhoto = (mongoose.models.productphotos as mongoose.Model<productphotos>) || model<productphotos>('productphotos', productphotosSchema);
    return { ProductPhoto }
}
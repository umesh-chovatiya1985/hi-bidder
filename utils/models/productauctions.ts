import mongoose from "mongoose";

export interface productauctions {
    seller_id: mongoose.Schema.Types.ObjectId,
    category_id: mongoose.Schema.Types.ObjectId,
    categories_ids?: mongoose.Schema.Types.ObjectId[] | undefined,
    title: String,
    slug: String,
    sku?: String,
    condition: String,
    brand?: String,
    model_no?: String,
    descrption: String,
    long_description: String
    default_image?: String,
    photos_ids?: mongoose.Schema.Types.ObjectId[] | undefined,
    featured_ids?: mongoose.Schema.Types.ObjectId[] | undefined,
    isActive?: boolean,
    status?: String,
    isDeleted?: boolean
}
import mongoose from "mongoose";

export interface helplist {
    category_id: mongoose.Schema.Types.ObjectId,
    title: String,
    slug?: String,
    description: String,
    image?: String,
    isUseful?: String,
    isActive?: boolean,
    createdOn?: Date
}
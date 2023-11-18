import mongoose from "mongoose";


export interface category {
    parent_id?: mongoose.Schema.Types.ObjectId | undefined,
    child_ids?: mongoose.Schema.Types.ObjectId[] | undefined,
    title: string,
    slug?: String,
    image?: String,
    description?: String,
    color?: String,
    level?: number,
    isActive: Boolean,
    createdOn: Date
}
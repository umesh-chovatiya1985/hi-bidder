import mongoose from "mongoose"

export interface helpcategory {
    topic_id: mongoose.Schema.Types.ObjectId,
    help_category: String,
    slug?: String,
    description?: String,
    image?: String,
    isActive?: boolean,
    createdOn?: Date
}
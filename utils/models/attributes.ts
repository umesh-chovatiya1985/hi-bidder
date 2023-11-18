import mongoose from "mongoose";

export interface attribute {
    category_id: mongoose.Schema.Types.ObjectId,
    label: String,
    field_type: String,
    field_options?: String,
    is_required?: boolean,
    isActive?: boolean,
    createdOn?: Date
}
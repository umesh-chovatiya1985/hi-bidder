import mongoose from "mongoose"

export interface productfeatured {
    product_id: mongoose.Schema.Types.ObjectId,
	featured_title: String,
	featured_value: String,
	featured_image: String,
	isActive?: boolean
}
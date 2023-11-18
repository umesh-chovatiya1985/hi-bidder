import mongoose from "mongoose"

export interface productphotos {
    product_id: mongoose.Schema.Types.ObjectId,
	photo_url: String,
	photo_alt?: String,
	is_default?: boolean,
	isActive?: boolean
}
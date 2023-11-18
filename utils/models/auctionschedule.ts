import mongoose from "mongoose"

export interface auctionschedule {
    product_id: mongoose.Schema.Types.ObjectId
	auction_date?: Date
	auction_time?: Date
	isFired: boolean,
	firedAt?: Date
}
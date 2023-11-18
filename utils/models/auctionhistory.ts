import mongoose from "mongoose"

export interface auctionhistory {
    product_id: mongoose.Schema.Types.ObjectId,
	auction_duration: String,
	quantity: String,
	starting_bid: String,
	reserved_price: String,
	auction_start_date: Date,
	auction_end_date: Date
}
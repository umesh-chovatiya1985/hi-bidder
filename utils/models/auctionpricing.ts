import mongoose from "mongoose"

export interface auctionpricing {
    product_id: mongoose.Schema.Types.ObjectId,
    auction_duration: String,
    wharehouse_qty?: String,
    inventory_qty?: String,
    quantity: String,
    is_bulk?: Boolean,
    starting_bid: String,
    reserved_price: String,
    auction_start_date: Date,
    auction_end_date: Date
}
import mongoose from "mongoose";

export interface auctionbid {
    product: mongoose.Schema.Types.ObjectId,
    seller: mongoose.Schema.Types.ObjectId | undefined,
    user: mongoose.Schema.Types.ObjectId,
    bid_amount: Number,
    max_bid?: Number,
    is_winner?: boolean,
    isActive?: boolean,
    isMaxNotified?: boolean
}
import mongoose from "mongoose";

export interface auction_winner {
    auction: mongoose.Schema.Types.ObjectId,
    bid: mongoose.Schema.Types.ObjectId,
    winner: mongoose.Schema.Types.ObjectId,
    bid_amount: Number,
    status?: boolean,
    isCompleted?: boolean,
    isOffer?: boolean,
    offerStatus?: string,
    description?: string,
    lastMailSend? : Date,
    isActive?: boolean
}
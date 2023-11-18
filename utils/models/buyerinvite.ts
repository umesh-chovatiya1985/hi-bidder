import mongoose from "mongoose";

export interface buyerinvite {
    product: mongoose.Schema.Types.ObjectId,
    buyer: mongoose.Schema.Types.ObjectId,
    bidAmount: String,
    status: String,
    rejectReason?: String,
    validTill: Date,
    isActive?: boolean
}
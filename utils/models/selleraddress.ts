import mongoose from "mongoose";

export interface selleraddress {
    seller_id: mongoose.Schema.Types.ObjectId,
    country: String,
    state: String,
    city: String,
    address_one: String,
    address_two: String,
    building: String,
    pin_code: String,
    isVerified?: boolean,
    isActive?: boolean,
    createdOn?: Date
}
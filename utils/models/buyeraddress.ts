import mongoose from "mongoose";

export interface buyeraddress {
    user_id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    mobile_number: String,
    country: String,
    state: String,
    city: String,
    address_one: String,
    address_two: String,
    building: String,
    pin_code: String,
    address_for?: String,
    is_default?: Boolean,
    isVerified?: boolean,
    isActive?: boolean,
    createdOn?: Date
}
import mongoose from "mongoose";

export interface seller {
    user_id:  mongoose.Schema.Types.ObjectId,
    address_id:  mongoose.Schema.Types.ObjectId | undefined,
    seller_type: String,
    date_of_birth: String,
    company_name: String,
    company_number: String,
    pancard_number?: String,
    gstin_number?: String,
    seller_contact?: String,
    contact_otp?: String,
    seller_email?: String,
    email_otp?: String,
    isVerified?: boolean,
    isActive?: boolean,
    activateOn?: Date,
    createdOn?: Date
}
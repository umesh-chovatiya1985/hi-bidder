import { Date } from "mongoose";

export interface contactotp {
    contactno: String,
    contact_otp: String,
    isVerified?: boolean,
    createdOn?: Date,
    updatedAt?: Date
}
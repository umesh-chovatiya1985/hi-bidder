import mongoose from "mongoose";

export interface orderpayment {
    order_id: mongoose.Schema.Types.ObjectId,
    payment_mode?: string,
    payment_amount?: string,
    payment_ref?: string,
    admin_verified?: boolean
}
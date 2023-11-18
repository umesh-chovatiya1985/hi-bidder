import mongoose from "mongoose";


export interface auctionorder {
    product: mongoose.Schema.Types.ObjectId | undefined,
    user: mongoose.Schema.Types.ObjectId | undefined,
    order_id: string,
    order_amount: string,
    shipping_charge?: string,
    admin_charge?: string,
    payable_amount: string,
    total_items: string,
    is_paid?: boolean,
    payment_type?: string,
    payment_ref? : string,
    order_status?: string,
    status_history?: string,
    shipped_by?: string,
    shipping_code?: string,
    shipping_url?: string,
    delivered_date?: string,
    order_date: Date,
    order_expiry_date: Date,
    isActive?: boolean
}
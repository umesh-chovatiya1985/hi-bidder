import mongoose from "mongoose"

export interface auctionshipping {
    seller_id: mongoose.Schema.Types.ObjectId,
    product_id: mongoose.Schema.Types.ObjectId,
    shipping_cost: string,
    package_weight_kg: string,
    package_weight_gm: string,
    package_weight_width: string,
    package_weight_length: string,
    package_weight_height: string,
    offer_free_shipping: string,
    save_default_setting: boolean
}
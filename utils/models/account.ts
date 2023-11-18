import mongoose from "mongoose";

export interface accounts {
    provider?: string,
    type?: string,
    providerAccountId?: string,
    access_token?: string,
    expires_at?: number,
    scope?: string,
    token_type?: string,
    id_token?: string,
    userId?: mongoose.Schema.Types.ObjectId,
}
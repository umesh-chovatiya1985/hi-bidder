import mongoose, { model, Schema } from "mongoose";
import { accounts } from "../models/account";

export const AccountSchema = async () => {   
    const AccountSchema = new Schema<accounts>({
        provider: {
            type: String,
            trim: true,
            default: ""
        },
        type: {
            type: String,
            trim: true,
            default: ""
        },
        providerAccountId: {
            type: String,
            trim: true,
            default: ""
        },
        access_token: {
            type: String,
            trim: true,
            default: ""
        },
        expires_at: {
            type: Number,
            trim: true
        },
        scope: {
            type: String,
            trim: true,
            default: ""
        },
        token_type: {
            type: String,
            trim: true,
            default: ""
        },
        id_token: {
            type: String,
            trim: true,
            default: ""
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: false,
            ref: 'users'
        }
    });
    const Account = (mongoose.models.account as mongoose.Model<accounts>) || model<accounts>('accounts', AccountSchema);
    return { Account }
}
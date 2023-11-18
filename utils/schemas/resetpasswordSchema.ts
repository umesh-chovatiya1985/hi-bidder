import mongoose, { model, Schema } from "mongoose"
import { resetpassword } from "../models/resetpassword"

export const ResetPasswordSchema = async () => {
    const ResetPasswordSchema = new Schema<resetpassword>({
        user_id: {
            type: String,
            required: true
        },
        reset_token: {
            type: String,
            required: true,
        },
        isActive: { 
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    });

    const ResetPassword = (mongoose.models.resetpassword as mongoose.Model<resetpassword>) || model<resetpassword>('resetpassword', ResetPasswordSchema);
    return { ResetPassword };
}
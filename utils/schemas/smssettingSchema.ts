import mongoose, { model, Schema } from "mongoose"
import { smssettings } from "../models/smssettings";

 export const smssettingsSchema = async () => {
    const schemaOptions = {
        timestamps: { updatedAt: 'updatedAt' },
    };
    const smssettingsSchema = new Schema<smssettings>({
        smsUrl: {
            required: true,
            type: String,
            trim: true
        },
        method: {
            required: true,
            type: String,
            trim: true
        },
        params:{
            required: true,
            type: String,
            trim: true
        },
        message: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: Date.now
      }
    }, schemaOptions);

   const SMSSettings = (mongoose.models.smssettings as mongoose.Model<smssettings>) || model<smssettings>('smssettings', smssettingsSchema);
   return { SMSSettings }
}
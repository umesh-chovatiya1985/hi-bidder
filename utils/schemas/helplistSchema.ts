import mongoose, { model, Schema } from "mongoose"
import { helplist } from "../models/helplist";

 export const helplistSchema = async () => {

    const schemaOptions = {
       timestamps: { createdAt: 'createdAt' },
    };

    const helplistSchema = new Schema<helplist>({
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: "helpcategory"
        },
        title: { 
            type: String,
            trim: true,
            required: true
        },
        slug: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        image: {
            type: String,
            trim: true
        },
        isUseful:  {
            type: String,
            trim: true,
            default: "0"
        },
        isActive: {
           type: Boolean,
           trim: true,
           default: false
        }
    },schemaOptions);

   const HelpList = (mongoose.models.helplist as mongoose.Model<helplist>) || model<helplist>('helplist', helplistSchema);
   return { HelpList }
}
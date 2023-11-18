import mongoose, { model, Schema } from "mongoose"
import { helpcategory } from "../models/helpcategory";

 export const helpcategorySchema = async () => {
     const schemaOptions = {
        timestamps: { createdAt: 'createdOn' },
    };
    const helpcategorySchema = new Schema<helpcategory>({
        topic_id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            ref: 'helptopic'
        },
        help_category: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            trim: true,
            default: false
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }, schemaOptions);

   const HelpCategory = (mongoose.models.helpcategory as mongoose.Model<helpcategory>) || model<helpcategory>('helpcategory', helpcategorySchema);
   return { HelpCategory }
}
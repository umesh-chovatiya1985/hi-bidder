import mongoose, { model, Schema } from "mongoose"
import { helptopic } from "../models/helptopic";

 export const helptopicSchema = async () => {
    const schemaOptions = {
        timestamps: { updatedAt: 'updatedAt' },
    };
    const helptopicSchema = new Schema<helptopic>({
        topic_name: {
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
        isActive: {
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }, schemaOptions);

   const HelpTopic = (mongoose.models.helptopic as mongoose.Model<helptopic>) || model<helptopic>('helptopic', helptopicSchema);
   return { HelpTopic }
}
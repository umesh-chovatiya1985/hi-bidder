import mongoose, { model, Schema } from "mongoose"
import { contentpage } from "../models/contentpage"

export const ContentPageSchema = async () => {
    const schemaOptions = {
        timestamps: { updatedAt: 'updatedAt' },
    };
    const ContentPageSchema = new Schema<contentpage>({
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        meta_title: {
            type: String,
            trim: true,
        },
        meta_description: {
            type: String,
            trim: true,
        },
        meta_image: {
            type: String,
            trim: true,
        },
        isActive: { 
            type: Boolean,
            default: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    }, schemaOptions);

    const ContentPage = (mongoose.models.contentpage as mongoose.Model<contentpage>) || model<contentpage>('contentpage', ContentPageSchema);

    return { ContentPage };
}
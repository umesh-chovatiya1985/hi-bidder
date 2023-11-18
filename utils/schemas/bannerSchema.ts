import mongoose, { model, Schema } from "mongoose"
import { banner } from "../models/banner";

export const bannerSchema = async () => {
    const bannerSchema = new Schema<banner>({
        image: { 
            type: String,
            trim: true,
            required: true
        },
        alt: { 
            type: String,
            trim: true,
            required: true
        },
        title: { 
            type: String,
            trim: true,
            required: true
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
        }
    });

    const Banner = (mongoose.models.banner as mongoose.Model<banner>) || model<banner>('banner', bannerSchema);

    return { Banner }
}
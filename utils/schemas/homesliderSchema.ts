import mongoose, { model, Schema } from "mongoose"
import { homeslider } from "../models/homeslider"

export const homesliderSchema = async () => {
    const homesliderSchema = new Schema<homeslider>({
        image: {
            type: String,
            trim: true,
            required: true
        },
        hTitle: {
            type: String,
            trim: true,
            required: true
        },
        contentTitle: {
            type: String,
            trim: true
        },
        linkTitle: {
            type: String,
            trim: true
        },
        linkUrl: {
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
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    })

    const HomeSlider = (mongoose.models.homeslider as mongoose.Model<homeslider>) || model<homeslider>('homeslider', homesliderSchema);

    return { HomeSlider }
}
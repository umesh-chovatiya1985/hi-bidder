import mongoose, { model, Schema } from "mongoose"
import { htmltemplate } from "../models/htmltemplate"

export const HtmlTemplateSchema = async () => {
    const htmlTemplateSchema = new Schema<htmltemplate>({
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            trim: true
        },
        subject: {
            type: String,
            trim: true
        },
        htmlTemplate: {
            type: String,
            required: true,
            trim: true
        },
        isActive: { 
            type: Boolean,
            default: true
        }
    });

    const HtmlTemplate = (mongoose.models.htmltemplate as mongoose.Model<htmltemplate>) || model<htmltemplate>('htmltemplate', htmlTemplateSchema);
    return { HtmlTemplate }
} 
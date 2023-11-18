import mongoose, { model, Schema } from "mongoose"
import { attribute } from "../models/attributes";

 export const attributeSchema = async () => {
    const schemaOptions = {
        timestamps: { createdAt: 'createdOn' },
    };
    const attributeSchema = new Schema<attribute>({
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: true
        },
        label: {
            type: String,
            trim: true,
            required: true
        },
        field_type: { 
            type: String,
            trim: true,
            default: "text"
        },
        field_options: { 
            type: String,
            trim: true,
            default: ""
        },
        is_required: { 
            type: Boolean,
            default: false
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

   const Attribute = (mongoose.models.attribute as mongoose.Model<attribute>) || model<attribute>('attribute', attributeSchema);
   return { Attribute }
}
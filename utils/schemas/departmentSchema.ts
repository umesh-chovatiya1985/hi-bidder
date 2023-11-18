import mongoose, { model, Schema } from "mongoose"
import { department } from "../models/department";

 export const departmentSchema = async () => {
    const schemaOptions = {
        timestamps: { updatedAt: 'updatedAt' },
    };
    const departmentSchema = new Schema<department>({
        department: {
            required: true,
            type: String,
            trim: true
        },
        description: {
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

   const Department = (mongoose.models.department as mongoose.Model<department>) || model<department>('department', departmentSchema);
   return { Department }
}
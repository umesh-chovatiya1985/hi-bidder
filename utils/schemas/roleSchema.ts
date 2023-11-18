import mongoose, { model, Schema } from "mongoose"
import { roles } from "../models/roles";

 export const RolesSchema = async () => {
   const schemaOptions = {
        timestamps: { updatedAt: 'updatedAt' },
    };
    const RolesSchema = new Schema<roles>({
      role: {
         required: true,
         type: String,
         trim: true
      },
      permissions : {
         type: String,
         trim: true 
      },
      department: {
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

   const Roles = (mongoose.models.Roles as mongoose.Model<roles>) || model<roles>('roles', RolesSchema);
   return { Roles }
}
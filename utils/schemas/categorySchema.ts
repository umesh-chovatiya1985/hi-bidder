//IMPORT MONGOOSE
import mongoose, { model, Schema } from "mongoose"
import { category } from "../models/category"

// connection function
export const CategorySchema = async () => {
  // OUR TODO SCHEMA
  const CategorySchema = new Schema<category>({
    title: {
      type: String,
      trim: true,
      required: true
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: false,
      ref: 'category',
      default: null
    },
    child_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: false,
      ref: 'category',
      default: []
    }],
    slug: String,
    image: String,
    description: {
      type: String,
      trim: true,
      default: ""
    },
    color: {
      type: String,
      trim: true,
      required: true
    },
    level: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdOn: {
      type: Date,
      default: Date.now
    }
  })
  // OUR TODO MODEL
  // const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)
  const Category = (mongoose.models.category as mongoose.Model<category>) || model<category>('category', CategorySchema);
  return { Category }
}
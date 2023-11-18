//IMPORT MONGOOSE
import mongoose, { model, Schema } from "mongoose"
import { user } from "../models/user";

// connection function
export const UserSchema = async () => {
  // OUR TODO SCHEMA
  const UserSchema = new Schema<user>({
    name: {
      type: String,
      trim: true,
      require: true
    },
    contact: {
      type: Number,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true,
      default: "default-user.jpg"
    },
    social_media: {
      type: String,
      trim: true
    },
    social_media_token: {
      type: String,
      trim: true
    },
    is_contact_verified: {
      type: Boolean,
      trim: true,
      default: false
    },
    contact_otp: {
      type: String,
      trim: true,
      default: ""
    },
    user_role: {
      type: String,
      trim: true,
      default: "User"
    },
    is_seller: {
      type: Boolean,
      trim: true,
      default: false
    },
    emailVerified: {
      type: Boolean,
      trim: true,
      default: false
    },
    email_otp: {
      type: String,
      trim: true,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdOn: {
      type: Date,
      default: Date.now
    }
  })

  const User = (mongoose.models.user as mongoose.Model<user>) || model<user>('user', UserSchema);
  return { User }
}
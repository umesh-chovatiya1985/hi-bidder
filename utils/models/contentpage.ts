import { Date } from "mongoose";

export interface contentpage {
    title: String,
    slug?: String,
    image?: String,
    description: String,
    meta_title?: String,
    meta_description?: String,
    meta_image?: String,
    isActive?: boolean,
    createdOn?: Date,
    updatedAt?: Date
}
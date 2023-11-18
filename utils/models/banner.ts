import { Date } from "mongoose";

export interface banner {
    image: String,
    alt: String,
    title: String,
    isActive?: boolean,
    createdOn?: Date,
    updatedAt?: Date
}
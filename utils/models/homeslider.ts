import { Date } from "mongoose";

export interface homeslider {
    image: String,
    hTitle: String,
    contentTitle?: String,
    linkTitle?: String,
    linkUrl?: String,
    isActive?: boolean,
    createdOn?: Date,
    updateAt?: Date
}
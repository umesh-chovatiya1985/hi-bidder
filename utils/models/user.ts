export interface user {
    name: string,
    contact?: Number,
    email: String,
    password?: String,
    image?: String,
    social_media?: String,
    social_media_token?: String,
    is_contact_verified?: Boolean,
    contact_otp?: String,
    user_role?: String,
    is_seller?: Boolean,
    emailVerified?: Boolean,
    email_otp?: String,
    isActive: Boolean,
    isDeleted: Boolean,
    createdOn: Date
}
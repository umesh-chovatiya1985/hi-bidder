import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    name: String,
    contact: String,
    email: String,
    password: String,
    image: String,
    social_media: String,
    social_media_token: String,
    is_contact_verified: Boolean,
    contact_otp: String,
    user_role: String,
    is_seller: Boolean,
    emailVerified: Boolean,
    email_otp: String,
    isActive: Boolean,
    isDeleted: Boolean
  }

  type Response {
    status: Int, 
    record: [User]!
  }

  type SingleResponse {
    status: Int, 
    record: User
  }

  input UserInput {
    name: String,
    contact: String = "",
    email: String,
    password: String = null,
    image: String,
    social_media: String = "",
    social_media_token: String = "", 
    is_contact_verified: Boolean = false,
    contact_otp: String = "",
    user_role: String = "User",
    is_seller: Boolean = false,
    emailVerified: Boolean = false,
    email_otp: String = "",
    isActive: Boolean = true,
    isDeleted: Boolean = false
  }

  type Query {
    users: Response,
    user(_id: ID!): SingleResponse
  }

  type Mutation {
    createUser(userInput: UserInput): SingleResponse
  }
`
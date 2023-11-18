import { gql } from "apollo-server-micro";

export const categoryTypeDefs = gql`
    type Categories {
        title: String,
        slug: String,
        image: String,
        description: String,
        color: String,
        level: Int
    }
    type catResponse {
        status: Int, 
        record: [Categories]!
    }

    type catSingleResponse {
        status: Int, 
        record: Categories
    }
    extend type Query {
        categories(limit: Int!, page: Int!): [catResponse]!,
        category(_id: ID!): catSingleResponse!
    }
`
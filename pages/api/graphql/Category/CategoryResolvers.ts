import { CategorySchema } from "../../../../utils/schemas/categorySchema";

export const categoryResolvers = {
    Query: {
        categories: async (_: any, data: { limit: any, page: any }) => {
            const { Category } = await CategorySchema();
            const categories =  await Category.find().limit(data.limit).skip((data.limit) * (data.page));
            return { status: categories.length > 0 ? 1 : 0, record: categories };
        },
        category: async (_:any, _id: any) => {
            const { Category } = await CategorySchema();
            const category = await Category.findById(_id);
            return { status: 1, record: category };
        }
    }
  }
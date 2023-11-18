import { UserSchema } from "../../../../utils/schemas/userSchema";

export const userResolvers = {
    Query: {
      users: async (_: any) => {
          const { User } = await UserSchema();
          const users = await User.find();
          return { status: users.length > 0 ? 1 : 0, record: users };
      },
      user: async (_:any, _id: any) => {
          const { User } = await UserSchema();
          const user = await User.findById(_id);
          return { status: 1, record: user };
      }
    },
    Mutation: {
      createUser: async (_: any, userInput: any) => {
            const { User } = await UserSchema();
            const createdUser = new User(userInput.userInput);
            const res = await createdUser.save();
            return { status: 1, record : res};
      }
    }
  }
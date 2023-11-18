//IMPORT MONGOOSE
import mongoose from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env

// connection function
export const connect = async () => {
  // if(mongoose.connection.readyState == 0){
    const conn = await mongoose
      .connect(MONGODB_URI as string)
      .catch(err => console.log(err));
    console.log("[MongoDB] - status : Mongoose Connection Established");
  // }
  return { conn }
}
//IMPORT MONGOOSE
import mongoose from "mongoose"

// connection function
export const TodoSchema = async () => {    
    // OUR TODO SCHEMA
    const TodoSchema = new mongoose.Schema({
      item: String,
      completed: Boolean,
    })
    // OUR TODO MODEL
    const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
    return { Todo }
}
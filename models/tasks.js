import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
    title: { type: String, required: true,unique:true },
    description: { type: String, required: true },
    due_date: { type: String, required: true },
},{timestamps:true})

const taskModel = mongoose.model('tasks', tasksSchema);


export default taskModel;
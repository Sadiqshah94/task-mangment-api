import taskModel from "../models/tasks.js";

export const taskControllers = {
  getAllTask: async (req, res) => {
    try {
      const response = await taskModel.find();
      res.status(200).send({ status: 200, message: "success", data: response });
    } catch (error) {
      res.status(400).send({ status: 400, message: "something went wrong" });
    }
  },
  addTask: async (req, res) => {
    try {
      const data = req.body;
      const response = await taskModel.create(data);
      res.status(201).send({
        status: 201,
        message: "Task created successfully",
        data: response,
      });
      
    } catch (error) {
      if (error.code === 11000) {
      return res.status(409).send({
        status: 409,
        message: "Task already exists",
      });
    }
      res.status(400).send({ status: 400, message: "something went wrong" });
    }
    },
  
  deleteTask:async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
      const response = await taskModel.findByIdAndDelete(id);
      res.status(200).send({
        status: 200,
        message: "Task deleted successfully",
        data: response,
      });
    } catch (error) {
      res.status(400).send({ status: 400, message: "something went wrong" });
    }
    },
  updateTask:async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
      const response = await taskModel.findByIdAndUpdate(id,updatedData);
      res.status(200).send({
        status: 200,
        message: "Task Updated successfully",
        data: updatedData,
      });
    } catch (error) {
      res.status(400).send({ status: 400, message: "something went wrong" });
    }
    },
};

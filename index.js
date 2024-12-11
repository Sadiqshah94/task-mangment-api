import swaggerJsdoc from 'swagger-jsdoc';
import swaggerui from "swagger-ui-express";
import cors from 'cors';

import express from 'express';
import mongoose from 'mongoose';



import dotenv from 'dotenv';
import { taskRoutes } from './routes/taskRoutes.js';




dotenv.config();
const PORT = process.env.PORT || 8080;
const db = process.env.MONGODB_URI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "API for managing tasks",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`,
      },
      
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the task",
              example: "Complete backend API",
            },
            description: {
              type: "string",
              description: "Detailed description of the task",
              example: "Build and test the backend API for the project",
            },
            due_date: {
              type: "string",
              format: "date-time",
              description: "The due date of the task",
              example: "2024-12-31T23:59:59.000Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the task was created",
              example: "2024-12-10T10:00:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the task was last updated",
              example: "2024-12-11T10:00:00.000Z",
            },
          },
          required: ["title", "description", "due_date"],
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Add this to include route documentation
};


const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static("/api-docs"));


const specs = swaggerJsdoc(options);
app.use('/api/docs', swaggerui.serve, swaggerui.setup(specs));


// starter server url 
app.get('/', (req,res) => {
    res.send("welcome to backend")
})

// routes defined 
app.use('/tasks', taskRoutes);
app.use('/api/docs', swaggerui.serve, swaggerui.setup(specs));



// db connections 
const connectToDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};

connectToDB();

// server connections 
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
})
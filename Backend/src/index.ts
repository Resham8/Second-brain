declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from "cors";
dotenv.config();

import userRouter from "./routes/user";
import contentRouter from "./routes/content";
import shareRouter from "./routes/share";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(contentRouter);
app.use(shareRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry, Page not found");
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI as string);
    console.log("conntected to MongoDb");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();

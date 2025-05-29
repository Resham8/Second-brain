declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

import { z } from "zod";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";

const uri = process.env.MONGOOSE_URI;
const saltRounds = parseInt(process.env.SALT_ROUNDS || "4");

if (!uri) {
  throw new Error("MONGO_URI is missing in environment variables");
}

// console.log("MONGO_URI:", process.env.MONGOOSE_URI);

mongoose.connect(uri);

const app = express();
app.use(express.json());

const userSchema = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});

app.post("/api/v1/signup", async (req, res) => {
  const validatedData = userSchema.safeParse(req.body);

  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "User Signup" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const validatedData = userSchema.safeParse(req.body);
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string
      );
      res.status(200).json({ token });
    }
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  const tags = [];
  //@ts-ignore
  console.log(req.userId);
  await ContentModel.create({
    link: link,
    type: type,
    title: title,
    tags: [],
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    msg: "content added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const existingContent = await ContentModel.find({ userId }).populate(
    "userId",
    "username"
  );

  res.json({
    content: existingContent,
  });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    // @ts-ignore
    userId: req.userId,
  });

  res.json({
    msg: "Deleted",
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  try {
    const isShare = req.body.share;
    if (isShare) {
      const existingLink = await LinkModel.findOne({
        userId: req.userId,
      });

      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }

      const uniqueId = uuidv4();
      const shareableLink = uniqueId;

      const newLink = await LinkModel.create({
        hash: uniqueId,
        // @ts-ignore
        userId: req.userId,
      });

      res.json({
        hash: shareableLink,
      });
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        msg: "Removed Link.",
      });
    }

    res.status(400).json({ message: "Share flag is missing or false." });
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      msg: "Sorry link not found",
    });
    return;
  }
  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      msg: "user not found, error should ideally not happen",
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

app.listen(3000);

console.log("listning");

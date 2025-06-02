import { Router } from "express";
import { UserModel } from "../db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
});

const userRouter = Router();
userRouter.post("/api/v1/signup", async (req, res) => {
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

userRouter.post("/api/v1/signin", async (req, res) => {
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


export default userRouter;
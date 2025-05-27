import mongoose, { model, modelNames, Schema, Types } from "mongoose";

interface User {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const contentTypes = ["image", "video", "article", "audio", "website"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId:{type: Types.ObjectId, ref:"User", required:true}
});

export const UserModel = model("User", userSchema);
export const TagModel = model("Tags",tagSchema);
export const ContentModel = model("Content", contentSchema);
export const LinkModel = model("Link", linkSchema);

import { Router } from "express";
import { userMiddleware } from "../Middleware/middleware";
import { ContentModel } from "../db";

const contentRouter = Router();

contentRouter.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  const tags = [];

  await ContentModel.create({
    link: link,
    type: type,
    title: title,
    tags: [],
    userId: req.userId,
  });

  res.json({
    msg: "content added",
  });
});

contentRouter.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const existingContent = await ContentModel.find({ userId }).populate(
    "userId",
    "username"
  );

  res.json({
    content: existingContent,
  });
});

contentRouter.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    _id: contentId,
    userId: req.userId,
  });

  res.json({
    msg: "Deleted",
  });
});

export default contentRouter;

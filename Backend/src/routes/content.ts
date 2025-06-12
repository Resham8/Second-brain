import { Router } from "express";
import { userMiddleware } from "../Middleware/middleware";
import { ContentModel, TagModel } from "../db";

const contentRouter = Router();

contentRouter.post("/api/v1/content", userMiddleware, async (req, res) => {
  const {link, type, title, tags} = req.body;

  const tagId = [];

  for (const tagTile of tags) {
    let tag = await TagModel.findOne({ title: tagTile });

    if (!tag) {
      tag = await TagModel.create({
        title: tagTile,
      });
    }

    tagId.push(tag._id);
  }

  await ContentModel.create({
    link: link,
    type: type,
    title: title,
    tags: tagId,
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
    "username",
  ).populate("tags","title");

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

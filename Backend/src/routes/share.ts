import { Router } from "express";
import { ContentModel, LinkModel, UserModel } from "../db";
import { userMiddleware } from "../Middleware/middleware";
import { v4 as uuidv4 } from "uuid";

const shareRouter = Router();

shareRouter.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
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

shareRouter.get("/api/v1/brain/:shareLink", async (req, res) => {
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
  }).populate("userId", "username").populate("tags","title");

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
    content: content,
  });
});

export default shareRouter;

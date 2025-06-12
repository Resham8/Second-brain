import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  id: string;
}

// export interface userRequest extends Request {
//   userId?: string;
// }

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (authHeaders) {
      const decoded = jwt.verify(
        authHeaders as string,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      if (decoded) {
        // @ts-ignore
        req.userId = decoded.userId;
        // console.log("from middleware ",decoded)        
        next();
      } else {
        res.status(403).json({ msg: "You are not logged In.." });
      }
    }
  } catch (error) {
    console.error("middleware error: ", error);
  }
};

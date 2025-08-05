import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./config.js";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    user?: any;
  }
}

export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.status(401).json({
        message: "No authorization header provided",
      });
    }

    const token = header;

    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

    req.userId = decoded._id || decoded.id || decoded.sub;
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

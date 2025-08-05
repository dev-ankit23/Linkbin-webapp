import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./config.js";

// Extend Express Request type to include user data
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

    // Step 1: Check for Authorization header
    if (!header) {
      return res.status(401).json({
        message: "No authorization header provided",
      });
    }

    // Step 2: Extract token from "Bearer <token>"
    const token = header;

    // Step 3: Verify token
    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

    // Step 4: Attach user info to the request object
    // Use '_id' or 'id' (whichever your token payload includes)
    req.userId = decoded._id || decoded.id || decoded.sub;
    req.user = decoded;

    next(); // Allow the request to proceed
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

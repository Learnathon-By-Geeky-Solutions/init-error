import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { ApiResponse } from "../utils/api-response";

export const verifyJWT = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json(new ApiResponse(401, null, "Unauthorized request"));
    }

    // Verify and decode the JWT
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };

    if (!decodedToken || !decodedToken.userId) {
      res.status(401).json(new ApiResponse(401, null, "Invalid access token"));
    }

    // Fetch the user from the database
    const user = await db
      .select({
        id: userTable.userId,
        email: userTable.email,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
      })
      .from(userTable)
      .where(eq(userTable.userId, decodedToken.userId))
      .then((result) => result[0]); 
      
    if (!user) {
      res.status(401).json(new ApiResponse(401, null, "User not found"));
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error: any) {
    console.error("JWT Verification Error:", error);
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          null,
          error.message || "Invalid or expired access token"
        )
      );
  }
};

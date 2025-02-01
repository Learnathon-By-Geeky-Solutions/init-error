import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/api-response";

export const signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
  
      if ([name, email, password].some((field) => !field || field.trim() === "")) {
         res
          .status(400)
          .json(new ApiResponse(400, {}, "Name, email, and password are required"));
      }
  
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
  
      if (existingUser.length > 0) {
         res.status(409).json(new ApiResponse(409, {}, "A user with this email already exists"));
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
      };
  
      await db.insert(usersTable).values(newUser);
  
      // Exclude password before sending response
      const { password: _, ...userWithoutPassword } = newUser;
  
      res
        .status(201)
        .json(new ApiResponse(201, userWithoutPassword, "User created successfully"));
    } catch (error) {
      console.error(error);
      res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
};

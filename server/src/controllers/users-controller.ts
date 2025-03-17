import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/api-response";
import { db } from "../db/index";
import { userTable } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res
          .status(401)
          .json(new ApiResponse(401, {}, "Unauthorized request"));
      }

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              {},
              "Old password and new password are required"
            )
          );
      }

      const user = await db
        .select()
        .from(userTable)
        .where(eq(userTable.userId, userId));

      if (!user || user.length === 0) {
        return res.status(404).json(new ApiResponse(404, {}, "User not found"));
      }

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        user[0].password
      );

      if (!isPasswordValid) {
        return res
          .status(403)
          .json(new ApiResponse(403, {}, "Invalid old password"));
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await db
        .update(userTable)
        .set({ password: hashedNewPassword })
        .where(eq(userTable.userId, userId));

      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
    } catch (error) {
      console.error("Error during password change:", error);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
    }
  }
);

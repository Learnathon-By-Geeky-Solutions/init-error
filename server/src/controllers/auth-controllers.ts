import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/api-response";
import { userTable } from "../db/schema/tbl-user";
import { sendVerificationEmail } from "../utils/send-verification-email";
import { generateVerificationCode } from "../utils/generate-verification-code";
import { generateExpiryDate } from "../utils/generate-verification-code";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

export const signup = asyncHandler(
  async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (
      [firstName, lastName, email, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
    }

    // Check if the user already exists by email
    const existingUserByEmail = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password once for both cases
    const verifyCode = generateVerificationCode();
    const verifyCodeExpiry = generateExpiryDate();

    if (existingUserByEmail.length > 0) {
      const user = existingUserByEmail[0];

      // If the user is already verified, return an error
      if (user.isVerified) {
        res
          .status(400)
          .json(
            new ApiResponse(400, {}, "User already exists with this email")
          );
      }

      

      // If the user is not verified, update their details
      await db
        .update(userTable)
        .set({
          password: hashedPassword,
          verifyCode,
          verifyCodeExpiry,
        })
        .where(eq(userTable.email, email));

      // Send verification email
      const emailResponse = await sendVerificationEmail(
        email,
        firstName,
        verifyCode
      );

      if (!emailResponse.success) {
        res
          .status(500)
          .json(new ApiResponse(500, {}, "Failed to send verification email"));
      } 

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { email, firstName },
            "User details updated. Please verify your email."
          )
        );
    }

    // If no user exists, create a new user
    const newUser = {
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry,
      isVerified: false,
    };

    await db.insert(userTable).values(newUser);

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      firstName,
      verifyCode
    );

    if (!emailResponse.success) {
      return res
        .status(500)
        .json(new ApiResponse(500, {}, "Failed to send verification email"));
    } 

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { newUser },
          "User registered successfully. Please verify your email."
        )
      );
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
});



export const login = asyncHandler(
  async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => !field || field.trim() === "")) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Email and password are required"));
    }

    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user || !user[0].isVerified) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "User not found or Not Verified"));
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json(new ApiResponse(401, {}, "Invalid credentials"));
    }

    let accessToken;
    try {
      accessToken = jwt.sign(
        { userId: user[0].userId, email: user[0].email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
    } catch (jwtError) {
      console.error("JWT Error:", jwtError);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Failed to generate token"));
    }

    // Set the access token as a cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevent access from JavaScript
      secure: true, // Ensure the cookie is sent only over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // Required for cross-origin cookies
    });

    const loginUser = user[0];

    return res.status(200).json({
      data: loginUser,
      accessToken: accessToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
});

export const logout = asyncHandler(
  async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(new ApiResponse(401, {}, "Unauthorized request"));
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS in production
      sameSite: "strict",
    });

    return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
  }
});

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const decodedEmail = decodeURIComponent(email);

    // Find the user by email
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, decodedEmail));

    if (user.length === 0) {
      res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const existingUser = user[0];
    const isCodeValid = existingUser.verifyCode === code;
    const isCodeNotExpired =
      new Date(existingUser.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update user's verification status
      await db
        .update(userTable)
        .set({ isVerified: true })
        .where(eq(userTable.email, decodedEmail));

      res
        .status(200)
        .json(new ApiResponse(200, {}, "Account verified successfully"));
    } else if (!isCodeNotExpired) {
      res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Verification code has expired. Please sign up again to get a new code."
          )
        );
    } else {
      res
        .status(400)
        .json(new ApiResponse(400, {}, "Incorrect verification code"));
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json(new ApiResponse(500, {}, "Error verifying user"));
  }
};

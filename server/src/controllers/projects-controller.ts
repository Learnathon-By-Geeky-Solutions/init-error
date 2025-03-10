import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/asyncHandler";
import { projectTable } from "../db/schema/tbl-project";
import { and, eq, sql } from "drizzle-orm";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res
          .status(401)
          .json(new ApiResponse(401, {}, "Unauthorized request"));
      }

      const { title, description, categories, mediaFiles, tags, projectLinks } =
        req.body;

      // Validate required fields
      if (
        [title, description].some(
          (field) => typeof field !== "string" || field.trim() === ""
        ) ||
        !Array.isArray(categories) ||
        categories.length === 0 ||
        !Array.isArray(tags) ||
        tags.length === 0 ||
        typeof projectLinks !== "object" ||
        Object.keys(projectLinks).length === 0
      ) {
        return res
          .status(400)
          .json(new ApiResponse(400, {}, "All fields are required"));
      }

      const newProject = {
        projectId: uuidv4(),
        userId,
        title,
        description,
        categories,
        mediaFiles: mediaFiles || null,
        tags,
        projectLinks,
      };

      await db.insert(projectTable).values(newProject);

      return res
        .status(200)
        .json(
          new ApiResponse(200, { newProject }, "Project created successfully.")
        );
    } catch (error) {
      console.error("Error during project creation:", error);
      res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const projectId = req.params.projectId;
      const userId = req.user?.id;
      if (!userId) {
        return res
          .status(401)
          .json(new ApiResponse(401, {}, "Unauthorized request"));
      }

      const { title, description, categories, mediaFiles, tags, projectLinks } =
        req.body;

      if (
        [title, description].some(
          (field) => typeof field !== "string" || field.trim() === ""
        ) ||
        !Array.isArray(categories) ||
        categories.length === 0 ||
        !Array.isArray(tags) ||
        tags.length === 0 ||
        typeof projectLinks !== "object" ||
        Object.keys(projectLinks).length === 0
      ) {
        return res
          .status(400)
          .json(new ApiResponse(400, {}, "All fields are required"));
      }
      const result = await db
        .update(projectTable)
        .set({
          title,
          description,
          categories,
          mediaFiles: mediaFiles || null,
          tags,
          projectLinks,
        })
        .where(
          and(
            eq(projectTable.projectId, projectId),
            eq(projectTable.userId, userId)
          )
        );
      if (result.rowCount === 0) {
        return res
          .status(404)
          .json(
            new ApiResponse(404, {}, "Project not found or not authorized")
          );
      }
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Project updated successfully."));
    } catch (error) {
      console.error("Error during project update:", error);
      res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const projectId = req.params.projectId;
      const userId = req.user?.id;
      if (!userId) {
        return res
          .status(401)
          .json(new ApiResponse(401, {}, "Unauthorized request"));
      }
      const result = await db
        .select()
        .from(projectTable)
        .where(eq(projectTable.projectId, projectId));

      if (result.length === 0) {
        return res
          .status(404)
          .json(new ApiResponse(404, {}, "Project not found"));
      }
      if (result[0].userId !== userId) {
        return res
          .status(403)
          .json(new ApiResponse(403, {}, "Unauthorized request"));
      }

      await db
        .delete(projectTable)
        .where(
          and(
            eq(projectTable.projectId, projectId),
            eq(projectTable.userId, userId)
          )
        );
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Project deleted successfully."));
    } catch (error) {
      console.error("Error during project deletion:", error);
      res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
  }
);

export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const projectId = req.params.projectId;

      const project = await db
        .select()
        .from(projectTable)
        .where(eq(projectTable.projectId, projectId));

      if (!project || project.length === 0) {
        return res
          .status(404)
          .json(new ApiResponse(404, {}, "Project not found"));
      }

      return res
        .status(200)
        .json(
          new ApiResponse(200, { project }, "Project retrieved successfully.")
        );
    } catch (error) {
      console.error("Error during project retrieval:", error);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
    }
  }
);

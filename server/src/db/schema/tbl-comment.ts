// tbl-project-comment.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { projectTable } from "./tbl-project";
import { userTable } from "./tbl-user";

export const projectCommentTable = pgTable("tbl_project_comment", {
  commentId: text("comment_id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projectTable.projectId, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.userId, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

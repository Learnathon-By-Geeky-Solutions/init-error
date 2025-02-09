// tbl-project-like.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { projectTable } from "./tbl-project";
import { userTable } from "./tbl-user";

export const projectLikeTable = pgTable("tbl_project_like", {
  likeId: text("like_id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projectTable.projectId, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.userId, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

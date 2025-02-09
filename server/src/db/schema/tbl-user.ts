import { relations, sql } from "drizzle-orm";
import { pgTable, serial, text, varchar, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { projectTable } from "./tbl-project";
import { projectLikeTable } from "./tbl-like";
import { projectCommentTable } from "./tbl-comment";
import { favouriteProjectTable } from "./tbl-favourite";

export const userTable = pgTable("tbl_user", {
  userId: text("user_id").notNull().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  bio: text("bio"),
  password: text("password").notNull(), // Text type for the password field
  avatar: text("avatar"), // Optional avatar field
  socialLinks: json("social_links"), // JSON data type for social links
  verifyCode: text("verify_code").notNull(),
  verifyCodeExpiry: timestamp("verify_code_expiry").notNull(),
  isVerified: boolean("is_verified").default(false), // Boolean type for verification status
  createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at')
          .default(sql`current_timestamp`)
          .$onUpdate(() => new Date()),
});

export const userRelations = relations(userTable, ({ many }) => ({
    projects: many(projectTable),
    projectLikes: many(projectLikeTable),
    projectComments: many(projectCommentTable),
    favouriteProjects: many(favouriteProjectTable),
  }));
  
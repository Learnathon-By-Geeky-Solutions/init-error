import { relations, sql } from "drizzle-orm";
import {
    pgTable,
    serial,
    text,
    varchar,
    json,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core";
import { userTable } from "./tbl-user";
import { projectLikeTable } from "./tbl-like";
import { projectCommentTable } from "./tbl-comment";
import { favouriteProjectTable } from "./tbl-favourite";

export const projectTable = pgTable("tbl_project", {
    projectId: text("project_id").primaryKey(), // Auto-incrementing primary key
    userId: text("user_id")
        .notNull()
        .references(() => userTable.userId, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(), // Project title
    description: text("description").notNull(), // Detailed project description
    categories: json("categories").notNull(), // Array of categories
    mediaFiles: json("media_files"), // Array of media file URLs
    tags: json("tags"), // Array of tags
    projectLinks: json("project_links"), // Links like GitHub, live demo
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .default(sql`current_timestamp`)
        .$onUpdate(() => new Date()),
});

export const projectRelations = relations(projectTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [projectTable.userId],
        references: [userTable.userId],
    }),
    likes: many(projectLikeTable),
    comments: many(projectCommentTable),
    favourites: many(favouriteProjectTable),
}));

// Project Like Relations
export const projectLikeRelations = relations(projectLikeTable, ({ one }) => ({
    user: one(userTable, {
        fields: [projectLikeTable.userId],
        references: [userTable.userId],
    }),
    project: one(projectTable, {
        fields: [projectLikeTable.projectId],
        references: [projectTable.projectId],
    }),
}));

// Project Comment Relations
export const projectCommentRelations = relations(
    projectCommentTable,
    ({ one }) => ({
        user: one(userTable, {
            fields: [projectCommentTable.userId],
            references: [userTable.userId],
        }),
        project: one(projectTable, {
            fields: [projectCommentTable.projectId],
            references: [projectTable.projectId],
        }),
    })
);

// Favourite Project Relations
export const favouriteProjectRelations = relations(
    favouriteProjectTable,
    ({ one }) => ({
        user: one(userTable, {
            fields: [favouriteProjectTable.userId],
            references: [userTable.userId],
        }),
        project: one(projectTable, {
            fields: [favouriteProjectTable.projectId],
            references: [projectTable.projectId],
        }),
    })
);

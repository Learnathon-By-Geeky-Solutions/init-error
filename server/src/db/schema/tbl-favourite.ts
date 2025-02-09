// tbl-project-favourite.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./tbl-user";
import { projectTable } from "./tbl-project";
import { sql } from "drizzle-orm";

export const favouriteProjectTable = pgTable("tbl_project_favourite", {
  favouriteId: text("favourite_id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.userId, { onDelete: "cascade" }),
  projectId: text("project_id")
    .notNull()
    .references(() => projectTable.projectId, { onDelete: "cascade" }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`current_timestamp`)
        .$onUpdate(() => new Date()),

});

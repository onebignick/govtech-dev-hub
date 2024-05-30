// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  pgEnum,
  serial,
  timestamp,
  varchar,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `govtech-dev-hub_${name}`);

export const userTypeEnum = pgEnum("userType", ["user", "admin", "superadmin"]);

export const users = createTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }).unique(),
    name: varchar("name", { length: 256 }),
    type: userTypeEnum("userType"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
    emailIndex: index("email_idx").on(example.email),
  }),
);

export const userProductRelations = relations(users, ({ many }) => ({
  products: many(products),
}));

export const apiUser = createInsertSchema(users, {});

export const apiCreateUser = apiUser.omit({ id: true });

export const products = createTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    summary: text("summary"),
    content: text("content"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    owner: integer("owner").references(() => users.id),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const productAdminRelations = relations(products, ({ one, many }) => ({
  owner: one(users, {
    fields: [products.owner],
    references: [users.id],
  }),
  admins: many(users),
}));

export const blogPosts = createTable(
  "blogPosts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }),
    content: text("content"),
    author: integer("author").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
    authorIndex: index("author_idx").on(example.author),
  }),
);

export const blogUserRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.author],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;

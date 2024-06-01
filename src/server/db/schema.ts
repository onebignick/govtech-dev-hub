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
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `govtech-dev-hub_${name}`);

export const userTypeEnum = pgEnum("userType", ["user", "admin", "superadmin"]);
export const productTypeEnum = pgEnum("productType", [
  "product",
  "agencyproject",
  "innersource",
]);
const quarters = [
  "2023 Q1",
  "2023 Q2",
  "2023 Q3",
  "2023 Q4",
  "2024 Q1",
  "2024 Q2",
  "2024 Q3",
  "2024 Q4",
  "2025 Q1",
  "2025 Q2",
  "2025 Q3",
  "2025 Q4",
] as const;
export type Quarter = (typeof quarters)[number];

export const quarterEnum = pgEnum("quarters", quarters);

export const users = createTable(
  "user",
  {
    id: serial("id").notNull().primaryKey(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    name: varchar("name", { length: 256 }).notNull(),
    type: userTypeEnum("userType").default("user").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("user_name_idx").on(example.name),
    emailIndex: index("user_email_idx").on(example.email),
  }),
);

export const userProductRelations = relations(users, ({ many }) => ({
  products: many(products),
}));

export const apiUser = createInsertSchema(users, {});

export const apiCreateUser = apiUser.omit({
  id: true,
  type: true,
  createdAt: true,
  updatedAt: true,
});

const highlight = z.object({
  quarter: z.string(),
  points: z.string().array(),
});

export const products = createTable(
  "products",
  {
    id: text("id").unique().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    summary: text("summary").notNull(),
    keyfeatures: json("keyfeatures")
      .$type<{ title: string; description: string }[]>()
      .default([]),
    highlights: json("highlights")
      .$type<z.infer<typeof highlight>[]>()
      .default([]),
    links: json("links").$type<{ title: string; url: string }[]>().default([]),
    type: productTypeEnum("productType").default("product").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    admins: text("admins").notNull(),
  },
  (example) => ({
    nameIndex: index("product_name_idx").on(example.name),
  }),
);

export const apiProduct = createInsertSchema(products, {});

export const apiCreateProduct = apiProduct.omit({
  createdAt: true,
  updatedAt: true,
});

export type apiCreateProductType = z.infer<typeof apiCreateProduct>;

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
    titleIndex: index("blog_post_title_idx").on(example.title),
    authorIndex: index("blog_post_author_idx").on(example.author),
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

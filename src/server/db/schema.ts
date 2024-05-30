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
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

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

export type User = typeof users.$inferSelect;

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
    admin: integer("admin")
      .references(() => users.id)
      .array(),
    organizationUnits: integer("organizationUnits")
      .references(() => organizationUnits.id)
      .array(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const organizationUnits = createTable(
  "organizationUnits",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    parent: integer("parent").references(
      (): AnyPgColumn => organizationUnits.id,
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const organizationUnitRelations = relations(
  organizationUnits,
  ({ one }) => ({
    underlying: one(organizationUnits, {
      fields: [organizationUnits.parent],
      references: [organizationUnits.id],
    }),
  }),
);

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

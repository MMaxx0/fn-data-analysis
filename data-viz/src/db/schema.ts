import { integer, pgTable, varchar, date, real } from "drizzle-orm/pg-core";

// "bunx drizzle-kit push" to apply migrations
// "bunx drizzle-kit generate" to generate migration files and then "bunx drizzle-kit migrate" to apply them

export const incidents = pgTable("incidents", {
  report_id: varchar().primaryKey(),
  category: varchar(),
  date: date(),
});

export const details = pgTable("details", {
  report_id: varchar().primaryKey(),
  subject: varchar(),
  transport_mode: varchar(),
  detection: varchar(),
});

export const outcomes = pgTable("outcomes", {
  report_id: varchar().primaryKey(),
  outcome: varchar(),
  num_ppl_fined: integer(),
  fine: real(),
  num_ppl_arrested: integer(),
  prison_time: real(),
  prison_time_unit: varchar(),
});

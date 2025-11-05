import { db } from "./db/db.ts";
import { parse } from "csv-parse/sync";
import { readFileSync, readdirSync } from "node:fs";
import { incidents, details, outcomes } from "./db/schema";

const dataDirectory = new URL("./data/", import.meta.url);

const files = readdirSync(dataDirectory);

for (const file of files) {
  const filePath = new URL(`${file}`, dataDirectory);

  const content = readFileSync(filePath, { encoding: "utf-8" });

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
  });

  if (file === "incidents.csv") {
    const result = await db
      .insert(incidents)
      .values(records as unknown as typeof incidents.$inferInsert);
    console.log(`Inserted ${result.rowCount} rows into incidents table.`);
  } else if (file === "details.csv") {
    const result = await db
      .insert(details)
      .values(records as unknown as typeof details.$inferInsert);
    console.log(`Inserted ${result.rowCount} rows into details table.`);
  } else if (file === "outcomes.csv") {
    const result = await db
      .insert(outcomes)
      .values(
        records.slice(0, 9000) as unknown as typeof outcomes.$inferInsert
      );
    console.log(`Inserted ${result.rowCount} rows into outcomes table.`);
    const additionalResult = await db
      .insert(outcomes)
      .values(records.slice(9000) as unknown as typeof outcomes.$inferInsert);
    console.log(
      `Inserted additional ${additionalResult.rowCount} rows into outcomes table.`
    );
  }
}

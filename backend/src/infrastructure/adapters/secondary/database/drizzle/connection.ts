import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/portfolio_bautzen";

// Client Postgres
export const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  onnotice: () => {},
});

// Instance Drizzle avec typage de schéma
export const db = drizzle(client, { schema });


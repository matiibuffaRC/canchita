import { Pool } from "pg";

export const db = new Pool({
    host: "localhost",
    port: 5432,
    database: "canchita_desarrollo",
    user: "postgres",
    password: "rosario",
});
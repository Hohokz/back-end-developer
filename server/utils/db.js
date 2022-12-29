import * as pg from "pg";

const { Pool } = pg.default;

const pool = new Pool({
    connectionString: "postgresql://postgres:admin@localhost:5432/washing_machine",
});

export { pool };
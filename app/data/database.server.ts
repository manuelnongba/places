//.server file tells remix that the code in this file should only be executed in the backend and the code doesn't appear in the front-end
const { Pool } = require('pg');

require('dotenv').config();

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: '',
});

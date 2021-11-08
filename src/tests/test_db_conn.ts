import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()
const {
  TEST_HOST,
  TEST_DB,
  TEST_USERNAME,
  TEST_PASSWORD,
  TEST_PORT
} = process.env

const db_client = new Pool({
  host: TEST_HOST,
  database: TEST_DB,
  user: TEST_USERNAME,
  password: TEST_PASSWORD,
  port: TEST_PORT ? parseInt(TEST_PORT) : 3000
});

export default db_client;

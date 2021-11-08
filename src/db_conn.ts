import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()
const {
  NODE_ENV,
  DEV_HOST,
  DEV_DB,
  DEV_USERNAME,
  DEV_PASSWORD,
  DEV_PORT,
  TEST_HOST,
  TEST_DB,
  TEST_USERNAME,
  TEST_PASSWORD,
  TEST_PORT
} = process.env

const db_client = new Pool({
  host: NODE_ENV === 'test' ? TEST_HOST : DEV_HOST,
  database: NODE_ENV === 'test' ? TEST_DB : DEV_DB,
  user: NODE_ENV === 'test' ? TEST_USERNAME : DEV_USERNAME,
  password: NODE_ENV === 'test' ? TEST_PASSWORD : DEV_PASSWORD,
  port: NODE_ENV === 'test'
    ? TEST_PORT ? parseInt(TEST_PORT) : 3000
    : DEV_PORT ? parseInt(DEV_PORT) : 3000
});

export default db_client;

import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()
const {
    DEV_USERNAME,
    DEV_PASSWORD,
    DEV_PORT
} = process.env

const db_client = new Pool({
    host: 'localhost',
    database: 'storefront',
    user: DEV_USERNAME,
    password: DEV_PASSWORD,
    port: DEV_PORT ? parseInt(DEV_PORT) : 3000
});

export default db_client;

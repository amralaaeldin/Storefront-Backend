import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const ENV = process.env.ENV;

console.log(ENV)

let client: Pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

if (ENV === 'test') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}

export default client;

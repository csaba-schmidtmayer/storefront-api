import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db_client from '../db_conn';

type User = {
  id: string,
  firstName: string,
  lastName: string
  password?: string;
}

const index = async (): Promise<User[]> => {
  const sql = `SELECT id, first_name, last_name FROM users;`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name
    }));
  }
  catch (err) {
    throw new Error(`Could not get users. Error: ${err}`);
  }
};

const show = async (id: string): Promise<User> => {
  const sql = `SELECT id, first_name, last_name FROM users WHERE id = '${id}';`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name
    }))[0];
  }
  catch (err) {
    throw new Error(`Could not get users. Error: ${err}`);
  }
};

const create = async(user: User): Promise<User> => {
  const { id, firstName, lastName, password} = user;
  if (id === undefined || firstName === undefined || lastName === undefined || password === undefined) {
    throw new Error('All attributes must be provided in a user object.');
  }

  const hash = await bcrypt.hash(user.password as string + process.env.PWD_HASH_SECRET, parseInt(process.env.SALT_ROUNDS as string))
  const sql = `INSERT INTO users VALUES ('${id}', '${firstName}', '${lastName}', '${hash}') RETURNING id, first_name, last_name;`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name
    }))[0];
  }
  catch (err) {
    throw new Error(`Could not get users. Error: ${err}`);
  }
}

const login = async (id: string, password: string): Promise<string> => {
  const sql = `SELECT password_hash FROM users WHERE id = '${id}';`;
  let hash;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);
    hash = result.rows[0].password_hash;

    conn.release();
  }
  catch (err) {
    throw new Error(`Could not get users. Error: ${err}`);
  }

  if (await bcrypt.compare(password + process.env.PWD_HASH_SECRET, hash)) {
    const token = jwt.sign({user: id}, process.env.JWT_SECRET as string);
    return token;
  }
  else {
    return `Password does not match for user ${id}.`;
  }
};

export {
  User,
  index,
  show,
  create,
  login
};

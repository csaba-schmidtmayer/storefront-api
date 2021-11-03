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
  const sql = `INSERT INTO users VALUES ('${user.id}', '${user.firstName}', '${user.lastName}', '${user.password}') RETURNING id, first_name, last_name;`;

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

export {
  User,
  index,
  show,
  create
};

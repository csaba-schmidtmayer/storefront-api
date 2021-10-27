import db_client from '../db_conn';

type Category = {
  id: number,
  name: string
}

const index = async (): Promise<Category[]> => {
  const sql = `SELECT * FROM categories;`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows;
  }
  catch (err) {
    throw new Error(`Could not get categories. Error: ${err}`);
  }
};

const show = async (id: string): Promise<Category> => {
  const sql = `SELECT * FROM categories WHERE id = ${id};`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows[0];
  }
  catch (err) {
    throw new Error(`Could not get categories. Error: ${err}`);
  }
};

const create = async (name: string): Promise<Category> => {
  const name_norm = name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
  const sql = `INSERT INTO categories ${name_norm}`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows[0];
  }
  catch (err) {
    throw new Error(`Could not get categories. Error: ${err}`);
  }
}

export {
  Category,
  index,
  show,
  create
};

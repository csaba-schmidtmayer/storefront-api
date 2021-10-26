import db_client from '../db_conn';

type Category = {
  id: number,
  name: string
}

const index = async (): Promise<Category[]> => {
  const sql = 'SELECT * FROM categories';

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

export {
  Category,
  index
};

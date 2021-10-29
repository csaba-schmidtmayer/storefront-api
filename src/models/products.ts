import db_client from '../db_conn';
import { Category } from './categories';

type Product = {
  id: number,
  name: string,
  price: number,
  category: Category
}

const index = async (): Promise<Product[]> => {
  const sql = `SELECT products.*, categories.name AS "category_name" FROM products INNER JOIN categories ON products.category_id = categories.id;`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: row.price,
      category: {
        id: row.category_id,
        name: row.category_name
      }
    }));
  }
  catch (err) {
    throw new Error(`Could not get products. Error: ${err}`);
  }
};

const show = async (id: string): Promise<Product> => {
  const sql = `SELECT products.*, categories.name AS "category_name" FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.id = ${id};`;
  console.log(id);

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: row.price,
      category: {
        id: row.category_id,
        name: row.category_name
      }
    }))[0];
  }
  catch (err) {
    throw new Error(`Could not get products. Error: ${err}`);
  }
};

const create = async (name: string, price: number, category: number): Promise<Category> => {
  const nameNorm = name.toLowerCase();
  const sql = `INSERT INTO products (name, price, category_id) VALUES ('${nameNorm}', ${price}, ${category}) RETURNING id;`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return await show(result.rows[0].id);
  }
  catch (err) {
    throw new Error(`Could not get categories. Error: ${err}`);
  }
};

const categoryIndex = async (category: number): Promise<Product[]> => {
  const sql = `SELECT products.*, categories.name AS "category_name" FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.category_id = ${category};`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: row.price,
      category: {
        id: row.category_id,
        name: row.category_name
      }
    }));
  }
  catch (err) {
    throw new Error(`Could not get products. Error: ${err}`);
  }
};

export {
  Product,
  index,
  show,
  create,
  categoryIndex
}

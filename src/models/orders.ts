import { QueryResult } from 'pg';

import db_client from '../db_conn';
import { Product } from './products';

type Order = {
  id: number,
  userId: string,
  status: string,
  products: {
    product: Product,
    quantity: number
  }[],
  basketValue: number
};

const _parseOrders = (userId: string, isActive: boolean, result: QueryResult<any>): Order[] => {
  type OrderDict = {
    [key: string]: Order
  };
  const orderDict: OrderDict = {};

  result.rows.forEach((row) => {
    const { order_id: orderId, id: productId, name: productName, price, category_id: categoryId, category_name: categoryName, quantity } = row;
    if (orderDict[orderId] === undefined) {
      orderDict[orderId] = {
        id: orderId,
        userId: userId,
        status: isActive ? 'active' : 'completed',
        products: [],
        basketValue: 0
      }
    }

    const product: Product = {
      id: productId,
      name: productName,
      price: price,
      category: {
        id: categoryId,
        name: categoryName
      }
    };

    orderDict[orderId].products.push({product: product, quantity: quantity});
    orderDict[orderId].basketValue += product.price * quantity;
  });

  return Object.keys(orderDict).map((key) => (orderDict[key]));
};

const showActive = async (userId: string): Promise<Order[]> => {
  const sql = `SELECT orders.id AS order_id, products.*, categories.name AS category_name, order_items.quantity FROM orders ` +
    `INNER JOIN order_items ON orders.id = order_items.order_id ` +
    `INNER JOIN products ON order_items.product_id = products.id ` +
    `INNER JOIN categories ON products.category_id = categories.id `+
    `WHERE orders.user_id = '${userId}' AND orders.is_active = true;`;

  try {
    const conn = await db_client.connect();
    const result = await conn.query(sql);

    conn.release();

    return _parseOrders(userId, true, result);
  }
  catch (err) {
    throw new Error(`Could not get orders. Error: ${err}`);
  }
};

export {
  Order,
  showActive
};

import db_client from '../db_conn';
import { User, index as userIndex, show as showUser, create as createUser, login } from '../models/users';
import { index as categoryIndex, show as showCategory, create as createCategory } from '../models/categories';
import { Product, index as productIndex, show as showProduct, create as createProduct, categoryIndex as productsByCategory, showPopular } from '../models/products';
import { Order, showActive, showCompleted, create as createOrder } from '../models/orders';

describe('Database and endpoint tests', () => {
  const userId = 'emmet_lego';
  const categoryName = 'City';
  let categoryId: number, productId: number;
  let token: string;

  beforeAll(async () => {
    // Clear database
    const sql = 'DELETE FROM order_items *; ' +
      'DELETE FROM orders *; '+
      'DELETE FROM users *; ' +
      'DELETE FROM products *; ' +
      'DELETE FROM categories *;'
    try {
      const conn = await db_client.connect();
      await conn.query(sql);
      conn.release();
    }
    catch (err) {
      throw new Error(`Could not clear database. Error: ${err}`);
    }
  });

  describe('Model tests', () => {

    describe('User model tests', () => {
      const password = 'Everything1sAwsome';
      const expectedUser: User = {
        id: userId,
        firstName: 'Emmet',
        lastName: 'Brickowski'
      };

      it('Creates new user', async () => {
        const newUser: User = {
          id: userId,
          firstName: 'Emmet',
          lastName: 'Brickowski',
          password: password
        };
        const result = await createUser(newUser);
        expect(result).toEqual(expectedUser);
      });

      it('Shows all available users', async () => {
        const result = await userIndex();
        expect(result.length).toEqual(1);
      });

      it('Shows a specific user', async () => {
        const result = await showUser(userId);
        expect(result).toEqual(expectedUser);
      });

      it('Performs a login', async () => {
        token = await login(userId, password);
        expect(token.length).toBeGreaterThan(0);
      });
    });

    describe('Category model tests', () => {

      it('Creates new category', async () => {
        const result = await createCategory(categoryName);
        categoryId = result.id;
        expect(result.name).toEqual(categoryName);
      });

      it('Shows all available categories', async () => {
        const result = await categoryIndex();
        expect(result.length).toEqual(1);
      });

      it('Shows a specific category', async () => {
        const result = await showCategory(categoryId.toString());
        expect(result.name).toEqual(categoryName);
      });
    });

    describe('Product model tests', () => {
      const name = 'Deep Space Rocket and Launch Control';
      const price = 9999;

      it('Creates a new product', async () => {
        const result = await createProduct(name, price, categoryId);
        productId = result.id;
        expect(result.name).toEqual(name);
        expect(result.price).toEqual(price);
        expect(result.category.name).toEqual(categoryName);
      });

      it('Shows all available products', async () => {
        const result = await productIndex();
        expect(result.length).toEqual(1);
      });

      it('Shows a specific product', async () => {
        const result = await showProduct(productId.toString());
        expect(result.name).toEqual(name);
        expect(result.price).toEqual(price);
        expect(result.category.name).toEqual(categoryName);
      });

      it('Shows all products by category', async () => {
        const result = await productsByCategory(categoryId);
        expect(result.length).toEqual(1);
      });
    });

    describe('Order model tests', () => {

      it('Creates a new order', async () => {
        const result = await createOrder(userId, [{productId: productId, quantity: 2}]);
        expect(result.basketValue).toEqual(19998);
        expect(result.products[0].product.category.name).toEqual(categoryName);
        expect(result.status).toEqual('active');
      });

      it('Shows completed orders', async () => {
        const result = await showCompleted(userId);
        expect(result.length).toEqual(0);
      });

      it('Shows active orders', async () => {
        const result = await showActive(userId);
        expect(result.length).toEqual(1);
      });

      // showPopular() belongs to the product model, but needs order information for its logic
      it('Shows most popular products', async () => {
        const result = await showPopular(undefined);
        expect(result.length).toBeLessThanOrEqual(5);
      });
    });
  });
});

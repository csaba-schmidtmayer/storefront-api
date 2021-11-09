import db_client from '../db_conn';
import { User, index as userIndex, show as showUser, create as createUser, login } from '../models/users';
import { Category, index as categoryIndex, show as showCategory, create as createCategory } from '../models/categories';

describe('Database and endpoint tests', () => {
  const userId = 'emmet_lego';
  let categoryId: number;

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
          password: 'Everything1sAwsome'
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
    });

    describe('Category model tests', () => {
      const name = 'City';

      it('Creates new category', async () => {
        const result = await createCategory(name);
        categoryId = result.id;
        expect(result.name).toEqual(name);
      });

      it('Shows all available categories', async () => {
        const result = await categoryIndex();
        expect(result.length).toEqual(1);
      });

      it('Shows a specific category', async () => {
        const result = await showCategory(categoryId.toString());
        expect(result.name).toEqual(name);
      });
    });
  });
});

import db_client from '../db_conn';
import { User, index as userIndex, show as showUser, create as createUser, login } from '../models/users';

describe('Database and endpoint tests', () => {
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
      const id = 'emmet_lego';
      const expectedUser: User = {
        id: id,
        firstName: 'Emmet',
        lastName: 'Brickowski'
      };

      it('Creates new user', async () => {
        const newUser: User = {
          id: id,
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
        const result = await showUser(id);
        expect(result).toEqual(expectedUser);
      });
    });
  });
});

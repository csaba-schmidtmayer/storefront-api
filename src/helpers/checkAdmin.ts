import dotenv from 'dotenv';

import { show, create } from '../models/users';

dotenv.config();
const {
  ADMIN_ID,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
  ADMIN_PASSWORD
} = process.env;

const checkAdmin = async (): Promise<void> => {
  const admin = await show('admin');
  if (admin === undefined) {
    await create({
      id: ADMIN_ID as string,
      firstName: ADMIN_FIRST_NAME as string,
      lastName: ADMIN_LAST_NAME as string,
      password: ADMIN_PASSWORD as string
    });
  }
}

export default checkAdmin;

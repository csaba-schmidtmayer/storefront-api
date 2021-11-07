import { Router, Request, Response } from 'express';

import { index, show, create, login } from '../models/users';
import orders from './orders';
import authenticate from '../middleware/authentication';

const router = Router();

router.use('/:id/orders', orders);

router.get('/', authenticate, async (_req: Request, res: Response): Promise<void> => {
  const users = await index();
  res.send(users);
});

router.get('/:id', authenticate, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await show(id);
  res.send(user);
});

router.post('/', authenticate, async (req: Request, res: Response): Promise<void> => {
  const user = req.body;

  if (user === undefined) {
    res.send('A user object must be provided.');
  }
  else {
    const newUser = await create(user);
    res.send(newUser);
  }
});

router.post('/:id', async(req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { password } = req.body;

  if (password === undefined) {
    res.send('Password must be supplied in the body.');
  }
  else {
    const token = await login(id, password);
    res.send(token);
  }
});

export default router;

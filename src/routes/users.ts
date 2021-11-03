import { Router, Request, Response } from 'express';

import { index, show, create } from '../models/users';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const users = await index();
  res.send(users);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await show(id);
  res.send(user);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const user = req.body;

  if (user === undefined) {
    res.send('A user object must be provided.');
  }
  else {
    const newUser = await create(user);
    res.send(newUser);
  }
})

export default router;

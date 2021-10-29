import { Router, Request, Response } from 'express';

import { index, show } from '../models/users';

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

export default router;

import { Router, Request, Response } from 'express';

import { index } from '../models/users';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const users = await index();
  res.send(users);
});

export default router;

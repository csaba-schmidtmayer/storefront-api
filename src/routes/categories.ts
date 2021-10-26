import { Router, Request, Response } from 'express';

import { index } from '../models/categories';

const router = Router();

router.get('/', async (_req:Request, res: Response): Promise<void> => {
  const categories = await index();
  res.send(categories);
});

export default router;

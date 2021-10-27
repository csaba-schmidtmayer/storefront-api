import { Router, Request, Response } from 'express';

import { index, show, create } from '../models/categories';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const categories = await index();
  res.send(categories);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const category = await show(req.params.id);
  res.send(category);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (name === undefined) {
    res.send('Attribute \'name\' must be supplied in the body.');
  }
  else {
    const newCategory = await create(name);
    res.send(newCategory);
  }
});

export default router;

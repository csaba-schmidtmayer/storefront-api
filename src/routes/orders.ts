import { Router, Request, Response } from 'express';

import { showActive, showCompleted } from '../models/orders';

const router = Router({mergeParams: true});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const { status } = req.query;
  console.log(status);
  const orders = status === 'completed'
    ? await showCompleted(userId)
    : await showActive(userId);
  res.send(orders);
});

export default router;

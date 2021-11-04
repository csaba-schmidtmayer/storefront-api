import { Router, Request, Response } from 'express';

import { showActive, showCompleted, create } from '../models/orders';

const router = Router({mergeParams: true});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const { status } = req.query;
  const orders = status === 'completed'
    ? await showCompleted(userId)
    : await showActive(userId);
  res.send(orders);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const orderItems = req.body;
  const newOrder = await create(userId, orderItems);
  res.send(newOrder);
});

export default router;

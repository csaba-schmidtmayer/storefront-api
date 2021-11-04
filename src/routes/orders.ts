import { Router, Request, Response } from 'express';

import { showActive } from '../models/orders';

const router = Router({mergeParams: true});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const activeOrders = await showActive(userId);
  res.send(activeOrders);
});

export default router;

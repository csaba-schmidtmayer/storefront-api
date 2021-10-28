import { Router, Request, Response } from 'express';
import { index } from '../models/products';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const products = await index();
  res.send(products);
});

export default router;

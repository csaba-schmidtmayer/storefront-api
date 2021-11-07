import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization: authorizationHeader } = req.headers;

  if (authorizationHeader === undefined) {
    res.status(401);
    throw new Error('The requested resource requires an authentication header.');
  }
  const token = authorizationHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  }
  catch (err) {
    res.status(401);
    throw new Error('Invalid token.');
  }
  next();
};

export default authenticate;

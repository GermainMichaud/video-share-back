import { NextFunction, Request, Response } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { provider, access_token, open_id } = req.session;

  if (!provider || !access_token || !open_id) {
    return res.status(401).send('Unauthorized');
  }

  next();
};

export default auth;

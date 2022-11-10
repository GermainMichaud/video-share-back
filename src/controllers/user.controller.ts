import { Request, Response } from 'express';

import { getUserInfo } from '../services/user.service';
import { ProvidersName } from '../utils/providers';

export const currentUserHandler = async (req: Request, res: Response) => {
  const { provider, access_token } = req.session;

  const userInfos = await getUserInfo(provider as ProvidersName, access_token as string);

  res.status(200).send(userInfos);
};

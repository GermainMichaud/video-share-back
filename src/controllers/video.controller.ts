import { Request, Response } from 'express';

import { VideoRequest } from '../schemas/video.schema';
import { upload } from '../services/video.service';
import { ProvidersName } from '../utils/providers';

export const uploadVideoHandler = async (
  req: Request<Record<string, never>, Record<string, never>, VideoRequest['body']>,
  res: Response,
) => {
  const { video } = req.body;
  const { provider, access_token, open_id } = req.session;

  const uploadedVideo = await upload(
    provider as ProvidersName,
    access_token as string,
    open_id as string,
    video as File,
  );

  res.status(200).send(uploadedVideo);
};

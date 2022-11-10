import { Request, Response } from 'express';
import { getUserInfo } from 'services/user.service';

import { OauthCallbackRequest, OauthRequest } from '../schemas/oauth.schema';
import {
  getAccessToken,
  getRedirectUrl,
  getRefreshToken,
  revokeToken,
} from '../services/oauth.service';
import { ProvidersName } from '../utils/providers';
import { getCsrf } from '../utils/utils';

export const connectOauthHandler = (
  req: Request<
    OauthRequest['params'],
    Record<string, never>,
    Record<string, never>,
    { redirect_client_url: string }
  >,
  res: Response,
): void => {
  const { redirect_client_url } = req.query;
  const csrfState = getCsrf();
  res.cookie('csrfState', csrfState, { maxAge: 60000 });
  req.session.redirect_client_url = redirect_client_url;

  res.send(getRedirectUrl(req.params.provider, csrfState));
};

export const callbackOauthHandler = async (
  req: Request<
    OauthRequest['params'],
    Record<string, never>,
    Record<string, never>,
    OauthCallbackRequest['query']
  >,
  res: Response,
): Promise<void> => {
  const { code, state } = req.query;
  const { provider } = req.params;
  const { csrfState } = req.cookies;

  if (state !== csrfState) {
    res.status(400).send('Invalid state');
    return;
  }

  const access = await getAccessToken(provider, code);
  if (!access.message) {
    req.session.access_token = access.access_token;
    req.session.provider = provider;
    req.session.open_id = access.open_id;
    req.session.expires_in = access.expires_in;
    req.session.refresh_token = access.refresh_token;
    req.session.refresh_expires_in = access.refresh_expires_in;
  }
  res.redirect(req.session.redirect_client_url as string);
};

export const refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
  const { provider, refresh_token } = req.session;
  const { access_token, expires_in } = await getRefreshToken(
    provider as ProvidersName,
    refresh_token as string,
  );
  req.session.access_token = access_token;
  req.session.expires_in = expires_in;
  res.status(200).json({ status: 'ok' });
};

export const disconnectOauthHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { provider, open_id, access_token } = req.session;
  await revokeToken(provider as ProvidersName, open_id as string, access_token as string);
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).send('ok');
  });
};

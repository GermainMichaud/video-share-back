import { Request } from 'express';
import { describe, expect, it, vi } from 'vitest';

import * as oauthService from '../services/oauth.service';
import {
  callbackOauthHandler,
  connectOauthHandler,
  disconnectOauthHandler,
  refreshTokenHandler,
} from './oauth.controller';

vi.mock('../utils/utils', async () => {
  const utils = await vi.importActual('../utils/utils');
  return {
    ...utils,
    getCsrf: () => 'csrf_state',
  };
});
vi.mock('../utils/providers');

const mockRequest = {
  session: {
    provider: 'tiktok',
    access_token: 'access_token',
    open_id: 'open_id',
  },
} as Request;

const mockResponse = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
  cookie: vi.fn().mockReturnThis(),
  redirect: vi.fn().mockReturnThis(),
};

describe('OAuth Controller', () => {
  it('should connect oauth', async () => {
    const spyGetOauthUrl = vi.spyOn(oauthService, 'getRedirectUrl');
    const mockedRequest = { ...mockRequest, params: { provider: 'tiktok' } };
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await connectOauthHandler(mockedRequest, mockResponse);
    expect(spyGetOauthUrl).toHaveBeenCalledWith('tiktok', 'csrf_state');
  });

  it('should disconnect oauth', async () => {
    mockRequest.session.destroy = vi.fn();
    const spyDisconnect = vi.spyOn(oauthService, 'revokeToken');
    await disconnectOauthHandler(mockRequest, mockResponse);
    expect(spyDisconnect).toHaveBeenCalledWith('tiktok', 'open_id', 'access_token');
  });

  it('should refresh token', async () => {
    const spyRefreshToken = vi.spyOn(oauthService, 'getRefreshToken');
    spyRefreshToken.mockResolvedValue({
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
    });
    const mockedRequest = {
      ...mockRequest,
      session: { ...mockRequest.session, refresh_token: 'refresh_token' },
    };
    await refreshTokenHandler(mockedRequest, mockResponse);
    expect(spyRefreshToken).toHaveBeenCalledWith('tiktok', 'refresh_token');
  });

  it('should callback oauth', async () => {
    const spyCallbackOauth = vi.spyOn(oauthService, 'getAccessToken');
    spyCallbackOauth.mockResolvedValue({
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
      provider: 'tiktok',
      open_id: 'open_id',
      expires_in: 0,
      refresh_expires_in: 0,
    });
    const mockedRequest = {
      ...mockRequest,
      params: { provider: 'tiktok' },
      query: { code: 'code', scopes: 'scopes', state: 'csrf_state' },
      cookies: { csrfState: 'csrf_state' },
    };
    await callbackOauthHandler(mockedRequest, mockResponse);
    expect(spyCallbackOauth).toHaveBeenCalledWith('tiktok', 'code');
  });
});

import { describe, expect, it, vi } from 'vitest';

import * as utils from '../utils/utils';
import {
  getAccessToken,
  getRedirectUrl,
  getRefreshToken,
  revokeToken,
} from './oauth.service';

vi.mock('../utils/utils');
vi.mock('../utils/providers');

describe('Oauth Service', () => {
  it('should get Access Token', async () => {
    const spyFetchData = vi.spyOn(utils, 'fetchData');
    spyFetchData.mockResolvedValueOnce({
      data: {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expires_in: 'expires_in',
        refresh_expires_in: 'refresh_expires_in',
        scope: 'scope',
        open_id: 'open_id',
      },
    });
    const result = await getAccessToken('tiktok', 'code');
    expect(result).toBe(undefined);
  });

  it('should get Refresh Token', async () => {
    const spyFetchData = vi.spyOn(utils, 'fetchData');
    spyFetchData.mockResolvedValueOnce({
      data: {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        expires_in: 'expires_in',
        refresh_expires_in: 'refresh_expires_in',
        scope: 'scope',
        open_id: 'open_id',
      },
    });
    const result = await getRefreshToken('tiktok', 'refresh_token');
    expect(result).toBe(undefined);
  });

  it('should get Redirect Url', () => {
    const result = getRedirectUrl('tiktok', 'csrf_state');
    expect(result).toEqual('https://www.tiktok.com/auth/authorize/?undefined');
  });

  it('should revoke Token', async () => {
    const result = await revokeToken('tiktok', 'open_id', 'access_token');
    expect(result).toBe(undefined);
  });
});

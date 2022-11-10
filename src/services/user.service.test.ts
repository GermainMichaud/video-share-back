import { describe, expect, it, vi } from 'vitest';

import { getUserInfo } from './user.service';

vi.mock('../utils/utils');
vi.mock('../utils/providers');

describe('User Service', () => {
  it('should get user info', async () => {
    const result = await getUserInfo('tiktok', 'access_token');
    expect(result).toBe(undefined);
  });
});

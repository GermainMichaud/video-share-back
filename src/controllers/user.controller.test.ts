import { Request } from 'express';
import { describe, expect, it, vi } from 'vitest';

import * as userService from '../services/user.service';
import { currentUserHandler } from './user.controller';

vi.mock('../utils/utils');
vi.mock('../utils/providers');

const mockRequest = {
  session: {
    provider: 'tiktok',
    access_token: 'access_token',
  },
} as Request;

const mockResponse = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn().mockReturnThis(),
};

describe('User Controller', () => {
  it('should get current user', async () => {
    const spyGetUserInfo = vi.spyOn(userService, 'getUserInfo');
    await currentUserHandler(mockRequest, mockResponse);
    expect(spyGetUserInfo).toHaveBeenCalledWith('tiktok', 'access_token');
  });
});

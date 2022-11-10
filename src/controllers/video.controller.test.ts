/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request } from 'express';
import { describe, expect, it, vi } from 'vitest';

import * as videoService from '../services/video.service';
import { uploadVideoHandler } from './video.controller';

vi.mock('../utils/utils');
vi.mock('../utils/providers');

const mockRequest = {
  body: {
    video: '',
  },
  session: {
    provider: 'tiktok',
    access_token: 'access_token',
    open_id: 'open_id',
  },
} as Request;

const mockResponse = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn().mockReturnThis(),
};

describe('Video Controller', () => {
  it('should upload video', async () => {
    const spyUpload = vi.spyOn(videoService, 'upload');
    await uploadVideoHandler(mockRequest, mockResponse);
    expect(spyUpload).toHaveBeenCalledWith('tiktok', 'access_token', 'open_id', '');
  });
});

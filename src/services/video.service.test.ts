import { describe, expect, it } from 'vitest';

import { upload } from './video.service';

// const file = new File([''], 'video.mp4');
// Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });

describe('Video Service', () => {
  it.skip('should upload video', async () => {
    const result = await upload(
      'tiktok',
      'access_token',
      'open_id',
      new File([], 'video.mp4'),
    );
    expect(result).toBe('video uploaded');
  });
});

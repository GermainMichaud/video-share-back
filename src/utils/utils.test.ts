import { describe, expect, it, vi } from 'vitest';

import { createQueryString, fetchData, getCsrf } from './utils';

describe('Utils', () => {
  it('should fetch data', async () => {
    const result = await fetchData('https://www.google.com');
    expect(result).toContain('<!doctype html>');
  });

  it('should create query string', () => {
    const result = createQueryString({
      a: '1',
      b: '2',
    });
    expect(result).toBe('a=1&b=2');
  });

  it('should get csrf', () => {
    const result = getCsrf();
    expect(result).toEqual(expect.any(String));
  });
});

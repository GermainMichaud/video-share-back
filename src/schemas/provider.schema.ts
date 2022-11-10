import { z } from 'zod';

const accessTokenResponse = z.object({
  tiktok: z.object({
    data: z.object({
      open_id: z.string(),
      scope: z.string(),
      access_token: z.string(),
      expires_in: z.number(),
      refresh_token: z.string(),
      refresh_expires_in: z.number(),
    }),
  }),
});

const accessTokenResponseError = z.object({
  tiktok: z.object({
    data: z.object({
      error_code: z.number(),
      captcha: z.string(),
      desc_url: z.string(),
      description: z.string(),
    }),
    message: z.string(),
  }),
});

const refreshTokenResponse = z.object({
  ...accessTokenResponse.shape,
});

const refreshTokenResponseError = z.object({
  ...accessTokenResponseError.shape,
});

const revokeTokenResponse = z.object({
  data: z.object({
    error_code: z.number(),
    description: z.string(),
  }),
});

type AccessTokenResponse = z.infer<typeof accessTokenResponse>;
type AccessTokenResponseError = z.infer<typeof accessTokenResponseError>;
type RefreshTokenResponse = z.infer<typeof refreshTokenResponse>;
type RefreshTokenResponseError = z.infer<typeof refreshTokenResponseError>;
type RevokeTokenResponse = z.infer<typeof revokeTokenResponse>;

export {
  AccessTokenResponse,
  accessTokenResponse,
  AccessTokenResponseError,
  accessTokenResponseError,
  RefreshTokenResponse,
  refreshTokenResponse,
  RefreshTokenResponseError,
  refreshTokenResponseError,
  RevokeTokenResponse,
};

import { TypeOf, z } from 'zod';

const oauthRequest = z.object({
  params: z.object({
    provider: z.enum(['tiktok'], {
      description: 'Oauth provider',
      required_error: 'Oauth provider is required',
      invalid_type_error: 'Oauth provider must be a string',
    }),
  }),
});

const oauthcallbackRequest = z.object({
  query: z.object({
    code: z.string({
      description: 'Oauth code',
      required_error: 'Oauth code is required',
      invalid_type_error: 'Oauth code must be a string',
    }),
    scopes: z.string({
      description: 'Oauth scopes',
      required_error: 'Oauth scopes is required',
      invalid_type_error: 'Oauth scopes must be a string',
    }),
    state: z.string({
      description: 'Oauth state',
      required_error: 'Oauth state is required',
      invalid_type_error: 'Oauth state must be a string',
    }),
  }),
});

type OauthRequest = TypeOf<typeof oauthRequest>;
type OauthCallbackRequest = TypeOf<typeof oauthcallbackRequest>;

export { OauthCallbackRequest, oauthcallbackRequest, OauthRequest, oauthRequest };

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AccessTokenResponse, AccessTokenResponseError } from '../interfaces';
import { createQueryString } from './utils';

const providers = {
  tiktok: {
    authorize: {
      url: 'https://www.tiktok.com/auth/authorize/',
      buildQuery: (client_key: string, csrfState: string) =>
        createQueryString({
          client_key,
          redirect_uri: 'http://localhost.qlip.ai/api/oauth/tiktok/callback',
          response_type: 'code',
          scope: 'user.info.basic',
          state: csrfState,
        }),
    },
    access_token: {
      url: 'https://open-api.tiktok.com/oauth/access_token/',
      buildQuery: (client_key: string, client_secret: string, code: string) =>
        createQueryString({
          client_key,
          client_secret,
          code,
          grant_type: 'authorization_code',
        }),
      method: 'POST',
      formatResponse: (
        obj: Record<string, Record<string, any> | any>,
      ): AccessTokenResponse => ({
        access_token: obj.data.access_token,
        refresh_token: obj.data.refresh_token,
        expires_in: obj.data.expires_in,
        refresh_expires_in: obj.data.refresh_expires_in,
        scope: obj.data.scope,
        open_id: obj.data.open_id,
      }),
      formatResponseError: (
        obj: Record<string, Record<string, any> | any> | any,
      ): AccessTokenResponseError => ({
        message: obj.message,
      }),
    },
    refresh_access_token: {
      url: 'https://open-api.tiktok.com/oauth/refresh_token/',
      buildQuery: (client_key: string, grant_type: string, refresh_token: string) =>
        createQueryString({
          client_key,
          grant_type,
          refresh_token,
        }),
      method: 'POST',
      formatResponse: (
        obj: Record<string, Record<string, any> | any>,
      ): AccessTokenResponse => ({
        access_token: obj.data.access_token,
        refresh_token: obj.data.refresh_token,
        expires_in: obj.data.expires_in,
        refresh_expires_in: obj.data.refresh_expires_in,
        scope: obj.data.scope,
        open_id: obj.data.open_id,
      }),
      formatResponseError: (
        obj: Record<string, Record<string, any> | any> | any,
      ): AccessTokenResponseError => ({
        message: obj.message,
      }),
    },
    revoke_access: {
      url: 'https://open-api.tiktok.com/oauth/revoke/',
      buildQuery: (open_id: string, access_token: string) =>
        createQueryString({ open_id, access_token }),
      method: 'POST',
      formatResponse: (obj: Record<string, Record<string, any> | any>) => ({
        code: obj.data.error_code,
        message: obj.data.description,
      }),
    },
    upload_video: {
      url: 'https://open-api.tiktok.com/share/video/upload/',
      buildQuery: (open_id: string, access_token: string) =>
        createQueryString({ open_id, access_token }),
      method: 'POST',
      formatResponse: (obj: Record<string, Record<string, any> | any>) => ({
        share_id: obj.data.share_id,
        error_code: obj.data.error_code,
        error_mesg: obj.data.error_mesg,
        request_id: obj.extra.logid,
      }),
    },
    user: {
      url: 'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name',
      method: 'GET',
      formatResponse: (obj: Record<string, Record<string, any> | any>) => ({
        avatar_url: obj.data.user.avatar_url,
        display_name: obj.data.user.display_name,
        open_id: obj.data.user.open_id,
        error: {
          code: obj.error.code,
          message: obj.error.message,
        },
      }),
    },
  },
};

export type ProvidersName = keyof typeof providers;

export default providers;

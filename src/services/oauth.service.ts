import config from 'config';

import providers, { ProvidersName } from '../utils/providers';
import { fetchData } from '../utils/utils';

export const getRedirectUrl = (provider: ProvidersName, csrfState: string): string => {
  const client_key = config.get<string>(`${provider}.client_key`);

  const provider_authorize_url = providers[provider].authorize.url;
  const provider_authorize_query = providers[provider].authorize.buildQuery(
    client_key,
    csrfState,
  );

  return `${provider_authorize_url}?${provider_authorize_query}`;
};

export const getAccessToken = async (
  provider: ProvidersName,
  code: string,
): Promise<Record<string, any>> => {
  const client_key = config.get<string>(`${provider}.client_key`);
  const client_secret = config.get<string>(`${provider}.client_secret`);

  const provider_access_token_url = providers[provider].access_token.url;
  const provider_access_token_query = providers[provider].access_token.buildQuery(
    client_key,
    client_secret,
    code,
  );
  const provider_access_token_method = providers[provider].access_token.method || 'GET';

  const url = `${provider_access_token_url}?${provider_access_token_query}`;

  const options = {
    method: provider_access_token_method,
  };

  const result = await fetchData(url, options);
  if (result.message) {
    return providers[provider].access_token.formatResponseError(result);
  }
  return providers[provider].access_token.formatResponse(result);
};

export const getRefreshToken = async (
  provider: ProvidersName,
  refresh_token: string,
): Promise<Record<string, any>> => {
  const client_key = config.get<string>(`${provider}.client_key`);

  const provider_refresh_access_token_url = providers[provider].refresh_access_token.url;
  const provider_refresh_access_token_query = providers[
    provider
  ].refresh_access_token.buildQuery(client_key, 'refresh_token', refresh_token);
  const provider_refresh_access_token_method =
    providers[provider].refresh_access_token.method || 'GET';

  const url = `${provider_refresh_access_token_url}?${provider_refresh_access_token_query}`;

  const options = {
    method: provider_refresh_access_token_method,
  };

  const result = await fetchData(url, options);
  if (result.message) {
    return providers[provider].refresh_access_token.formatResponseError(result);
  }
  return providers[provider].refresh_access_token.formatResponse(result);
};

export const revokeToken = async (
  provider: ProvidersName,
  open_id: string,
  access_token: string,
): Promise<Record<string, any>> => {
  const provider_revoke_access_url = providers[provider].revoke_access.url;
  const provider_revoke_access_query = providers[provider].revoke_access.buildQuery(
    open_id,
    access_token,
  );
  const provider_revoke_access_method = providers[provider].revoke_access.method || 'GET';

  const url = `${provider_revoke_access_url}?${provider_revoke_access_query}`;

  const options = {
    method: provider_revoke_access_method,
  };

  const result = await fetchData(url, options);
  return providers[provider].revoke_access.formatResponse(result);
};

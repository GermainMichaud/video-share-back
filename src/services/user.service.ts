import providers, { ProvidersName } from '../utils/providers';
import { fetchData } from '../utils/utils';

export const getUserInfo = async (provider: ProvidersName, access_token: string) => {
  const url = providers[provider].user.url;
  const provider_me_method = providers[provider].user.method || 'GET';

  const options = {
    method: provider_me_method,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const result = await fetchData(url, options);
  return providers[provider].user.formatResponse(result);
};

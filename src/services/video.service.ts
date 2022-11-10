import providers, { ProvidersName } from '../utils/providers';
import { fetchData } from '../utils/utils';

export const upload = async (
  provider: ProvidersName,
  access_token: string,
  open_id: string,
  video: File,
) => {
  const provider_upload_video_url = providers[provider].upload_video.url;
  const provider_upload_video_query = providers[provider].upload_video.buildQuery(
    open_id,
    access_token,
  );
  const provider_upload_video_method = providers[provider].upload_video.method || 'POST';

  const url = `${provider_upload_video_url}?${provider_upload_video_query}`;

  const options = {
    method: provider_upload_video_method,
    body: video,
  };

  const result = await fetchData(url, options);
  return providers[provider].upload_video.formatResponse(result);
};

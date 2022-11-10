export interface AccessTokenResponse {
  open_id: string;
  scope: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export interface AccessTokenResponseError {
  message: string;
}

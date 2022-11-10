import axios, { AxiosRequestConfig } from 'axios';

export const fetchData = async (
  url: string,
  options: AxiosRequestConfig = {},
): Promise<Record<string, Record<string, any> | any>> => {
  try {
    const { data } = await axios(url, {
      ...options,
    });
    return data as Record<string, Record<string, any> | any>;
  } catch (error) {
    console.error(url, error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw new Error('Unknown error');
    }
  }
};

export const createQueryString = (params: Record<string, string>): string => {
  return new URLSearchParams(params).toString();
};

export const getCsrf = (): string => Math.random().toString(36).substring(2);

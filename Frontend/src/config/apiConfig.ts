import { IApi } from "../interfaces/config/IApi.ts";

/**
 * All url of api resources
 * @implements IApi - All type of ApiConfig
 * @key public - Extern Api
 * @key private - Local Api
 */
export const ApiConfig: IApi = {
  // TODO contains local api url
  private: {
    // TODO Fill in with the authentication url
    login: `${import.meta.env.VITE_BACKEND_URL}/login`,
    register: `${import.meta.env.VITE_BACKEND_URL}/user/register`,
    postTrajet: `${import.meta.env.VITE_BACKEND_URL}/trip/new-trip`,
    searchTrajet: `${import.meta.env.VITE_BACKEND_URL}/trip/search`,
    socketUri: `${import.meta.env.VITE_BACKEND_URL}`,
  },
  // TODO contains extern api url
  // TODO example: stripe: 'https://www.stripe.com/v1'
};

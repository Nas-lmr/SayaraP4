import { IApi } from "../interfaces/config/IApi";

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
    persist: `${import.meta.env.VITE_BACKEND_URL}persist`,
    logout: `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
    register: `${import.meta.env.VITE_BACKEND_URL}/user/register`,
    postTrajet: `${import.meta.env.VITE_BACKEND_URL}/trip/new-trip`,
    searchTrajet: `${import.meta.env.VITE_BACKEND_URL}/trip/search`,
  },
  // TODO contains extern api url
  // TODO example: stripe: 'https://www.stripe.com/v1'
};

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
    login: "http://localhost:3310/login",
    register: "http://localhost:3310/user/register",
    postTrajet: "http://localhost:3310/trip/new-trip",
    searchTrajet: "http://localhost:3310/trip/search",
  },
  // TODO contains extern api url
  // TODO example: stripe: 'https://www.stripe.com/v1'
};

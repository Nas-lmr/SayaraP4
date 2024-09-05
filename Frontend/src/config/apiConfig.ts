import {IApi} from "../interfaces/config/IApi.ts";

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
    login: ''
  },
  // TODO contains extern api url
  // TODO example: stripe: 'https://www.stripe.com/v1'
  public: {}
}
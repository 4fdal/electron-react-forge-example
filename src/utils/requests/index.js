import { KEY_ACCESS_TOKEN } from "../constants/call-key-storage";
import {
  axiosErrorHandle,
  getApiBasePath,
} from "../helpers/call-helper";


/**
 * 
 * @param {{...AxiosRequestConfig<any}>} config 
 * 
 * @return {Promise<any>}
 */
export async function MeRequest(config = {}) {
  try {
    //  get token authorize from local storage
    const token = localStorage.getItem(KEY_ACCESS_TOKEN);

    // auto use token, if token exist in local storage
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    const request = await rendererInvokeRequest('request', {
      ...config,
      url: getApiBasePath(config.url),
    })

    return request

  } catch (error) {
    error.handle = axiosErrorHandle(error);
    return Promise.reject(error)
  }

}

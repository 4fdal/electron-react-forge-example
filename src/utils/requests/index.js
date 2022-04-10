import { KEY_ACCESS_TOKEN } from "../constants/call-key-storage";
import {
  axiosErrorHandle,
  getApiBasePath,
} from "../helpers/call-helper";
import { rendererInvokeRequest } from "../ipc-renderer";


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
    config.headers = { ...config.headers }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return await rendererInvokeRequest({
      ...config,
      url: getApiBasePath(config.url),
    })

  } catch (error) {

    error.handle = axiosErrorHandle(error);
    return await Promise.reject(error)
  }

}

import axios from "axios";
import { KEY_ACCESS_TOKEN } from "../constants/call-key-storage";
import {
  axiosErrorHandle,
  getApiBasePath,
} from "../helpers/call-helper";

function createResource() {
  const instance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    config => {
      //  get token authorize from local storage
      const token = localStorage.getItem(KEY_ACCESS_TOKEN);

      // auto use token, if token exist in local storage
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      return Promise.resolve(response);
    },
    error => {
      error.handle = axiosErrorHandle(error);
      return Promise.reject(error);
    }
  );

  return instance;
}

export const MeRequest = createResource();
MeRequest.interceptors.request.use(config => {
  config.baseURL = getApiBasePath();
  return config;
});

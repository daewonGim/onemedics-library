import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { JoinFormData } from "./types";

class Client {
  private axios: AxiosInstance;
  private token: string | object = "";

  constructor(
    OAUTH_BASIC_KEY: string | object,
    GW_API_BASE_URL: string,
    API_REQUEST_TIMEOUT: number,
    APP_CLIENT_ID?: string,
    APP_VERSION?: string
  ) {
    this.token = OAUTH_BASIC_KEY;
    this.axios = axios.create({
      baseURL: GW_API_BASE_URL,
      timeout: API_REQUEST_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
        ClientId: APP_CLIENT_ID,
        AppVersion: APP_VERSION,
      },
    });
    // 공통 오류 처리
    this.axios.interceptors.response.use(
      (response) => {
        // 성공 로직에 별도 추가하지 않음
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  getToken(): string | object {
    return this.token;
  }
  updateAuthorizationToken(accessToken?: string | object) {
    this.axios.defaults.headers.Authorization = accessToken
      ? {
          toString() {
            return accessToken;
          },
        }
      : this.token;
  }

  get<T>(path: string, payload?: AxiosRequestConfig) {
    return this.axios
      .get<T>(path, payload)
      .then((response: AxiosResponse) => response);
  }

  post(path: string, payload: FormData | JoinFormData | JSON | string) {
    const options = {
      headers: {
        "Content-Type":
          payload instanceof FormData
            ? "multipart/form-data"
            : "application/json",
      },
    };

    return this.axios
      .post(path, payload, options)
      .then((response: AxiosResponse) => response);
  }

  put(path: string, payload?: AxiosRequestConfig) {
    return this.axios
      .put(path, payload)
      .then((result: AxiosResponse) => result);
  }

  delete(path: string, payload?: AxiosRequestConfig) {
    return this.axios
      .delete(path, payload)
      .then((result: AxiosResponse) => result);
  }
}

export default Client;

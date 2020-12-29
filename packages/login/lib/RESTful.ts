import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
/*
 *
 * @todo
 *   npm 업로드시   ../../common/lib/RESTful 는 npm에 있는 @onemedics-library/common 에서 불러오도록 변경필요
 *
 * */
import { Client, JoinFormData } from "../../common/lib";

class LoginClient extends Client {
  constructor(
    OAUTH_BASIC_KEY: string | object,
    GW_API_BASE_URL: string,
    API_REQUEST_TIMEOUT: number,
    APP_CLIENT_ID?: string,
    APP_VERSION?: string
  ) {
    super(
      OAUTH_BASIC_KEY,
      GW_API_BASE_URL,
      API_REQUEST_TIMEOUT,
      APP_CLIENT_ID,
      APP_VERSION
    );
  }
  async serverHealthCheck() {
    return await this.get("/dosoo/health/check");
  }

  async oauthLogin(params: FormData) {
    this.updateAuthorizationToken(this.getToken());
    return await this.post("/oauth/token", params);
  }

  async getUserInfo(access_token: string) {
    this.updateAuthorizationToken(`Bearer ${access_token}`);
    return await this.get("/dosoo/v1/member/me");
  }

  async updateAppDeviceToken(access_token: string, params: FormData) {
    this.updateAuthorizationToken(`Bearer ${access_token}`);
    return await this.post("/dosoo/v1/device-token", params);
  }

  async getEmrInfo(accessToken: string | null | void, paymentId: string) {
    return await this.post(`/dosoo/v2/api/pay/detail/${paymentId}`, JSON);
  }

  async createUserInfo(params: JoinFormData) {
    return await this.post("/auth/v1/user/signup", params);
  }

  async confirmPassword(password: string) {
    return await this.post("/auth/v1/user/confirmPassword", password);
  }

  async updatePassword(params: string) {
    return await this.post("/auth/v1/user/updatePassword", params);
  }
}

export default LoginClient;

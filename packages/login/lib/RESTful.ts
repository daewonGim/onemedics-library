import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
/*
 *
 * @todo
 *   npm 업로드시   ../../common/lib/RESTful 는 npm에 있는 @onemedics-library/common 에서 불러오도록 변경필요
 *
 * */
import { Client, JoinFormData } from "../../common/lib";
import { AxiosClientConfig } from "../../common/lib/types";

class LoginClient extends Client {
  constructor(config: AxiosClientConfig) {
    super(config);
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

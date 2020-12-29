import { AxiosResponse } from "axios";
import { Client, JoinFormData } from "../../common/lib";
declare class LoginClient extends Client {
    constructor(OAUTH_BASIC_KEY: string | object, GW_API_BASE_URL: string, API_REQUEST_TIMEOUT: number, APP_CLIENT_ID?: string, APP_VERSION?: string);
    serverHealthCheck(): Promise<AxiosResponse<any>>;
    oauthLogin(params: FormData): Promise<AxiosResponse<any>>;
    getUserInfo(access_token: string): Promise<AxiosResponse<any>>;
    updateAppDeviceToken(access_token: string, params: FormData): Promise<AxiosResponse<any>>;
    getEmrInfo(accessToken: string | null | void, paymentId: string): Promise<AxiosResponse<any>>;
    createUserInfo(params: JoinFormData): Promise<AxiosResponse<any>>;
    confirmPassword(password: string): Promise<AxiosResponse<any>>;
    updatePassword(params: string): Promise<AxiosResponse<any>>;
}
export default LoginClient;

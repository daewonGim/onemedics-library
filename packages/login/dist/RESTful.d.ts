import { AxiosRequestConfig, AxiosResponse } from "axios";
export declare type JoinFormData = {
    username: string;
    loginId: string;
    phone: string;
    password: string;
    authNum: string;
    authNumId: string;
    marketingAgreement: boolean;
};
declare class Client {
    private axios;
    private token;
    constructor(OAUTH_BASIC_KEY: string | object, GW_API_BASE_URL: string, API_REQUEST_TIMEOUT: number, APP_CLIENT_ID?: string, APP_VERSION?: string);
    updateAuthorizationToken(accessToken?: string | object): void;
    get<T>(path: string, payload?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(path: string, payload: FormData | JoinFormData | JSON | string): Promise<AxiosResponse<any>>;
    put(path: string, payload?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(path: string, payload?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    serverHealthCheck(): Promise<AxiosResponse<any>>;
    oauthLogin(params: FormData): Promise<AxiosResponse<any>>;
    getUserInfo(access_token: string): Promise<AxiosResponse<any>>;
    updateAppDeviceToken(access_token: string, params: FormData): Promise<AxiosResponse<any>>;
    getEmrInfo(accessToken: string | null | void, paymentId: string): Promise<AxiosResponse<any>>;
    createUserInfo(params: JoinFormData): Promise<AxiosResponse<any>>;
    confirmPassword(password: string): Promise<AxiosResponse<any>>;
    updatePassword(params: string): Promise<AxiosResponse<any>>;
}
export default Client;

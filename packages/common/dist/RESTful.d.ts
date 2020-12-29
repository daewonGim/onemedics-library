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
    getToken(): string | object;
    updateAuthorizationToken(accessToken?: string | object): void;
    get<T>(path: string, payload?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(path: string, payload: FormData | JoinFormData | JSON | string): Promise<AxiosResponse<any>>;
    put(path: string, payload?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(path: string, payload?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
}
export default Client;

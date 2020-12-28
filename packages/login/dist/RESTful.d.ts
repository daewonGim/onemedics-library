import { AxiosResponse } from "axios";
declare class Client {
    private axios;
    private token;
    constructor(OAUTH_BASIC_KEY: string | object, GW_API_BASE_URL: string, API_REQUEST_TIMEOUT: number, APP_CLIENT_ID?: string, APP_VERSION?: string, showToast?: (toastProps: any) => void);
    updateAuthorizationToken(accessToken?: string): void;
    get<T>(path: string, payload?: any): Promise<AxiosResponse<any>>;
    post(path: string, payload: any): Promise<AxiosResponse<any>>;
    put(path: string, payload: any): Promise<AxiosResponse<any>>;
    delete(path: string, payload?: any): Promise<AxiosResponse<any>>;
}
export default Client;
export declare const serverHealthCheck: (client: Client, path: string) => Promise<AxiosResponse<any>>;
export declare const oauthLogin: (client: Client, OAUTH_BASIC_KEY: string, params: FormData) => Promise<AxiosResponse<any>>;
export declare const getUserInfo: (client: Client, access_token: string) => Promise<AxiosResponse<any>>;
export declare const updateAppDeviceToken: (client: Client, access_token: string, params: object) => Promise<AxiosResponse<any>>;
export declare const getEmrInfo: (client: Client, accessToken: string | null | void, paymentId: string) => Promise<AxiosResponse<any>>;
export declare const createUserInfo: (client: Client, params: object) => Promise<AxiosResponse<any>>;
export declare const confirmPassword: (client: Client, password: string) => Promise<AxiosResponse<any>>;
export declare const updatePassword: (client: Client, params: object) => Promise<AxiosResponse<any>>;

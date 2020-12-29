import { AxiosResponse } from "axios";
import { Client, JoinFormData } from "../../common/lib";
declare class LoginClient extends Client {
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

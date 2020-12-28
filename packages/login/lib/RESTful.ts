import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

export type JoinFormData = {
    username: string;
    loginId: string;
    phone: string;
    password: string;
    authNum: string;
    authNumId: string;
    marketingAgreement: boolean;
};
export type ToastProps = {
    toastMessage: string;
    isVisible?: boolean;
    backgroundColor: string;
    isChecked?: boolean;
};

class Client {
    private axios: AxiosInstance;
    private token: string | object = "";

    constructor(
        OAUTH_BASIC_KEY: string | object,
        GW_API_BASE_URL: string,
        API_REQUEST_TIMEOUT: number,
        APP_CLIENT_ID?: string,
        APP_VERSION?: string,
        showToast?: (toastProps: ToastProps) => void
    ) {
        this.token = OAUTH_BASIC_KEY;
        this.axios = axios.create({
            baseURL: GW_API_BASE_URL,
            timeout: API_REQUEST_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                Authorization: this.token,
                ClientId: APP_CLIENT_ID,
                AppVersion: APP_VERSION
            }
        });
        // 공통 오류 처리
        this.axios.interceptors.response.use(
            (response) => {
                // 성공 로직에 별도 추가하지 않음
                return response;
            },
            (error) => {
                // 실패 로직에 500 에러 메시지 표시
                if (error && error.response && error.response.status === 500) {
                    // 오류 toast 표시
                    showToast && showToast({
                        backgroundColor: 'red',
                        toastMessage: '오류가 발생 했습니다. 관리자에게 문의바랍니다.',
                    });
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            },
        );
    }

    updateAuthorizationToken(accessToken?: string | object) {
        this.axios.defaults.headers.Authorization = accessToken
            ? {
                toString() {
                    return accessToken;
                }
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
                        : "application/json"
            }
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

    async serverHealthCheck(){
        return await this.get("/dosoo/health/check");
    };

    async oauthLogin(params: FormData){
        this.updateAuthorizationToken(this.token);
        return await this.post("/oauth/token", params);
    };

    async getUserInfo(access_token: string){
        this.updateAuthorizationToken(`Bearer ${access_token}`);
        return await this.get("/dosoo/v1/member/me");
    };

    async updateAppDeviceToken(access_token: string,params: FormData){
        this.updateAuthorizationToken(`Bearer ${access_token}`);
        return await this.post("/dosoo/v1/device-token", params);
    };

    async getEmrInfo(accessToken: string | null | void, paymentId: string){
        return await this.post(`/dosoo/v2/api/pay/detail/${paymentId}`, JSON);
    };

    async createUserInfo(params: JoinFormData){
        return await this.post("/auth/v1/user/signup", params);
    };

    async confirmPassword( password: string){
        return await this.post("/auth/v1/user/confirmPassword", password);
    };

    async updatePassword( params: string){
        return await this.post("/auth/v1/user/updatePassword", params);
    };
}

export default Client;



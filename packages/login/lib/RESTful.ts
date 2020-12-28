import axios, { AxiosInstance, AxiosResponse } from "axios";

class Client {
    private axios: AxiosInstance;
    private token: string | object = "";

    constructor(
        OAUTH_BASIC_KEY: string | object,
        GW_API_BASE_URL: string,
        API_REQUEST_TIMEOUT: number,
        APP_CLIENT_ID?: string,
        APP_VERSION?: string,
        showToast?: (toastProps: any) => void
    ) {
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
    }

    updateAuthorizationToken(accessToken?: string) {
        this.axios.defaults.headers.Authorization = accessToken
            ? {
                toString() {
                    return accessToken;
                }
            }
            : this.token;
    }

    get<T>(path: string, payload?: any) {
        return this.axios
            .get<T>(path, payload)
            .then((response: AxiosResponse) => response);
    }

    post(path: string, payload: any) {
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

    put(path: string, payload: any) {
        return this.axios
            .put(path, payload)
            .then((result: AxiosResponse) => result);
    }

    delete(path: string, payload?: any) {
        return this.axios
            .delete(path, payload)
            .then((result: AxiosResponse) => result);
    }
}

export default Client;

export const serverHealthCheck = async (client: Client, path: string) => {
    return await client.get("/dosoo/health/check");
};

export const oauthLogin = async (
    client: Client,
    OAUTH_BASIC_KEY: string,
    params: FormData
) => {
    client.updateAuthorizationToken(OAUTH_BASIC_KEY);
    return await client.post("/oauth/token", params);
};

export const getUserInfo = async (client: Client, access_token: string) => {
    client.updateAuthorizationToken(`Bearer ${access_token}`);
    return await client.get("/dosoo/v1/member/me");
};

export const updateAppDeviceToken = async (
    client: Client,
    access_token: string,
    params: object
) => {
    client.updateAuthorizationToken(`Bearer ${access_token}`);
    return await client.post("/dosoo/v1/device-token", params);
};

export const getEmrInfo = async (
    client: Client,
    accessToken: string | null | void,
    paymentId: string
) => {
    return await client.post(`/dosoo/v2/api/pay/detail/${paymentId}`, {});
};

export const createUserInfo = async (client: Client, params: object) => {
    return await client.post("/auth/v1/user/signup", params);
};

export const confirmPassword = async (client: Client, password: string) => {
    return await client.post("/auth/v1/user/confirmPassword", password);
};

export const updatePassword = async (client: Client, params: object) => {
    return await client.post("/auth/v1/user/updatePassword", params);
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Client = /** @class */ (function () {
    function Client(OAUTH_BASIC_KEY, GW_API_BASE_URL, API_REQUEST_TIMEOUT, APP_CLIENT_ID, APP_VERSION) {
        this.token = "";
        this.token = OAUTH_BASIC_KEY;
        this.axios = axios_1.default.create({
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
        this.axios.interceptors.response.use(function (response) {
            // 성공 로직에 별도 추가하지 않음
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }
    Client.prototype.getToken = function () {
        return this.token;
    };
    Client.prototype.updateAuthorizationToken = function (accessToken) {
        this.axios.defaults.headers.Authorization = accessToken
            ? {
                toString: function () {
                    return accessToken;
                },
            }
            : this.token;
    };
    Client.prototype.get = function (path, payload) {
        return this.axios
            .get(path, payload)
            .then(function (response) { return response; });
    };
    Client.prototype.post = function (path, payload) {
        var options = {
            headers: {
                "Content-Type": payload instanceof FormData
                    ? "multipart/form-data"
                    : "application/json",
            },
        };
        return this.axios
            .post(path, payload, options)
            .then(function (response) { return response; });
    };
    Client.prototype.put = function (path, payload) {
        return this.axios
            .put(path, payload)
            .then(function (result) { return result; });
    };
    Client.prototype.delete = function (path, payload) {
        return this.axios
            .delete(path, payload)
            .then(function (result) { return result; });
    };
    return Client;
}());
exports.default = Client;

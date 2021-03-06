"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updatePassword = exports.confirmPassword = exports.createUserInfo = exports.getEmrInfo = exports.updateAppDeviceToken = exports.getUserInfo = exports.oauthLogin = exports.serverHealthCheck = void 0;
var axios_1 = require("axios");
var Client = /** @class */ (function () {
    function Client(OAUTH_BASIC_KEY, GW_API_BASE_URL, API_REQUEST_TIMEOUT, APP_CLIENT_ID, APP_VERSION, showToast) {
        this.token = "";
        this.axios = axios_1["default"].create({
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
    Client.prototype.updateAuthorizationToken = function (accessToken) {
        this.axios.defaults.headers.Authorization = accessToken
            ? {
                toString: function () {
                    return accessToken;
                }
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
                    : "application/json"
            }
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
    Client.prototype["delete"] = function (path, payload) {
        return this.axios["delete"](path, payload)
            .then(function (result) { return result; });
    };
    return Client;
}());
exports["default"] = Client;
exports.serverHealthCheck = function (client, path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.get("/dosoo/health/check")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.oauthLogin = function (client, OAUTH_BASIC_KEY, params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client.updateAuthorizationToken(OAUTH_BASIC_KEY);
                return [4 /*yield*/, client.post("/oauth/token", params)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getUserInfo = function (client, access_token) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client.updateAuthorizationToken("Bearer " + access_token);
                return [4 /*yield*/, client.get("/dosoo/v1/member/me")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updateAppDeviceToken = function (client, access_token, params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client.updateAuthorizationToken("Bearer " + access_token);
                return [4 /*yield*/, client.post("/dosoo/v1/device-token", params)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getEmrInfo = function (client, accessToken, paymentId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.post("/dosoo/v2/api/pay/detail/" + paymentId, {})];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createUserInfo = function (client, params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.post("/auth/v1/user/signup", params)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.confirmPassword = function (client, password) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.post("/auth/v1/user/confirmPassword", password)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.updatePassword = function (client, params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.post("/auth/v1/user/updatePassword", params)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

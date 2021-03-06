"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *
 * @todo
 *   npm 업로드시   ../../common/lib/RESTful 는 npm에 있는 @onemedics-library/common 에서 불러오도록 변경필요
 *
 * */
var lib_1 = require("../../common/lib");
var LoginClient = /** @class */ (function (_super) {
    __extends(LoginClient, _super);
    function LoginClient(OAUTH_BASIC_KEY, GW_API_BASE_URL, API_REQUEST_TIMEOUT, APP_CLIENT_ID, APP_VERSION) {
        return _super.call(this, OAUTH_BASIC_KEY, GW_API_BASE_URL, API_REQUEST_TIMEOUT, APP_CLIENT_ID, APP_VERSION) || this;
    }
    LoginClient.prototype.serverHealthCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get("/dosoo/health/check")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.oauthLogin = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateAuthorizationToken(this.getToken());
                        return [4 /*yield*/, this.post("/oauth/token", params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.getUserInfo = function (access_token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateAuthorizationToken("Bearer " + access_token);
                        return [4 /*yield*/, this.get("/dosoo/v1/member/me")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.updateAppDeviceToken = function (access_token, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateAuthorizationToken("Bearer " + access_token);
                        return [4 /*yield*/, this.post("/dosoo/v1/device-token", params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.getEmrInfo = function (accessToken, paymentId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("/dosoo/v2/api/pay/detail/" + paymentId, JSON)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.createUserInfo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("/auth/v1/user/signup", params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.confirmPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("/auth/v1/user/confirmPassword", password)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginClient.prototype.updatePassword = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post("/auth/v1/user/updatePassword", params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LoginClient;
}(lib_1.Client));
exports.default = LoginClient;

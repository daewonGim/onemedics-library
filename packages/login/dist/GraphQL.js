"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloUserWebClient = exports.apolloWebClient = exports.apolloAppClient = void 0;
var apollo_boost_1 = __importStar(require("apollo-boost"));
var apollo_link_error_1 = require("apollo-link-error");
var apollo_link_context_1 = require("apollo-link-context");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
/* App용 apollo client */
exports.apolloAppClient = function (DOSOO_API_BASE_URL, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO, storage, validateTokenExp, OAUTH_BASIC_KEY, APP_CLIENT_ID, APP_VERSION) {
    var httpLink = new apollo_boost_1.HttpLink({
        uri: "" + DOSOO_API_BASE_URL
    });
    var cache = new apollo_boost_1.InMemoryCache();
    var authLink = apollo_link_context_1.setContext(function (_, _a) {
        var headers = _a.headers;
        return __awaiter(void 0, void 0, void 0, function () {
            var token, isTokenValid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO)];
                    case 1:
                        token = _b.sent();
                        return [4 /*yield*/, validateTokenExp()];
                    case 2:
                        isTokenValid = _b.sent();
                        return [2 /*return*/, {
                                headers: __assign(__assign({}, headers), { Authorization: isTokenValid ? "Bearer " + token : OAUTH_BASIC_KEY, ClientId: APP_CLIENT_ID, AppVersion: APP_VERSION })
                            }];
                }
            });
        });
    });
    var httpAuthLink = authLink.concat(httpLink);
    var errorLink = apollo_link_error_1.onError(function (_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError;
        if (graphQLErrors) {
            graphQLErrors.map(function (_a) {
                var message = _a.message, locations = _a.locations, path = _a.path;
                return console.warn("[GraphQL error]: Message: " + message + ", Location: " + locations + ", Path: " + path);
            });
            if (networkError) {
                console.warn("[Network error]: " + networkError);
            }
        }
    });
    return new apollo_boost_1.ApolloClient({
        link: apollo_boost_1.ApolloLink.from([httpAuthLink, errorLink]),
        cache: cache
    });
};
/* Web용 apollo client */
exports.apolloWebClient = function (DOSOO_API_BASE_URL, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO, storage) {
    return new apollo_boost_1.default({
        uri: DOSOO_API_BASE_URL,
        fetch: cross_fetch_1.default,
        request: function (operation) {
            var token = storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
            if (token) {
                operation.setContext({
                    headers: {
                        authorization: token ? "Bearer " + token : ""
                    }
                });
            }
        }
    });
};
/* Web용 apollo client */
exports.apolloUserWebClient = function (USER_API_BASE_URL, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO, storage) {
    return new apollo_boost_1.default({
        uri: USER_API_BASE_URL,
        fetch: cross_fetch_1.default,
        request: function (operation) {
            var token = storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
            if (token) {
                operation.setContext({
                    headers: {
                        authorization: token ? "Bearer " + token : ""
                    }
                });
            }
        }
    });
};

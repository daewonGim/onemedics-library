"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloUserWebClient = exports.apolloWebClient = exports.apolloAppClient = exports.updatePassword = exports.confirmPassword = exports.createUserInfo = exports.getEmrInfo = exports.updateAppDeviceToken = exports.getUserInfo = exports.AxiosClient = void 0;
var RESTful_1 = require("./RESTful");
Object.defineProperty(exports, "AxiosClient", { enumerable: true, get: function () { return __importDefault(RESTful_1).default; } });
Object.defineProperty(exports, "getUserInfo", { enumerable: true, get: function () { return RESTful_1.getUserInfo; } });
Object.defineProperty(exports, "updateAppDeviceToken", { enumerable: true, get: function () { return RESTful_1.updateAppDeviceToken; } });
Object.defineProperty(exports, "getEmrInfo", { enumerable: true, get: function () { return RESTful_1.getEmrInfo; } });
Object.defineProperty(exports, "createUserInfo", { enumerable: true, get: function () { return RESTful_1.createUserInfo; } });
Object.defineProperty(exports, "confirmPassword", { enumerable: true, get: function () { return RESTful_1.confirmPassword; } });
Object.defineProperty(exports, "updatePassword", { enumerable: true, get: function () { return RESTful_1.updatePassword; } });
var GraphQL_1 = require("./GraphQL");
Object.defineProperty(exports, "apolloAppClient", { enumerable: true, get: function () { return GraphQL_1.apolloAppClient; } });
Object.defineProperty(exports, "apolloWebClient", { enumerable: true, get: function () { return GraphQL_1.apolloWebClient; } });
Object.defineProperty(exports, "apolloUserWebClient", { enumerable: true, get: function () { return GraphQL_1.apolloUserWebClient; } });

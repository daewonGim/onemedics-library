"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoginClient = exports.WebLoginClient = exports.LoginAxiosClient = void 0;
var RESTful_1 = require("./RESTful");
Object.defineProperty(exports, "LoginAxiosClient", { enumerable: true, get: function () { return __importDefault(RESTful_1).default; } });
var GraphQL_1 = require("./GraphQL");
Object.defineProperty(exports, "WebLoginClient", { enumerable: true, get: function () { return GraphQL_1.WebLoginClient; } });
Object.defineProperty(exports, "AppLoginClient", { enumerable: true, get: function () { return GraphQL_1.AppLoginClient; } });

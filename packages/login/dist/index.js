"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apolloUserWebClient = exports.apolloWebClient = exports.apolloAppClient = exports.AxiosClient = void 0;
var RESTful_1 = require("./RESTful");
Object.defineProperty(exports, "AxiosClient", { enumerable: true, get: function () { return __importDefault(RESTful_1).default; } });
var GraphQL_1 = require("./GraphQL");
Object.defineProperty(exports, "apolloAppClient", { enumerable: true, get: function () { return GraphQL_1.apolloAppClient; } });
Object.defineProperty(exports, "apolloWebClient", { enumerable: true, get: function () { return GraphQL_1.apolloWebClient; } });
Object.defineProperty(exports, "apolloUserWebClient", { enumerable: true, get: function () { return GraphQL_1.apolloUserWebClient; } });

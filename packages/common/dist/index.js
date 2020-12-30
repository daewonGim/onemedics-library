"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApolloClient = exports.AppApolloClient = exports.Client = void 0;
var RESTful_1 = require("./RESTful");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return __importDefault(RESTful_1).default; } });
var GraphQL_1 = require("./GraphQL");
Object.defineProperty(exports, "AppApolloClient", { enumerable: true, get: function () { return GraphQL_1.AppApolloClient; } });
Object.defineProperty(exports, "WebApolloClient", { enumerable: true, get: function () { return GraphQL_1.WebApolloClient; } });

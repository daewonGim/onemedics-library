"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoginClient = exports.WebLoginClient = void 0;
/*
 *
 * @todo
 *   npm 업로드시   ../../common/lib/GraphQL 는 npm에 있는 @onemedics-library/common 에서 불러오도록 변경필요
 *
 * */
var lib_1 = require("../../common/lib");
exports.WebLoginClient = function (DOSOO_API_BASE_URL, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO, storage) {
    return lib_1.WebApolloClient("https://dev.onemedics.net:9443/dosoo/graphql", "dosoo_access_token", storage);
};
exports.AppLoginClient = function (DOSOO_API_BASE_URL, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO, storage, validateTokenExp, OAUTH_BASIC_KEY, APP_CLIENT_ID, APP_VERSION) {
    return lib_1.AppApolloClient(DOSOO_API_BASE_URL, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO, storage, validateTokenExp, OAUTH_BASIC_KEY, APP_CLIENT_ID, APP_VERSION);
};

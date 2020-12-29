import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
/*
 *
 * @todo
 *   npm 업로드시   ../../common/lib/GraphQL 는 npm에 있는 @onemedics-library/common 에서 불러오도록 변경필요
 *
 * */
import { AppApolloClient, WebApolloClient, Storage } from "../../common/lib";

export const WebLoginClient = (
  DOSOO_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: Storage
): ApolloClient<any> => {
  return WebApolloClient(
    "https://dev.onemedics.net:9443/dosoo/graphql",
    "dosoo_access_token",
    storage
  );
};

export const AppLoginClient = (
  DOSOO_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: Storage,
  validateTokenExp: () => Promise<boolean>,
  OAUTH_BASIC_KEY: string,
  APP_CLIENT_ID: string,
  APP_VERSION: string
): ApolloClient<NormalizedCacheObject> => {
  return AppApolloClient(
    DOSOO_API_BASE_URL,
    ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO,
    storage,
    validateTokenExp,
    OAUTH_BASIC_KEY,
    APP_CLIENT_ID,
    APP_VERSION
  );
};

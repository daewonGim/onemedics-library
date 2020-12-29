import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { Storage } from "../../common/lib";
export declare const WebLoginClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: Storage) => ApolloClient<any>;
export declare const AppLoginClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: Storage, validateTokenExp: () => Promise<boolean>, OAUTH_BASIC_KEY: string, APP_CLIENT_ID: string, APP_VERSION: string) => ApolloClient<NormalizedCacheObject>;

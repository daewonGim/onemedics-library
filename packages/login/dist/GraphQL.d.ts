import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
export declare const apolloAppClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: any, validateTokenExp: () => Promise<boolean>, OAUTH_BASIC_KEY: string, APP_CLIENT_ID: string, APP_VERSION: string) => ApolloClient<NormalizedCacheObject>;
export declare const apolloWebClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: any) => ApolloClient<any>;

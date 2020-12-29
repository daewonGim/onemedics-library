import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { Storage } from "./types";
export declare const AppApolloClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: Storage, validateTokenExp: () => Promise<boolean>, OAUTH_BASIC_KEY: string, APP_CLIENT_ID: string, APP_VERSION: string) => ApolloClient<NormalizedCacheObject>;
/**
 *
 * @todo
 *    DefulatClient의 경우 ApolloClient<T>를 상속받아 쓰는 별도의 apollo-boost 패키지에 포함된 Class
 *    추후 변경이 필요함
 * */
export declare const WebApolloClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: Storage) => ApolloClient<any>;

import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
interface StorageForApp {
    constructor(): void;
    set(key: string, value: string | object): Promise<Boolean>;
    multiSet(itemList: [string, string][]): Promise<Boolean>;
    get(key: string): Promise<Boolean>;
    multiGet(keyList: string[]): Promise<void | [string, string | null][]>;
    remove(key: string): Promise<Boolean>;
    multiRemove(keyList: string[]): Promise<Boolean>;
    clearAll(): Promise<Boolean>;
}
declare type StorageForWeb = {
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
    clear(): void;
};
declare const apolloAppClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: StorageForApp, validateTokenExp: () => Promise<boolean>, OAUTH_BASIC_KEY: string, APP_CLIENT_ID: string, APP_VERSION: string) => ApolloClient<NormalizedCacheObject>;
export default apolloAppClient;
export declare const apolloWebClient: (DOSOO_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: StorageForWeb) => ApolloClient<object>;
export declare const apolloUserWebClient: (USER_API_BASE_URL: string, ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string, storage: StorageForWeb) => ApolloClient<object>;

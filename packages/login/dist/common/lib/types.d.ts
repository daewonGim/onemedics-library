declare type Either<T> = T | Error;
export declare type Result<T> = Either<T>;
export declare function isError<T>(result: Either<T>): result is Error;
export declare function isSuccess<T>(result: Either<T>): result is T;
export declare type Storage = {
    set(key: string, value: any): void;
    get(key: string): any;
    remove(key: string): void;
    clear(): void;
};
export declare type JoinFormData = {
    username: string;
    loginId: string;
    phone: string;
    password: string;
    authNum: string;
    authNumId: string;
    marketingAgreement: boolean;
};
export declare type ApolloClientConfig = {
    DOSOO_API_BASE_URL: string;
    ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string;
    storage: Storage;
    validateTokenExp: () => Promise<boolean>;
    OAUTH_BASIC_KEY: string;
    APP_CLIENT_ID: string;
    APP_VERSION: string;
};
export {};

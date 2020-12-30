/* 에러타입 처리 */
type Either<T> = T | Error;
export type Result<T> = Either<T>;
export function isError<T>(result: Either<T>): result is Error {
  return result instanceof Error;
}

export function isSuccess<T>(result: Either<T>): result is T {
  return !isError(result);
}

export type Storage = {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
};

export type JoinFormData = {
  username: string;
  loginId: string;
  phone: string;
  password: string;
  authNum: string;
  authNumId: string;
  marketingAgreement: boolean;
};

export type ApolloClientConfig = {
  DOSOO_API_BASE_URL: string;
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string;
  storage: Storage;
  validateTokenExp: () => Promise<boolean>;
  OAUTH_BASIC_KEY: string;
  APP_CLIENT_ID: string;
  APP_VERSION: string;
};

export type AxiosClientConfig = {
  OAUTH_BASIC_KEY: string | object;
  GW_API_BASE_URL: string;
  API_REQUEST_TIMEOUT: number;
  APP_CLIENT_ID?: string;
  APP_VERSION?: string;
};

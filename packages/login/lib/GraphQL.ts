import DefaultClient, {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Operation
} from "apollo-boost";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import fetch from "cross-fetch";
import {GraphQLRequest} from 'apollo-link';

declare class StorageForApp{
  constructor();
  set(key: string, value: string | object): Promise<Boolean>;
  multiSet(itemList: [string, string][]): Promise<Boolean>;
  get(key: string): Promise<Boolean>;
  multiGet(keyList: string[]): Promise<void | [string, string | null][]>;
  remove(key: string): Promise<Boolean>;
  multiRemove(keyList: string[]): Promise<Boolean>;
  clearAll(): Promise<Boolean>;
}

type StorageForWeb = {
  set(key: string, value: any): void;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
};

const apolloAppClient = (
  DOSOO_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: StorageForApp,
  validateTokenExp: () => Promise<boolean>,
  OAUTH_BASIC_KEY: string,
  APP_CLIENT_ID: string,
  APP_VERSION: string
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: `${DOSOO_API_BASE_URL}`
  });
  const cache = new InMemoryCache();

  const authLink = setContext(async (_:GraphQLRequest, { headers }) => {
    const token = await storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
    const isTokenValid = await validateTokenExp();

    return {
      headers: {
        ...headers,
        Authorization: isTokenValid ? `Bearer ${token}` : OAUTH_BASIC_KEY,
        ClientId: APP_CLIENT_ID,
        AppVersion: APP_VERSION
      }
    };
  });

  const httpAuthLink = authLink.concat(httpLink);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

      if (networkError) {
        console.warn(`[Network error]: ${networkError}`);
      }
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([httpAuthLink, errorLink]),
    cache
  });
};

export default apolloAppClient;

export const apolloWebClient = (
  DOSOO_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: StorageForWeb
): ApolloClient<object> => {
  return new DefaultClient({
    uri: DOSOO_API_BASE_URL,
    fetch,
    request: (operation: Operation) => {
      const token = storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
      if (token) {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ""
          }
        });
      }
    }
  });
};

export const apolloUserWebClient = (
  USER_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: StorageForWeb
): ApolloClient<object> => {
  return new DefaultClient({
    uri: USER_API_BASE_URL,
    fetch,
    request: (operation: Operation) => {
      const token = storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
      if (token) {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ""
          }
        });
      }
    }
  });
};

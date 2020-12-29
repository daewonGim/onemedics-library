import DefaultClient, {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Operation,
} from "apollo-boost";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import fetch from "cross-fetch";
import { GraphQLRequest } from "apollo-link";
import { Storage } from "./types";
/* App용 apollo client */
export const AppApolloClient = (
  DOSOO_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: Storage,
  validateTokenExp: () => Promise<boolean>,
  OAUTH_BASIC_KEY: string,
  APP_CLIENT_ID: string,
  APP_VERSION: string
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: `${DOSOO_API_BASE_URL}`,
  });
  const cache = new InMemoryCache();

  const authLink = setContext(async (_: GraphQLRequest, { headers }) => {
    const token = await storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
    const isTokenValid = await validateTokenExp();

    return {
      headers: {
        ...headers,
        Authorization: isTokenValid ? `Bearer ${token}` : OAUTH_BASIC_KEY,
        ClientId: APP_CLIENT_ID,
        AppVersion: APP_VERSION,
      },
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
    cache,
  });
};

/* Web용 apollo client */
/**
 *
 * @todo
 *    DefulatClient의 경우 ApolloClient<T>를 상속받아 쓰는 별도의 apollo-boost 패키지에 포함된 Class
 *    추후 변경이 필요함
 * */
export const WebApolloClient = (
  DOSOO_API_BASE_URL: string,
  ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO: string,
  storage: Storage
): ApolloClient<any> => {
  return new DefaultClient({
    uri: DOSOO_API_BASE_URL,
    fetch,
    request: (operation: Operation) => {
      const token = storage.get(ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO);
      if (token) {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        });
      }
    },
  });
};

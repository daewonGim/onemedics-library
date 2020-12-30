import DefaultClient, {
  ApolloClient,
  NormalizedCacheObject,
  Operation,
} from "apollo-boost";

import { setContext } from "apollo-link-context";
import fetch from "cross-fetch";
import { GraphQLRequest } from "apollo-link";
import { ApolloClientConfig, Storage } from "./types";

/* App용 apollo client */
export const AppApolloClient = (
  config: ApolloClientConfig
): ApolloClient<NormalizedCacheObject> => {
  const httpAuthLink = setContext(async (_: GraphQLRequest, { headers }) => {
    const token = await config.storage.get(
      config.ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO
    );
    const isTokenValid = await config.validateTokenExp();
    return {
      headers: {
        ...headers,
        Authorization: isTokenValid
          ? `Bearer ${token}`
          : config.OAUTH_BASIC_KEY,
        ClientId: config.APP_CLIENT_ID,
        AppVersion: config.APP_VERSION,
      },
    };
  });
  return new DefaultClient({
    uri: config.DOSOO_API_BASE_URL,
    headers: httpAuthLink,
  });
};

/* Web용 apollo client */
export const WebApolloClient = (
  config: ApolloClientConfig
): ApolloClient<NormalizedCacheObject> => {
  return new DefaultClient({
    uri: config.DOSOO_API_BASE_URL,
    fetch,
    request: (operation: Operation) => {
      const token = config.storage.get(
        config.ACCESS_TOKEN__OF__STORAGE_ACCESS_INFO
      );
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

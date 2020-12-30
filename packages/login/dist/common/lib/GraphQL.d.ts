import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { ApolloClientConfig } from "./types";
export declare const AppApolloClient: (config: ApolloClientConfig) => ApolloClient<NormalizedCacheObject>;
export declare const WebApolloClient: (config: ApolloClientConfig) => ApolloClient<any>;

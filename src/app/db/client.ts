import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://countries.trevorblades.com",
    }),
});

export function getClient() {
    return client;
}
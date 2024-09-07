'use client'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
  } from "@apollo/client";
import { ReactNode } from "react";


const ApolloClientProvider = ({children}:{children:ReactNode}) => {
    const client = new ApolloClient({
        uri: process.env.OPEN_LOOP_URL,
        headers: {
          authorization:
            "Basic "+process.env.OPEN_LOOP_TOKEN,
          authorizationsource: "API",
        },
        cache: new InMemoryCache(),
      });
      
      client.query({
        query: gql`
          query GetLocations {
            locations {
              id
              name
            }
          }
        `,
      });
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export default ApolloClientProvider
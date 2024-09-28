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
        uri: '/api/graphql-proxy',
        headers: {
          Authorization: `Bearer ${process.env.OPEN_LOOP_TOKEN_PRODUCTION}`,
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
'use client'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";
import { ReactNode } from "react";


const ApolloClientProvider = ({children}:{children:ReactNode}) => {
    const client = new ApolloClient({
        uri: '/api/graphql-proxy',
        cache: new InMemoryCache(),
        credentials: 'include'
      });
      
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}

export default ApolloClientProvider
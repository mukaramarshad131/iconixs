// app/api/graphql-proxy/route.js

import { NextResponse } from 'next/server';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function POST(req) {
  const { query, variables } = await req.json();

  const client = new ApolloClient({
    uri: process.env.OPEN_LOOP_URL_PRODUCTION,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${process.env.OPEN_LOOP_TOKEN_PRODUCTION}`,
      authorizationsource: "API", 
    },
  });

  try {
    const response = await client.query({
      query: gql`${query}`, 
      variables, 
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

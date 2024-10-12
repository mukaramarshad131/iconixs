import { NextRequest, NextResponse } from "next/server";
// import { INTAKE_FORM } from "@/graphql/query";
import prisma from "@/lib/prisma";
import { ApolloClient, InMemoryCache } from "@apollo/client";

  const client = new ApolloClient({
     uri: process.env.OPEN_LOOP_URL,
     cache: new InMemoryCache(),
     headers: {
       Authorization: `Basic ${process.env.OPEN_LOOP_TOKEN}`,
       authorizationsource: "API",
     },
   });

export async function POST(req: NextRequest) {
  const json = await req.json(); // Parse the request body
  // Log the received data for debugging
  console.log('Received Healthie OpenLoop webhook:', json);
  try {
    await prisma.comment.create({
      data: {
        title: "MSK",
        content: JSON.stringify(json)
      },
  })
    return NextResponse.json({ message: 'Login successful', user: json}, { status: 200 });

  } catch (error: any) {
    // Improved error logging
    console.error("Error in login process:", error.message);
    return NextResponse.json({ error: `Server Error - ${error.message}` }, { status: 500 });
  }
}

export async function GET() {
  const ism = await prisma.comment.findMany();
  const data = { message: "Hello from API Route!" };
  return new Response(JSON.stringify(ism), {
    headers: { 'Content-Type': 'application/json' },
  });
}
import { NextRequest, NextResponse } from "next/server";
// import { INTAKE_FORM } from "@/graphql/query";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CREATE_PATIENT } from "@/graphql/query";

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
  const { data } = await client.mutate({
    mutation: CREATE_PATIENT,
    variables: { input: {
      first_name: "Muhammad",
      last_name: "Ismail",
      email: "ism@gmail.com",
      skipped_email: false,
      dont_send_welcome: true,
      dietitian_id: process.env.DIETITIAN_ID,
      phone_number: "5475899",
    }},
  });
  // Log the received data for debugging
  console.log('Received Healthie OpenLoop webhook:', json);
  try {
  
    return NextResponse.json({ message: 'Login successful', user: json}, { status: 200 });

  } catch (error: any) {
    // Improved error logging
    console.error("Error in login process:", error.message);
    return NextResponse.json({ error: `Server Error - ${error.message}` }, { status: 500 });
  }
}

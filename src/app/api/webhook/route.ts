import { NextRequest, NextResponse } from "next/server";
// import { INTAKE_FORM } from "@/graphql/query";
import {  TEST_DATA, APPOINTMENT_QUERY } from '@/graphql/query';
import prisma from "@/lib/prisma";
import { sendMail } from '@/lib/send-mail';
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
    if(json.event_type === "appointment.created") {
      const { data:userappoint } = await client.query({
        query: APPOINTMENT_QUERY,
        variables: {
          id: json.resource_id
        },
      })
      const userEmail = userappoint?.appointment?.user?.email;
      if(userEmail) {
        const mailText = `<p>Hi <strong>Monthly Subscription</strong></p>
        <p><strong>Iconix Support Team</strong></p>`;
      const response4 = await sendMail({
        sendTo: userEmail,
        subject: 'New Subscription for Iconix',
        text: ``,
        html: mailText
      });
      }
    }
    if(json.event_type === "form_answer_group.created") {
      const { data } = await client.query({
        query: TEST_DATA,
        variables: {
          id: json.resource_id
        },
      })
      const userInfo = data?.formAnswerGroup?.user;
      if(userInfo?.email) {
        await prisma.formAnswerGroup.create({
          data: {
            content: JSON.stringify(data),
            userId: userInfo.id,
            email: userInfo.email,  
          },
        })
      }
    }
    await prisma.comment.create({
      data: {
        title: "MSK",
        content: JSON.stringify(json)
      },
    })
    return NextResponse.json({ message: 'Successful', user: json}, { status: 200 });

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
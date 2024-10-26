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
    if(json.type === "order_shipped") {
      await prisma.client.update({
        where: { patientID: json.patientID },
        data: {
          status: 'FOLLOW_UP_PENDING',
        },
      });
      const updatedOrder = await prisma.order.update({
        where: {
          orderNumber: json.orderNumber,
        },
        data: {
          status: 'shipped',
          shippedDate: new Date(json.shippedDate).toISOString(),
          trackNumber: json.trackNumber,
          orderDate: new Date(json.order_date).toISOString()
        }
      });
  // Create a follow-up questionnaire scheduled for one month after shippedDate
  const followUpQuestionnaire = await prisma.followUpQuestionnaire.create({
    data: {
      orderId: updatedOrder.id,
      treatmentCycleId: updatedOrder.treatmentCycleId,
      status: 'PENDING',
      scheduledDate: new Date(new Date(json.shippedDate).setMonth(new Date(json.shippedDate).getMonth() + 1)),
    },
  });
// Schedule an annual follow-up (12 months)
// const followUpAnnually = await prisma.followUpQuestionnaire.create({
//   data: {
//     orderId: updatedOrder.id,
//     treatmentCycleId: order.treatmentCycleId,
//     status: 'PENDING',
//     dueDate: new Date(new Date(updatedOrder.shippedDate).setFullYear(new Date(updatedOrder.shippedDate).getFullYear() + 1)),  // Set due date to one year after shipped date
//   },
// });
      await prisma.treatmentCycle.update({
        where: {
          id: updatedOrder.treatmentCycleId,
        },
        data: {
          status: 'COMPLETED'
        }
      });
    }
    if(json.type === "order_confirmation") {
      const userExist = await prisma.client.findUnique({
        where: { patientID: json.patientID },
      });
      if (!userExist) {
        return NextResponse.json({ message: `No Client found.` }, { status: 404 });
      }
      const newCycle = await prisma.treatmentCycle.create({
        data: {
          clientId: userExist.id,
          status: 'ACTIVE'
        }
      });
      const newOrder = await prisma.order.create({
        data: {
          orderNumber: json.orderNumber,
          shippingAddress: json.shipping_address,
          medicationInstructions: json.medication_instructions,
          pharmacy: json.pharmacy,
          status: "pending",
          treatmentCycle: {
            connect: { id: newCycle.id }
          }
        }
      });
      await prisma.client.update({
        where: { patientID: json.patientID },
        data: {
          currentCycle: {
            connect: { id: newCycle.id }
          }
        },
      });
    }
    if(json.event_type === "appointment.created") {
      const { data:userappoint } = await client.query({
        query: APPOINTMENT_QUERY,
        variables: {
          id: json.resource_id
        },
      })
      const userInfo = userappoint?.appointment?.user;
      if(userInfo?.email) {
        await prisma.client.update({
          where: { patientID: userInfo.id },
          data: {
            status: 'SCHEDULED_CONSULT',
          },
        });
        const mailText = `<p>Hi <strong>Monthly Subscription</strong></p>
        <p><strong>Iconix Support Team</strong></p>`;
      const response4 = await sendMail({
        sendTo: userInfo.email,
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
        await prisma.client.update({
          where: { patientID: userInfo.id },
          data: {
            status: 'PAID_INITIAL_CONSULT',
          },
        });
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
import { NextRequest, NextResponse } from "next/server";
import { INTAKE_FORM } from "@/graphql/query";
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
  const intakeFormPayload = {
    input: {
      custom_module_form_id: "1524146", // Form id for staging
      form_answers: [
        {
          custom_module_id: "14669225",
          label: "Patient Info",
        },
        {
          custom_module_id: "13579507",
          label: "Intake",
        },
        {
          custom_module_id: "13579508",
          label: "Hormone Type",
          answer: "TRT", // HTML format for the intake
        },
        {
          custom_module_id: "13579509",
          label: "Patient Intake",
          user_id: 1746532,
          answer: JSON.stringify(json), // HTML format for the intake
        },

      ],
      name: "SP - Hormone SOAP Intake",
      finished: true,
      user_id: 1746532, // Patiend ID from CreatePatient mutation response
    },
  }

  try {

    const { data } = await client.query({
     query: INTAKE_FORM,
     variables: { ...intakeFormPayload  }, // Pass the email as a variable
   });
  
    return NextResponse.json({ message: 'Login successful', user: data}, { status: 200 });

  } catch (error: any) {
    // Improved error logging
    console.error("Error in login process:", error.message);
    return NextResponse.json({ error: `Server Error - ${error.message}` }, { status: 500 });
  }
}

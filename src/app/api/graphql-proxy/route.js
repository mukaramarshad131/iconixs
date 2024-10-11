import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming request
    const { query, variables } = await req.json();
  
    const response = await fetch(process.env.OPEN_LOOP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.OPEN_LOOP_TOKEN}`,
        authorizationsource: "API",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // Handle the response

    const { data, errors } = await response.json();

    if (errors) {
      return NextResponse.json({ error: errors }, { status: 400 });
    }
    return NextResponse.json({data});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

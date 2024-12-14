import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.CHARGEBEE_API_URL!;
  const username = process.env.CHARGEBEE_API_USERNAME!;
  const password = process.env.CHARGEBEE_API_PASSWORD!;

  try {
    const response = await fetch(url, {
      method: 'GET', // Adjust if the API requires POST/PUT/DELETE
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data from Chargebee API' }, { status: 500 });
  }
}

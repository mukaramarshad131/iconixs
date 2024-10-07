import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { SEARCH_PATIENT, USER_QUERY } from "@/graphql/query";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

  const client = new ApolloClient({
     uri: process.env.OPEN_LOOP_URL_PRODUCTION,
     cache: new InMemoryCache(),
     headers: {
       Authorization: `Basic ${process.env.OPEN_LOOP_TOKEN_PRODUCTION}`,
       authorizationsource: "API",
     },
   });
export async function POST(req: NextRequest) {
  const json = await req.json(); // Parse the request body
  const validatedData = userSchema.parse(json);
  const { email, password } = validatedData;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return NextResponse.json({ message: `No user found.` }, { status: 404 });
    }

    // Check if the password matches
    const isPasswordMatched = await bcrypt.compare(password, userExist?.password || '');
    if (!isPasswordMatched) {
      return NextResponse.json({ message: `Wrong Password.` }, { status: 422 });
    }

    // Generate JWT token with the userId
    const token = jwt.sign({ userId: userExist.id }, process.env.JWT_SECRET || '', {
      expiresIn: '2d', // Token is valid for 2 days
    });

    const { data:user } = await client.query({
     query: USER_QUERY,
     variables: { id: userExist.openLoopId }, // Pass the email as a variable
   });
  
    const response = NextResponse.json({ message: 'Login successful', user:user.user});

    // Set the token as an HTTP-only cookie
    response.cookies.set('jwt', token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
      path: '/',
      sameSite: 'strict',
      secure: false, // Use secure cookie in production
    });

    return response;

  } catch (error: any) {
    // Improved error logging
    console.error("Error in login process:", error.message);
    return NextResponse.json({ error: `Server Error - ${error.message}` }, { status: 500 });
  }
}

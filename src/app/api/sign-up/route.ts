import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from 'bcrypt'
// import { client } from "../login/route";
import { CREATE_PATIENT, UPDATE_PATIENT, UPDATE_WEIGHT } from "@/graphql/query";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import dayjs from "dayjs";

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
export async function POST(req:NextRequest){
  const json = await req.json(); // This is important to parse the request body
  const { email, password } = json;
   userSchema.parse({ email, password});
   try {
    const hash = await bcrypt.hash(password, 10);
    const alreadyExistEmail = await prisma.user.findUnique({
      where: { email},
    });
    if (alreadyExistEmail) {
      return NextResponse.json({message:`Email is already exist.`},{status:422})
    }
    const { data } = await client.mutate({
      mutation: CREATE_PATIENT,
      variables: { input: {
        first_name: json.first_name,
        last_name: json.last_name,
        email,
        skipped_email: false,
        dont_send_welcome: true,
        dietitian_id: "5171717",
        phone_number: json.phone,
      }},
    });
    const {messages, user} = data.createClient

    console.log(messages, user)
    if(messages?.length > 0){

      return NextResponse.json({ message:messages[0].message }, {status:422});
    }
      await client.mutate({
      mutation: UPDATE_PATIENT,
      variables: { input:{
              id: user.id,
              dietitian_id: "5171717",
              dob: dayjs(json.dob).format("DD/MM/YYYY"),
              height: json.height,
              phone_number: json.phone_number,
              additional_record_identifier: "",
              gender: json.gender,
              location: {
                country: json.country,
                state: json.state,
                city: json.city,
                zip: json.zip,
                line1: json.line1,
              },
            }}, 
    });
      await client.mutate({
      mutation: UPDATE_WEIGHT,
      variables: {category: "Weight",
            type: "MetricEntry",
            metric_stat: json.metric_stat,
            user_id: user.id,
            created_at: dayjs().format("DD/MM/YYYY"),}, 
    });
    const newUser = await prisma.user.create({
        data: {
          email,
          password:hash, // Remember to hash passwords!
          openLoopId:user.id
        },
      });
          const {password:hashedPassword, ...rest} = newUser
      return NextResponse.json({ user:rest, message:'User Created successfully.'}, {status:200});
   } catch (error:any) {
    if (error instanceof z.ZodError) {
        // If the error is a ZodError, return the validation error messages
        return NextResponse.json({ errors: error.errors }, {status:422});
      }
        return NextResponse.json({error:`Server Error -${error.message}`},{status:500})
   }
}
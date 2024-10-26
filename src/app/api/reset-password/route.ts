import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from 'bcrypt'
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { sendMail } from '@/lib/send-mail';

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
  });
  const client = new ApolloClient({
    uri: process.env.OPEN_LOOP_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Basic ${process.env.OPEN_LOOP_TOKEN}`,
      authorizationsource: "API",
    },
  });
export async function POST(req:NextRequest){
  const json = await req.json(); // This is important to parse the request body
  const { email, password } = json;
   userSchema.parse({ email});
   try {
    const hash = await bcrypt.hash(password, 10);
    const alreadyExistEmail = await prisma.client.findUnique({
      where: { email},
    });
    if (alreadyExistEmail) {
      const mailText = `<p>Hi <strong>User</strong></p>
      <p>Your password has been reset. You can now use the following password to log in to your account:</p>
      <p>New Password: <b>${password}<b></p>
      <p>For security reasons, we recommend logging in and changing your password immediately to something more personal and secure. You can do this by visiting your account settings.</p>
      <p>If you didn’t request this password reset, please contact us immediately.</p>
      <p><strong>Thank you,</strong></p>
      <p><strong>Iconix Support Team</strong></p>`;
    const response4 = await sendMail({
      sendTo: email,
      subject: 'Your New Password for Iconix',
      text: ``,
      html: mailText
    });
    if (response4?.messageId) {
      const updateUser = await prisma.client.update({
        where: {
          email
        },
        data: {
          password: hash
        },
      })
      return NextResponse.json({user: updateUser, message:`Please Check your email for your new password. If not found, check your spam folder.`},{status:200}) 
    }
      return NextResponse.json({user: alreadyExistEmail, message:`Email exist.`},{status:200})
    }
      return NextResponse.json({ message:'Email not exist.'}, {status:200});
   } catch (error:any) {
    if (error instanceof z.ZodError) {
        // If the error is a ZodError, return the validation error messages
        return NextResponse.json({ errors: error.errors }, {status:422});
      }
        return NextResponse.json({error:`Server Error -${error.message}`},{status:500})
   }
}
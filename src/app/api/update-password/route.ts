import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from 'bcrypt'

const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
  });

export async function POST(req:NextRequest) {
  const json = await req.json(); // This is important to parse the request body
  const { email, password } = json;
   userSchema.parse({ email});
   try {
    const hash = await bcrypt.hash(password, 10);
    const updateUser = await prisma.client.update({
      where: {
        email
      },
      data: {
        password: hash
      },
    })
    return NextResponse.json({ message:`Password updated Successfully`},{status:200}) 
   } catch (error:any) {
    if (error instanceof z.ZodError) {
        // If the error is a ZodError, return the validation error messages
        return NextResponse.json({ errors: error.errors }, {status:422});
      }
        return NextResponse.json({error:`Server Error -${error.message}`},{status:500})
   }
}
'use server';
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from 'bcrypt'


export async function sendPassword({
  password,
  email,
}: {
  password: string;
  email: string;
}) {
  
  try {
    const hash = await bcrypt.hash(password, 10);
    const updateUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        password: hash
      },
    })
    return {...updateUser, password};
  } catch (error) {
    console.error('Something Went Wrong', error);
    return error;
  }
}
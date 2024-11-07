'use server';
import prisma from "@/lib/prisma";

export async function getFormAnswersGroups({
  email
}: {
  email: string;
}) {
  
  try {
    const response = await prisma.client.findFirst({
      where: {
        email
      }
    })
    return response;
  } catch (error) {
    console.error('Something Went Wrong', error);
    return error;
  }
}
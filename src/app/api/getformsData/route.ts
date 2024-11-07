import prisma from "@/lib/prisma";

export async function GET() {
  const ism = await prisma.formAnswerGroup.findMany();
  const data = { message: "Hello from API Route!" };
  return new Response(JSON.stringify(ism), {
    headers: { 'Content-Type': 'application/json' },
  });
}
import prisma from "@/lib/prisma";
const testData = {
  event_type: "subscription_created",
  content: {
    customer: {
      email: "",
      id: ""
    }
  }

}

export async function GET() {
  const ism = await prisma.comment.findMany();
  const data = { message: "Hello from API Route!" };
  return new Response(JSON.stringify(ism), {
    headers: { 'Content-Type': 'application/json' },
  });
}
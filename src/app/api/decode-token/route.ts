import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the shape of your JWT payload
interface CustomJwtPayload extends JwtPayload {
    id: string;
    name: string;
    email: string;
    impersonatedBy: string;
  }

export async function POST(request: any) {
  const { token } = await request.json();

  const secret = process.env.JWT_SECRET || "FOgOVWLyhQVcVvqLBBTdtGbCPS9kG9S/uQvWxHzAz8g="; // JWT secret

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Token is required" }),
      { status: 400 }
    );
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secret);
    const { id, name, email, impersonatedBy } = decoded as CustomJwtPayload;
    // Simulate login logic
    const user = {
        id,
        name,
        email,
        impersonatedBy,
      };

    return new Response(
      JSON.stringify({ success: true, user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 401 }
    );
  }
}

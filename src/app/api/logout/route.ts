import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message: 'Logout successfully'});

        // Set the token as an HTTP-only cookie
        response.cookies.set('jwt', '', {
            maxAge: 0, // Expire immediately
            httpOnly: true, // Ensure the cookie is only accessible via HTTP(S)
            path: '/', // Make sure the cookie is cleared across the entire app
            sameSite: 'strict', // To ensure the cookie isn't sent with cross-site requests
            secure: true, // Secure in production
          });
          
        return response
    } catch (error:any) {
        return NextResponse.json({ error: `Server Error - ${error.message}` }, { status: 500 });
    }
}
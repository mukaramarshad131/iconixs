import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message: 'Logout successfully'});

        // Set the token as an HTTP-only cookie
        response.cookies.set('jwt', '', {
            maxAge: -1, // Expire immediately
            path: '/', // Make sure the cookie is cleared across the entire app
          });
          
        return response
    } catch (error:any) {
        return NextResponse.json({ error: `Server Error - ${error.message}` }, { status: 500 });
    }
}
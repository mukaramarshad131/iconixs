import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  let permissions = request.cookies.get('permissions')?.value;
  if (permissions) {
    permissions = JSON.parse(decodeURIComponent(permissions));
  }

  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  // Redirect to home if no token is available, for any /dashboard request or other protected paths
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect logged-in users from home to /dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check if user has access to /dashboard and its subroutes
  if (pathname.startsWith("/dashboard")) {
    // Only redirect if permissions are missing or don’t allow this route
    if (permissions && !permissions.includes(pathname)) {
      // Prevent redirect loop by checking if user is already on the main dashboard page
      if (pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  // Default case: allow access to all other paths
  return NextResponse.next();
}

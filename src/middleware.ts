import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  let permissions = request.cookies.get('permissions')?.value;
  if (permissions) {
    permissions = JSON.parse(decodeURIComponent(permissions));
  }

  const { pathname } = request.nextUrl;
  // Allow access to the create-invoice route without any checks
  if (pathname.includes("/create-invoice")) {
    return NextResponse.next();
  }

  // If the user is not logged in and tries to access dashboard routes, redirect to home
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // Prevent redirect loop if the request is already heading to home
      if (pathname === "/") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If the user is logged in but lacks necessary permissions, redirect to dashboard home
    if (token && !permissions?.includes(pathname)) {
      // Prevent redirect loop if already on /dashboard
      if (pathname === "/dashboard") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow access if token and permissions are valid
    return NextResponse.next();
  }

  // Redirect logged-in users trying to access the home page to /dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Default case: allow access to all other paths
  return NextResponse.next();
}

import {NextResponse, NextRequest} from "next/server";

export  async function middleware(request: NextRequest) {
    const token = request.cookies.get('jwt')?.value;
    let permissions = request.cookies.get('permissions')?.value;
  
    if (permissions) {
      permissions = JSON.parse(decodeURIComponent(permissions));
    }
  if(request.nextUrl.pathname?.includes("/create-invoice")){
    return NextResponse.next();
  }
  if (request.nextUrl.pathname?.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (token&& !permissions?.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }
  if(token &&request.nextUrl.pathname === "/"){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
   return NextResponse.next();
}



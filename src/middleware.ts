import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const user = "loggedIn";
  console.log(request);

  if (!user) {
    const loginUrl = new URL("/authentication/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/authentication/otp"],
};

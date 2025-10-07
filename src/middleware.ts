import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // const token =
  //   typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // console.log(token);
  const token = "hhh";
  if (!token) {
    const loginUrl = new URL("/authentication/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/authentication/otp", "/create_itenary"],
};

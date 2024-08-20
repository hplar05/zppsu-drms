import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log(request.nextUrl.pathname)
        console.log(request.nextauth.token)

        const { pathname } = request.nextUrl;
        const role = request.nextauth.token?.role;

        // Redirect if accessing /admin pages without admin role
        if (pathname.startsWith("/admin/dashboard") && role !== "ADMIN") {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        if (pathname.startsWith("/admin/request-table") && role !== "ADMIN") {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
        if (pathname.startsWith("/admin/create-request") && role !== "ADMIN") {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }

        // Redirect if accessing /user/dashboard without admin or student role
        if (pathname.startsWith("/user/dashboard") && role !== "ADMIN" && role !== "STUDENT") {
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"]
}

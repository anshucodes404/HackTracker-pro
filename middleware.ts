import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest){
    const token = req.cookies.get("Token") || req.headers.get("Authorization")?.split(" ")[1]

    if(!token){
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/hackathons/:path"]
}
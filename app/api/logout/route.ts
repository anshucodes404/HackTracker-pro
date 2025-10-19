import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/utils/ApiResponse";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){

    try {
        await dbConnect();
        (await cookies()).set("Token", "", {
            expires: new Date(0) //this will tell that the cookie has expired at the start of UNIX time i.e. 1 january 1970
        })
        return NextResponse.json(
            new ApiResponse(true, "Logged Out successfully"),
            {status: 200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            new ApiResponse(false, "Logout failed", "", error),
            {status: 500}
        )
    }

}
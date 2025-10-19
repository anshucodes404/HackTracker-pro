import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";

export async function GET(req: NextRequest){
    try {
        await dbConnect()
        const {_id} = await(await jwtDecode(req)).json().then(res => res.data)

        if(!_id){
            return NextResponse.json(
                new ApiResponse(false, "User is not logged in"),
                {status: 302}
            )
        }

        const user = await User.findById(_id)

        if(!user){
            return NextResponse.json(
                new ApiResponse(false, "User not fetched"),
                {status: 500}
            )
        }

        return NextResponse.json(
            new ApiResponse(true, "User fetched succeddfully", user),
            {status: 200}
        )

    } catch (error) {
         return NextResponse.json(
                new ApiResponse(false, "Something went wrong while fetching the user", "", error),
                {status: 500}
            )
    }
}
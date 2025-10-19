import dbConnect from "@/lib/dbConnect";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params:Promise< {_id: string}>}){
    try {
        const {_id} = await params
        console.log("Request received")
        await dbConnect()
        
        const hackathon = await Hackathon.findById(_id)
        // console.log(params)
        console.log(_id)
        if(!hackathon){
            console.error("No hackathon found")
            return NextResponse.json(
                new ApiResponse(false, "No Hackathon found corresponding this ID"),
                {status: 500}
            )
        }

        return NextResponse.json(
            new ApiResponse(true, "Hackathon corresponding the ID found", hackathon)
        )

    } catch (error) {
        console.error("Error occured while searching the hackathon")
        return NextResponse.json(
            new ApiResponse(false, "Something went wrong", "", error),
            {status: 500}
        )
    }
}
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "@/lib/jwtDecode"
import { ApiResponse } from "@/utils/ApiResponse";
import { Team } from "@/models/team.model";

export async function POST(req: NextRequest, {params}: {params: {teamId: string}}){
    try {
        await dbConnect()
        const {data} = await (await jwtDecode(req)).json()

        console.log(data)
        if(!data){
            console.error("Decode failed")
            return NextResponse.json(
                new ApiResponse(false, "Token expired or missing"),
                {status: 500}
            )
        }

        if(!params.teamId){
            console.error("Team ID is missing")
            return NextResponse.json(
                new ApiResponse(false, "Team ID is missing"),
                {status: 400}
            )
        }

        const member = {
            userId: data._id,
            name: data.name,
            collegeEmail: data.collegeEmail,
            joinedAt: Date.now
        }

        const team = await Team.findByIdAndUpdate(params.teamId, 
            {
                $push: {members: member}
            },
            {new: true}
        )

        console.log(team)

        if(!team){
            console.error("Invitation accept failed")
            return NextResponse.json(
                new ApiResponse(false, "Invitation accept failed"),
                {status: 500}
            )
        }

        return NextResponse.json(
                new ApiResponse(true, "Invitation accepted"),
                {status: 201}
            )


    } catch (error) {
        return NextResponse.json(
                new ApiResponse(false, "Invitation accept failed", "", error),
                {status: 500}
            )
    }
}
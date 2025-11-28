import dbConnect from "@/lib/dbConnect";
import jwtDecode from "@/lib/jwtDecode";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("Hackathon call recieved");
    await dbConnect();
    const { _id } = await (await jwtDecode()).json().then(res => res.data)
    const hackathons = await Hackathon.find({organiser: _id}).select(
      "-description -criteria -organiserEmail -socialLink -webSiteLink -createdAt -updatedAt -__v"
    );
    console.log(hackathons);
    return NextResponse.json(
      new ApiResponse(true, "Hackathon call recieved", hackathons),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        new ApiResponse(false, "Something went wrong while fetching hosted hackathons", "", error),
        {status: 500}
    )
  }
}

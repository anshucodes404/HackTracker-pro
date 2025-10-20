import dbConnect from "@/lib/dbConnect";
import { Team } from "@/models/team.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    const { _id } = await params;
    await dbConnect();

    const teams = await Team.find({ hackathonId: _id }).select(
      "-__v -createdAt -updatedAt"
    );

    return NextResponse.json(new ApiResponse(true, "Teams fetched", teams), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      new ApiResponse(false, "Something went wrong", "", error),
      { status: 500 }
    );
  }
}

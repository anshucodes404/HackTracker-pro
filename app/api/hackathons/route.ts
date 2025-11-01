import dbConnect from "@/lib/dbConnect";
import { Hackathon } from "@/models/hackathon.model";
import { ApiResponse } from "@/utils/ApiResponse";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const search = searchParams.get("search");
		const mode = searchParams.get("mode");
		const status = searchParams.get("status")?.split(",");
		const tags = searchParams.get("tags")?.split(",");

		const query: any = {};

		if (search) {
			query.hackathonName = { $regex: search, $options: "i" };
		}
		if (mode) {
			query.mode = mode;
		}

		if (status && status.length > 0) {
			query.status = { $in: status };
		} else {
			query.status = { $ne: "draft" };
		}

		if (tags && tags.length > 0) {
			query.tags = { $in: tags };
		}

		console.log("Hackathon call recieved");
		await dbConnect();
		const hackathons = await Hackathon.find(query)
			.sort({ createdAt: -1 })
			.select(
				"-description -criteria -organiserEmail -socialLink -webSiteLink -createdAt -updatedAt -__v",
			);
		console.log(hackathons);
		return NextResponse.json(
			new ApiResponse(true, "Hackathon call recieved", hackathons),
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error fetching the hackathons: ", error);
		return NextResponse.json(
			new ApiResponse(false, "Error fetching the Hackathons"),
		);
	}
}

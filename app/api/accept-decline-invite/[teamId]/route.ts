import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "@/lib/jwtDecode";
import { ApiResponse } from "@/utils/ApiResponse";
import { Team } from "@/models/team.model";
import { sendDeclineEmail } from "@/Emails/sendDeclineEmail";
// import { User } from "@/models/user.model";
import { Hackathon } from "@/models/hackathon.model";
import { sendAcceptEmail } from "@/Emails/sendAcceptEmail";
import { Invite } from "@/models/invite.model";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ teamId: string }> },
) {
	try {
		console.log("Request");
		const { teamId } = await params;
		const { action, InviteId } = await req.json();
		await dbConnect();
		console.log("Team Id: ", teamId);
		const { _id, name, collegeEmail } = await (await jwtDecode(req))
			.json()
			.then((res) => res.data);

		if (!teamId) {
			console.error("Team ID is missing");
			return NextResponse.json(new ApiResponse(false, "Team ID is missing"), {
				status: 400,
			});
		}

		if (action === "accept") {
			const member = {
				userId: _id,
				name: name,
				collegeEmail: collegeEmail,
			};

			const team = await Team.findByIdAndUpdate(
				teamId,
				{
					$push: { members: member },
				},
				{ new: true },
			);
			if (!team) {
				console.error("Invitation accept failed");
				return NextResponse.json(
					new ApiResponse(false, "Invitation accept failed"),
					{ status: 500 },
				);
			}
			// console.log(team)

			await Invite.findByIdAndUpdate(InviteId, {
				$set: { status: "accepted" },
			});

			const leader = team.members.filter(
				(member: { role: string }) => member.role === "leader",
			)[0];

			await sendAcceptEmail({
				teamLeaderEmail: leader.collegeEmail,
				teamLeaderName: leader.name,
				accepterName: name,
				accepterEmail: collegeEmail,
				hackathonName: team.hackathonName,
				teamName: team.name,
			});

			return NextResponse.json(new ApiResponse(true, "Invitation accepted"), {
				status: 201,
			});
		} else {
			const team = await Team.findById(teamId);
			if (!team) {
				return NextResponse.json(new ApiResponse(false, "Team not found"), {
					status: 404,
				});
			}

			const leader = team.members.filter(
				(member: { role: string }) => member.role === "leader",
			)[0];

			const hackathon = await Hackathon.findById(team.hackathonId);
			if (!hackathon) {
				return NextResponse.json(
					new ApiResponse(false, "Hackathon not found"),
					{ status: 404 },
				);
			}
			// console.log(team)

			await Invite.findByIdAndUpdate(InviteId, {
				$set: { status: "declined" },
			});

			const res = await sendDeclineEmail({
				teamLeaderName: leader.name,
				teamLeaderEmail: leader.collegeEmail,
				declinerName: name,
				declinerEmail: collegeEmail,
				hackathonName: hackathon.hackathonName,
				teamName: team.name,
			});

			if (!res.success) {
				console.error("Email sending failed");
				return NextResponse.json(
					new ApiResponse(false, "Email Sending failed", "", res.error),
					{ status: 500 },
				);
			}

			return NextResponse.json(
				new ApiResponse(true, "Email Sent Successfully"),
				{ status: 201 },
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			new ApiResponse(false, "Invitation operation failed", "", error),
			{ status: 500 },
		);
	}
}

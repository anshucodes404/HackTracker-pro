import { NextResponse } from "next/server";
import { sendInviteEmail } from "@/lib/sendInviteEmail";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(req: Request) {
  const { email, teamName, inviteLink } = await req.json();

  if (!email || !teamName || !inviteLink) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await sendInviteEmail(email, teamName, inviteLink);

  return NextResponse.json(new ApiResponse(true, "Email sent successfully"), {status: 200});
}
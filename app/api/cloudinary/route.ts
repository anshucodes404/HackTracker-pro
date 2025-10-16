import { NextResponse } from "next/server";
import crypto from "crypto";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new ApiError(500, "Cloudinary envs are missing");
}

export async function GET() {
  //TODO: Verification of user

  if(!API_SECRET){
    throw new ApiError(500, "Cloudinary API_SECRET is undefined")
  }

  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign: Record<string, unknown> = {
    folder: "hackathons",
    timestamp,
  };

  const toSign = Object.keys(paramsToSign).sort().map(k => `${k}=${paramsToSign[k]}`).join("&")

  const signature = crypto.createHmac("sha1", API_SECRET).update(toSign).digest("hex")
  console.log(signature)
  return NextResponse.json(
    new ApiResponse(true, "Signature key created", {cloudName: CLOUD_NAME, apiKey: API_KEY, signature, timestamp, folder: paramsToSign.folder}), {status: 200}
  )
}

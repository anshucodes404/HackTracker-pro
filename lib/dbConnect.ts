import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type connectionObject = {
  isConnested?: number;
};

const connection: connectionObject = {};

export default async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("Mongo DB connection string is Invalid");
    return NextResponse.json(
      new ApiResponse(false, "Connection String not valid"),
      { status: 500 }
    );
  }

  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);

    console.log(connectionInstance);
    connection.isConnested = connectionInstance.connections?.[0].readyState;
    console.log("Connection To DB successfull");
    
    return NextResponse.json(
      new ApiResponse(true, "Connection To DB successfull"),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error while connecting to DB: ", error);
    throw new ApiError(500, "Error while connecting to DB: ", error);
  } finally {
    console.log("DB process complete!!!");
  }
}

import mongoose, { Schema, Document } from "mongoose";

export interface IOTP extends Document {
  collegeEmail: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOTP>({
  collegeEmail: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP =
  mongoose.models.OTP || mongoose.model<IOTP>("OTP", otpSchema);

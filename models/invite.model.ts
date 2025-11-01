import mongoose, { Document, Schema } from "mongoose";

export interface IInvite extends Document {
  teamId: mongoose.Types.ObjectId;
  hackathonName: string;
  rules: string[];
  tagline: string;
  teamName: string;
  inviterName: string;
  inviterEmail: string;
  status: "pending" | "accepted" | "declined";
  expiresAt: Date;
  createdAt: Date;
}

const inviteSchema = new Schema<IInvite>({
  teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  hackathonName: {type: String, required: true},
  tagline: {type: String, required: true},
  teamName: {type: String, required: true},
  inviterName: {type: String, required: true},
  inviterEmail: { type: String, required: true},
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  rules: [String],
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

inviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Invite = mongoose.models.Invite || mongoose.model<IInvite>("Invite", inviteSchema);

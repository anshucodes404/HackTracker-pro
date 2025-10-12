import mongoose, { Document, Schema } from "mongoose";

export interface IInvite extends Document {
  team: mongoose.Types.ObjectId;
  email: string;
  token: string;
  status: "pending" | "accepted" | "declined";
  expiresAt: Date;
  createdAt: Date;
}

const inviteSchema = new Schema<IInvite>({
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

inviteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Invite = mongoose.models.Invite || mongoose.model<IInvite>("Invite", inviteSchema);

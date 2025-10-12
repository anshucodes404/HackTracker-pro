import mongoose, { Schema, Document } from "mongoose";

export interface IHackathon extends Document {
  title: string;
  description: string;
  paricipants?: mongoose.Types.ObjectId[];
  rules?: string;
  organiser: mongoose.Types.ObjectId;
  startAt: Date;
  endAt: Date;
  minTeamSize: number;
  maxTeamSize: number;
  tags?: string[];
  status: "draft" | "published" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const hackathonSchema = new Schema<IHackathon>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    paricipants: {
      type: [Schema.Types.ObjectId],
      ref: "Team",
    },
    rules: {
      type: String,
    },
    organiser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    minTeamSize: {
      type: Number,
    },
    maxTeamSize: {
      type: Number,
    },
    tags: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },
  },
  { timestamps: true }
);


export const Hackathon = mongoose.models.Hackathon || mongoose.model<IHackathon>("Hackathon", hackathonSchema)
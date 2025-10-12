import mongoose, { Document, Schema } from "mongoose";

export interface ISubmission extends Document {
  hackathon: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  submitter: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  repoUrl?: string;
  demoUrl?: string;
  isFinal: boolean;
  submittedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  hackathon: { type: Schema.Types.ObjectId, ref: "Hackathon", required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  submitter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  repoUrl: { type: String },
  demoUrl: { type: String },
  isFinal: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
});

export const Submission = mongoose.models.Submission || mongoose.model<ISubmission>("Submission", submissionSchema);

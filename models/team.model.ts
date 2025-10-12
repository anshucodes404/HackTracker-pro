import mongoose, {Schema, Document} from "mongoose";

export interface ITeamMember {
    userId: Schema.Types.ObjectId;
    role: string;
    name: string;
    joinedAt: Date;
}

export interface ITeam extends Document{
    name: string;
    members: ITeamMember[];
    hackathonId: Schema.Types.ObjectId;
    leader: Schema.Types.ObjectId;
    status: "Forming" | "Registered" | "Disqualified";
    createdAt: Date;
    updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        default: "member",
    },
    joinedAt: {
        type: Date,
        default: Date.now()
    }
})

export const teamSchema = new Schema<ITeam>({
    name: {
        type: String,
        required: true,
    },
    hackathonId: {
        type: Schema.Types.ObjectId,
        ref: "Hackathon",
        required: true
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    members: [teamMemberSchema],
    status:{
        type: String ,
        enum: ["Forming", "Registered", "Disqualified"],
        default: "Forming"
    }
}, {timestamps: true})

export const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", teamSchema)
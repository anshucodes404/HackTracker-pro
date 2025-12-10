"use client";

import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { ParticipatedHackathonCardProps } from "@/types/types";

export default function MyHacksCard({ data }: ParticipatedHackathonCardProps) {
	const hackathon = data;

	return (
		<div className="relative h-64 rounded-2xl">
			<div className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer h-full transition transform duration-300 ease-out hover:scale-105 hover:-translate-y-1 relative">
				<div className="absolute inset-0">
					<Image
						src={hackathon.bannerImage || "/placeholder.jpg"}
						alt={hackathon.hackathonName}
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-opacity duration-300" />
				</div>

				<div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
					<h2 className="text-xl font-bold">{hackathon.hackathonName}</h2>
					<p className="text-sm opacity-80">Team: {hackathon.teamName}</p>

					<div className="flex items-center gap-2 text-sm opacity-90 mt-1">
						<Calendar size={16} />
						{new Date(hackathon.startAt).toDateString()}
					</div>

					<span className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-white/20">
						{hackathon.status}
					</span>

					<div className="mt-3 transition duration-300 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100">
						<div className="text-sm space-y-2 bg-white/90 text-slate-900 rounded-md p-3 shadow-lg">
							<div className="flex items-center gap-2">
								<Users size={16} />
								<span>
									Team Size: {hackathon.minTeamSize}-{hackathon.maxTeamSize}
								</span>
							</div>

							{hackathon.location && (
								<div className="flex items-center gap-2">
									<MapPin size={16} />
									<span>{hackathon.location}</span>
								</div>
							)}

							<div>Mode: {hackathon.mode}</div>
							<div>Organiser: {hackathon.organiserName}</div>

							<Link
								href={`/hackathons/${hackathon.hackathonId}`}
								className="mt-3 inline-flex items-center gap-2 text-sm font-semibold bg-slate-800 text-white px-4 py-2 rounded-lg hover:opacity-95 transition"
							>
								View Details <ArrowRight size={16} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

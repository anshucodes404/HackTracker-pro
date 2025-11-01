"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/components/ToastContext";
import { Button } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import type { Invite } from "@/types/types";

function Page({ params }: { params: { teamId: string } }) {
	const { addToast } = useToast();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [invite, setInvite] = useState<Invite | null>(null);
	const [error, setError] = useState("");
	useEffect(() => {
		async function loadInvite() {
			try {
				// const data = await fetchInviteDetails(params.teamId);
				const data = await fetch(`/api/invite`, {
					method: "GET",
					body: JSON.stringify({ teamId: params.teamId }),
				}).then((res) => res.json());
				setInvite(data.data);
			} catch (error) {
				console.log(error);
				setError("Invalid or expired invitation link.");
			} finally {
				setLoading(false);
			}
		}
		loadInvite();
	}, [params]);

	console.log("TeamId: ", params.teamId);

	const handleAccept = async () => {
		const res = await fetch(`/api/accept-decline-invite/${params.teamId}`, {
			method: "POST",
			body: JSON.stringify({ action: "accept", InviteId: invite?._id }),
		}).then((res) => res.json());
		if (res.success) {
			addToast("Invitation accepted!");
			router.push("/hackathons");
		}
	};

	const handleDecline = async () => {
		await fetch(`/api/accept-decline-invite/${params.teamId}`, {
			method: "POST",
			body: JSON.stringify({ action: "decline", InviteId: invite?._id }),
		}).then((res) => res.json());
		addToast("Invitation declined.");
		router.push("/");
	};

	if (loading) return <Loader fullscreen />;
	if (error)
		return (
			<div className="flex items-center justify-center h-screen text-red-500">
				{error}
			</div>
		);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-md bg-white shadow-2xl rounded-xl border border-slate-200 p-8 mx-4 relative">
				<ExternalLink className="absolute right-4 top-4 cursor-pointer" />
				<h1 className="text-2xl font-bold text-indigo-700 mb-2 text-center">
					{invite?.hackathonName}
				</h1>
				<p className="text-gray-600 text-center mb-4">{invite?.tagline}</p>
				<div className="bg-indigo-50 rounded-lg p-4 mb-4">
					<div className="mb-2">
						<span className="font-semibold text-indigo-600">Team:</span>{" "}
						{invite?.teamName}
					</div>
					<div>
						<span className="font-semibold text-indigo-600">Invited by:</span>{" "}
						{invite?.inviterName} (
						<a
							href={`mailto:${invite?.inviterEmail}`}
							className="underline text-indigo-500"
						>
							{invite?.inviterEmail}
						</a>
						)
					</div>
				</div>
				<div className="mb-4">
					<div className="font-semibold text-gray-700 mb-1">Deadline:</div>
					<div className="font-semibold text-gray-700 mb-1">Rules:</div>
					<ul className="list-disc list-inside text-sm text-gray-600">
						{invite?.rules?.map((rule: string, idx: number) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <>
							<li key={idx}>{rule}</li>
						))}
					</ul>
				</div>
				<div className="flex gap-4 mt-6">
					<Button className="flex-1" onClick={handleAccept}>
						Accept Invitation
					</Button>
					<Button className="flex-1" variant="danger" onClick={handleDecline}>
						Decline
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Page;

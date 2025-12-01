import { Funnel, User } from "lucide-react";
import HackathonCardMyHacks from "@/components/hackathons/HackathonCardMyHacks";
import MyHacksCard from "@/components/MyHacksCard";
import StatsCard from "@/components/StatsCard";
import { Input } from "@/components/ui";
import { useState } from "react";
import { ParticipatedHackathonCardProps } from "@/types/types";

const page = () => {
	// const hackathons = [
	// 	{
	// 		_id: "1",
	// 		hackathonName: "AI Innovators Challenge 2025",
	// 		mode: "online",
	// 		location: "",
	// 		tagline: "Build the future of AI-driven products",
	// 		organiserName: "TechVerse Labs",
	// 		duration: "36 hours",
	// 		minTeamSize: 2,
	// 		maxTeamSize: 4,
	// 		startAt: new Date("2025-12-20T10:00:00Z"),
	// 		registrationDeadline: new Date("2025-12-15T23:59:59Z"),
	// 		tags: ["AI", "ML", "DeepLearning", "Innovation"],
	// 		participants: ["u123", "u456"],
	// 		slug: "ai-innovators-challenge-2025",
	// 		prize: "₹1,00,000",
	// 		status: "ongoing",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "View Details",
	// 		teamName: "Neural Ninjas",
	// 	},
	// 	{
	// 		_id: "2",
	// 		hackathonName: "Hack The Future 3.0",
	// 		mode: "inplace",
	// 		location: "Bangalore, India",
	// 		tagline: "Where ideas meet innovation",
	// 		organiserName: "FutureX",
	// 		duration: "48 hours",
	// 		minTeamSize: 1,
	// 		maxTeamSize: 5,
	// 		startAt: new Date("2026-01-10T09:00:00Z"),
	// 		registrationDeadline: new Date("2026-01-05T23:59:59Z"),
	// 		tags: ["Web", "Blockchain", "Cloud"],
	// 		participants: ["u123"],
	// 		slug: "hack-the-future-3",
	// 		prize: "₹50,000",
	// 		status: "upcoming",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "Register",
	// 		teamName: "Code Commandos",
	// 	},
	// 	{
	// 		_id: "3",
	// 		hackathonName: "Smart City Challenge",
	// 		mode: "inplace",
	// 		location: "Hyderabad, India",
	// 		tagline: "Innovating smarter communities",
	// 		organiserName: "UrbanTech India",
	// 		duration: "24 hours",
	// 		minTeamSize: 2,
	// 		maxTeamSize: 6,
	// 		startAt: new Date("2025-12-05T09:00:00Z"),
	// 		registrationDeadline: new Date("2025-11-30T23:59:59Z"),
	// 		tags: ["IoT", "SmartDevices", "Automation"],
	// 		participants: ["u123", "u789"],
	// 		slug: "smart-city-challenge-2025",
	// 		prize: "₹75,000",
	// 		status: "completed",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "View Summary",
	// 		teamName: "Urban Coders",
	// 	},
	// 	{
	// 		_id: "4",
	// 		hackathonName: "HealthTech HackFest",
	// 		mode: "online",
	// 		location: "",
	// 		tagline: "Tech for better healthcare",
	// 		organiserName: "MediTech World",
	// 		duration: "30 hours",
	// 		minTeamSize: 1,
	// 		maxTeamSize: 3,
	// 		startAt: new Date("2025-11-30T10:00:00Z"),
	// 		registrationDeadline: new Date("2025-11-28T23:59:59Z"),
	// 		tags: ["Health", "AI", "DataScience"],
	// 		participants: ["u123"],
	// 		slug: "healthtech-hackfest-2025",
	// 		prize: "₹40,000",
	// 		status: "ongoing",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "View Details",
	// 		teamName: "MediMatrix",
	// 	},
	// 	{
	// 		_id: "5",
	// 		hackathonName: "CryptoBuilders Hackathon",
	// 		mode: "online",
	// 		location: "",
	// 		tagline: "Shape the future of Web3",
	// 		organiserName: "ChainSpace",
	// 		duration: "72 hours",
	// 		minTeamSize: 2,
	// 		maxTeamSize: 6,
	// 		startAt: new Date("2026-02-01T10:00:00Z"),
	// 		registrationDeadline: new Date("2026-01-28T23:59:59Z"),
	// 		tags: ["Blockchain", "Crypto", "Web3"],
	// 		participants: ["u123"],
	// 		slug: "cryptobuilders-hackathon",
	// 		prize: "₹2,00,000",
	// 		status: "upcoming",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "Register",
	// 		teamName: "BlockSmiths",
	// 	},
	// 	{
	// 		_id: "6",
	// 		hackathonName: "Eco Hack Challenge",
	// 		mode: "inplace",
	// 		location: "Delhi, India",
	// 		tagline: "Sustainability through tech",
	// 		organiserName: "GreenTech Initiative",
	// 		duration: "24 hours",
	// 		minTeamSize: 1,
	// 		maxTeamSize: 4,
	// 		startAt: new Date("2025-12-15T09:00:00Z"),
	// 		registrationDeadline: new Date("2025-12-12T23:59:59Z"),
	// 		tags: ["Environment", "IoT", "GreenEnergy"],
	// 		participants: ["u123", "u647"],
	// 		slug: "eco-hack-challenge-2025",
	// 		prize: "₹60,000",
	// 		status: "upcoming",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "Register",
	// 		teamName: "EcoBuilders",
	// 	},
	// 	{
	// 		_id: "7",
	// 		hackathonName: "GameDev Jam 2026",
	// 		mode: "online",
	// 		location: "",
	// 		tagline: "Create the next big indie game",
	// 		organiserName: "PixelForge",
	// 		duration: "96 hours",
	// 		minTeamSize: 1,
	// 		maxTeamSize: 5,
	// 		startAt: new Date("2026-03-10T10:00:00Z"),
	// 		registrationDeadline: new Date("2026-03-05T23:59:59Z"),
	// 		tags: ["GameDev", "Unity", "Design"],
	// 		participants: ["u123"],
	// 		slug: "gamedev-jam-2026",
	// 		prize: "₹80,000",
	// 		status: "upcoming",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "Register",
	// 		teamName: "RetroWave",
	// 	},
	// 	{
	// 		_id: "8",
	// 		hackathonName: "CyberSecure Hackathon",
	// 		mode: "inplace",
	// 		location: "Mumbai, India",
	// 		tagline: "Defend the digital world",
	// 		organiserName: "SecureNet",
	// 		duration: "36 hours",
	// 		minTeamSize: 2,
	// 		maxTeamSize: 4,
	// 		startAt: new Date("2025-12-25T09:00:00Z"),
	// 		registrationDeadline: new Date("2025-12-20T23:59:59Z"),
	// 		tags: ["CyberSecurity", "EthicalHacking", "Network"],
	// 		participants: ["u123", "u185"],
	// 		slug: "cybersecure-hackathon-2025",
	// 		prize: "₹1,20,000",
	// 		status: "upcoming",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "Register",
	// 		teamName: "DarkShield",
	// 	},
	// 	{
	// 		_id: "9",
	// 		hackathonName: "EduTech Builders Sprint",
	// 		mode: "online",
	// 		location: "",
	// 		tagline: "Reinvent learning experiences",
	// 		organiserName: "EdTech Vision",
	// 		duration: "48 hours",
	// 		minTeamSize: 1,
	// 		maxTeamSize: 4,
	// 		startAt: new Date("2025-12-18T10:00:00Z"),
	// 		registrationDeadline: new Date("2025-12-14T23:59:59Z"),
	// 		tags: ["Education", "AI", "Apps"],
	// 		participants: ["u123"],
	// 		slug: "edutech-builders-sprint",
	// 		prize: "₹30,000",
	// 		status: "ongoing",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "View Details",
	// 		teamName: "LearnX",
	// 	},
	// 	{
	// 		_id: "10",
	// 		hackathonName: "FinTech Codejam",
	// 		mode: "inplace",
	// 		location: "Pune, India",
	// 		tagline: "Build the future of finance",
	// 		organiserName: "FinTech Hub",
	// 		duration: "24 hours",
	// 		minTeamSize: 2,
	// 		maxTeamSize: 5,
	// 		startAt: new Date("2025-12-12T09:00:00Z"),
	// 		registrationDeadline: new Date("2025-12-09T23:59:59Z"),
	// 		tags: ["Finance", "AI", "WebApps"],
	// 		participants: ["u123", "u876"],
	// 		slug: "fintech-codejam-2025",
	// 		prize: "₹90,000",
	// 		status: "completed",
	// 		bannerImage:
	// 			"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=60",
	// 		btnText: "View Summary",
	// 		teamName: "MoneyMinds",
	// 	},
	// ];
	const [hackathons, setHackathons] = useState<ParticipatedHackathonCardProps[]>([]);


	//making request to fetch hackathons data

	const fetchHackathonsData = async () => {
		try {
			const response = await fetch(`/api/hackathons/participated/`, {method: "GET"}).then(res => res.json())
			console.log(response)

		} catch (error) {
			console.error("Something went wrong while fetching data!!!, Try again")
		}
	}




	return (
		<div className="w-full mx-auto max-w-7xl h-screen flex flex-col">
			<section className="bg-white px-10 pb-8 pt-24 border-b border-gray-200">
				<h1 className="text-4xl font-bold text-center mb-8">
					My Participated Hackathons
				</h1>

				<section className="flex gap-5 flex-wrap">
					<StatsCard
						title="Total Hackathons"
						value={5}
						icon={<User size={20} />}
						color="text-blue-700"
						bgColor="bg-blue-200/50"
						borderColor="border-blue-500"
					/>
					<StatsCard
						title="Teams Joined"
						value={3}
						icon={<User size={20} />}
						color="text-green-700"
						bgColor="bg-green-200/50"
						borderColor="border-green-500"
					/>
					<StatsCard
						title="Projects"
						value={2}
						icon={<User size={20} />}
						color="text-amber-700"
						bgColor="bg-amber-200/50"
						borderColor="border-amber-500"
					/>
					<StatsCard
						title="Awards"
						value={1}
						icon={<User size={20} />}
						color="text-violet-700"
						bgColor="bg-violet-200/50"
						borderColor="border-violet-500"
					/>
					<StatsCard
						title="Hours"
						value={48}
						icon={<User size={20} />}
						color="text-red-700"
						bgColor="bg-red-200/50"
						borderColor="border-red-500"
					/>
				</section>

				<section className="mt-10">
					<div className="flex gap-1.5 items-center mb-1">
						<Funnel size={20} /> Filters
					</div>
					<div className="flex gap-2">
						<Input
							type="text"
							placeholder="Search Hackathons..."
							className="w-2xl"
						/>
						<div className="grid grid-cols-4 gap-4 w-full max-w-5xl">
							<select
								name="status"
								id="status"
								className="rounded-lg px-2 border border-gray-300 min-w-20"
							>
								<option value="all">All</option>
								<option value="upcoming">Upcoming</option>
								<option value="ongoing">Ongoing</option>
								<option value="ended">Ended</option>
							</select>
							<select
								name="mode"
								id="mode"
								className="rounded-lg px-2 border border-gray-300"
							>
								<option value="all">All</option>
								<option value="online">Online</option>
								<option value="offline">Offline</option>
							</select>
							<select
								name="role"
								id="role"
								className="rounded-lg px-2 border border-gray-300"
							>
								<option value="all">All</option>
								<option value="online">Leader</option>
								<option value="offline">Member</option>
							</select>

							<select
								disabled={true}
								name="team-status"
								id="team-status"
								className="rounded-lg px-2 border border-gray-300"
							>
								<option value="N/A">N/A</option>
								<option value="Won">Won</option>
								<option value="Disqualified">Disqualified</option>
							</select>
						</div>
					</div>
				</section>
			</section>

			<main className="flex-1 overflow-auto px-10 py-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{hackathons.map((h) => (
						<MyHacksCard key={h._id} data={h} />
					))}
				</div>
			</main>
		</div>
	);
};

export default page;

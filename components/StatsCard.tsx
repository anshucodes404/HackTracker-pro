interface StatsCardProps {
	title: string;
	value: number | string;
	icon: React.ReactNode;
	color: string;
	borderColor: string;
	bgColor: string;
}

const StatsCard = ({
	title,
	value,
	icon,
	color,
	borderColor,
	bgColor,
}: StatsCardProps) => {
	return (
		<div
			className={`flex-1 min-w-[200px] ${bgColor} rounded-xl px-4 py-3 ${borderColor} border-2`}
		>
			<div className="flex justify-between items-center">
				<div className="text-sm text-gray-600">{title}</div>
				<span className="text-gray-600">{icon}</span>
			</div>
			<div className={`text-4xl font-bold pl-2 ${color} `}>{value}</div>
		</div>
	);
};

export default StatsCard;

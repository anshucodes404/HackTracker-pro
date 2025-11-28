import Image from "next/image";

interface ProfileImageViewProps{
    src?: string;
    name: string;
    size?: number;
}

export default function ProfileImageView({src, name, size = 56}: ProfileImageViewProps) {

    const intialNames = name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div
			className="relative rounded-full overflow-hidden bg-gray-300 flex items-center justify-center font-semibold select-none"
			style={{ width: size, height: size, fontSize: size / 2.5 }}
		>
			{src ? (
			
					<Image
						src={src}
						alt={name}
						width={size}
						height={size}
						className={ "w-full h-full object-cover"}
					/>
				
			) : (
				<span>
					{intialNames}
				</span>
			)}
		</div>
  )
}

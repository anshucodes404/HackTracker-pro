"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProfileImageProps {
	src?: string;
	name: string;
	size?: number;
	uploadImage: (file: File) => void;
}

const ProfileImageEdit: React.FC<ProfileImageProps> = ({
	src,
	name,
	size = 56,

	uploadImage,
}) => {
	const fileRef = useRef<HTMLInputElement | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | undefined>(src);

	useEffect(() => {
		setPreviewUrl(src);
	}, [src]);

	useEffect(() => {
		console.log(new Date().toISOString());
		return () => {
			if (previewUrl?.startsWith("blob:")) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const selectedFile = e.target.files?.[0] || null;
		if (!selectedFile) return;

		const url = URL.createObjectURL(selectedFile);

		if (previewUrl?.startsWith("blob:")) {
			URL.revokeObjectURL(previewUrl);
		}
		setPreviewUrl(url);
		uploadImage(selectedFile);
	}

	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();

	return (
		<div
			className="relative group rounded-full overflow-hidden bg-gray-300 flex items-center justify-center font-semibold select-none"
			style={{ width: size, height: size, fontSize: size / 2.5 }}
		>
			<button
				type="button"
				onClick={() => fileRef.current?.click()}
				title="Change Profile picture"
				className="
                        absolute inset-0 flex items-center justify-center 
                        bg-black/40 opacity-0 group-hover:opacity-100 
                        transition-all duration-200 z-10
                    "
			>
				<input
					ref={fileRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
				<Pencil size={size / 2.5} className="text-white" />
			</button>

			{previewUrl ? (
				previewUrl.startsWith("blob:") ? (
					// biome-ignore lint/performance/noImgElement: <>
					<img
						src={previewUrl}
						alt={name}
						style={{ width: "100%", height: "100%" }}
						className={
							"object-cover transition-all duration-200 group-hover:blur-sm"
						}
					/>
				) : (
					<Image
						src={previewUrl}
						alt={name}
						width={size}
						height={size}
						className={
							"w-full h-full object-cover transition-all duration-200 group-hover:blur-sm"
						}
					/>
				)
			) : (
				<span className={"transition-all duration-200 group-hover:blur-sm"}>
					{initials}
				</span>
			)}
		</div>
	);
};

export default ProfileImageEdit;

// components/ui/Input.tsx
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	label,
	required = false,
	className,
	...props
}) => {
	return (
		<div className="flex flex-col">
			{label && (<label htmlFor={label} className="text-sm font-medium text-gray-700 mb-1">{label} <span className="text-red-600">{required && " *"}</span></label>)}
			<input
        id={label}
				className={clsx(
					"border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
					className,
				)}
				{...props}
			/>
		</div>
	);
};

export default Input;

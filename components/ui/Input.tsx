// components/ui/Input.tsx
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
      {label && <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        className={clsx(
          "border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;

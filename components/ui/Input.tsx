// components/ui/Input.tsx
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium">{label}</label>}
      <input
        className={clsx(
          "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;

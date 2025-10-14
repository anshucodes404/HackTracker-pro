// components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx"; // allows combining classNames easily

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const base = "px-4 py-2 rounded font-semibold transition-colors";
  
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props} />
  );
};

export default Button;

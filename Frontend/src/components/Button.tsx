import type { ButtonHTMLAttributes, ReactElement } from "react";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>['type'];

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?:boolean;
  type?:ButtonType;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles =
  "px-4 py-2 rounded-lg font-light flex items-center justify-center";

export default function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  type
}: ButtonProps) {
  return (
    <button
      className={`${variantStyles[variant]} ${defaultStyles} ${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading? " opacity-45 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={loading}
      type={type}
    >
      {startIcon && <span className="pr-2">{startIcon}</span>} {text}
    </button>
  );
}

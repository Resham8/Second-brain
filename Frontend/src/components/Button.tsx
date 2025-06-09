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
  primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl",
  secondary: "bg-purple-200 hover:bg-purple-300 text-purple-600 shadow-md hover:shadow-lg",
};

const defaultStyles =
  "px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95";

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

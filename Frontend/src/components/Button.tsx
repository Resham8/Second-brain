import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles =
  "px-4 py-2 rounded-lg font-light flex items-center jusrify-center cursor-pointer";

export default function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth
}: ButtonProps) {
  return (
    <button
      className={`${variantStyles[variant]} ${defaultStyles} ${fullWidth ? " w-full flex justify-center items-center" : ""}`}
      onClick={onClick}
    >
      {startIcon && <span className="pr-2">{startIcon}</span>} {text}
    </button>
  );
}

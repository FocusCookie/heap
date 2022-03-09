import React from "react";
import "./Button.css";

type Props = {
  onClick?: React.MouseEventHandler;
  variant?: "primary" | "secondary" | "subtle";
  label: string;
  single?: boolean;
  disabled?: boolean;
};

export default function Button({
  onClick,
  variant = "secondary",
  label = "label",
  single = false,
  disabled = false,
}: Props) {
  return (
    <button
      className={`btn btn--${variant} ${single ? "btn--single" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

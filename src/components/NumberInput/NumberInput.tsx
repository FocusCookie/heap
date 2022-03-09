import React from "react";
import "./NumberInput.css";

type Props = {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export default function NumberInput({
  label,
  name,
  id,
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <label className="number-input__label">
      {label}
      <input
        size={4}
        className="number-input__input"
        type="number"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
}

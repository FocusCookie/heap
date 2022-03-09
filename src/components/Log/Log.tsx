import React from "react";
import "./Log.css";

type Props = {
  value: string;
};

export default function Log({ value = "..." }: Props) {
  return (
    <div className="log">
      {"//"} {value}
    </div>
  );
}

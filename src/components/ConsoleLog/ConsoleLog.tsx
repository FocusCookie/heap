import React from "react";
import "./ConsoleLog.css";

type Props = { value: string };

export default function ConsoleLog({ value = "foo bar" }: Props) {
  return (
    <div className="console-log">
      <span>console.</span>
      <span className="console-log__method">log</span>
      <span>(</span>
      <span className="console-log__arg">{value}</span>
      <span>)</span>
    </div>
  );
}

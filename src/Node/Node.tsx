import React from "react";
import "./Node.css";

type Props = {
  value: number;
  variant: "head" | "normal" | "insert";
};

export default function Node({ value = 99, variant = "normal" }: Props) {
  const x = 0;
  const y = 0;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 359 359"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fillRule: "evenodd", clipRule: "evenodd" }}
    >
      <g transform={`matrix(4.16667,0,0,4.16667,${x},${y})`}>
        <g id="node_normal">
          <g id="circle_bg">
            <circle
              className={`node__bg ${
                variant === "insert" ? "node__bg--insert" : ""
              }`}
              cx="43"
              cy="42"
              r="40"
            />
            <circle
              cx="43"
              cy="42"
              r="39.5"
              className={`node__outline ${
                variant === "insert" ? "node__outline--insert" : ""
              } ${variant === "head" ? "node__outline--head" : ""}`}
            />
          </g>
          <g transform="matrix(1,0,0,1,42.7734,53.1016)">
            <text
              x={`${value >= 10 ? -17.797 : -9}px`}
              y="0px"
              className={`node__text ${
                variant === "head" ? "node__text--head" : ""
              } ${variant === "insert" ? "node__text--insert" : ""}`}
            >
              {value}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}

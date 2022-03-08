import React, { useEffect, useState } from "react";
import "./Node.css";

type Props = {
  value: number;
  variant?: "head" | "normal" | "insert";
  diameter?: number;
  x?: number;
  y?: number;
};

export default function Node({
  value = 99,
  variant = "normal",
  diameter = 80,
  x = -100,
  y = -100,
}: Props) {
  const [transX, setTransX] = useState<number>(-100);
  const [transY, setTransY] = useState<number>(-100);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTransY(y);
      setTransX(x);
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [x, y]);

  return (
    <svg
      width={`${diameter}`}
      height={`${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
      className="node"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `translate(${transX}px, ${transY}px)` }}
    >
      <circle
        className={`node__bg ${variant === "insert" ? "node__bg--insert" : ""}`}
        cx="50"
        cy="50"
        r="50"
      />
      <circle
        cx="50"
        cy="50"
        r="49"
        className={`node__outline ${
          variant === "insert" ? "node__outline--insert" : ""
        } ${variant === "head" ? "node__outline--head" : ""}`}
      />
      <text
        className={`node__text ${
          variant === "head" ? "node__text--head" : ""
        } ${variant === "insert" ? "node__text--insert" : ""}`}
        x={`${value >= 10 ? 30 : 40}px`}
        y="61.102px"
      >
        {value}
      </text>
    </svg>
  );
}

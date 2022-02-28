import React from "react";
import "./Heap.css";
import Node from "../Node/Node";

type Props = {};

export default function Heap({}: Props) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fillRule: "evenodd", clipRule: "evenodd" }}
    >
      <line
        x1="500"
        y1="40"
        x2={500 - 80}
        y2="160"
        stroke="white"
        stroke-width="5"
      />
      <Node value={9} variant="normal" diameter={80} transX={`${500 - 40}px`} />
      <Node
        value={9}
        variant="normal"
        diameter={80}
        transX={`${500 - 120}px`}
        transY="120px"
      />
    </svg>
  );
}

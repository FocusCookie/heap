import React from "react";
import "./Heap.css";
import Node from "../Node/Node";

type Props = {
  heap: any;
};

export default function Heap({ heap = [] }: Props) {
  return (
    <svg
      viewBox="0 0 1400 1400" // changed from 1000 to 1400 to support max5 lvls
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fillRule: "evenodd", clipRule: "evenodd" }}
    >
      {Object.keys(heap).map((key) => {
        if (heap[key].type === "line") {
          return (
            <line
              x1={heap[key].x1 + 40}
              y1={heap[key].y1 + 40}
              x2={heap[key].x2}
              y2={heap[key].y2}
              stroke="white"
              strokeWidth="5"
              key={heap[key].id}
            />
          );
        }
        if (heap[key].type === "node") {
          return (
            <Node
              value={heap[key].node.value}
              variant={heap[key].variant}
              diameter={heap[key].diameter}
              x={heap[key].x}
              y={heap[key].y}
              key={heap[key].node.id}
            />
          );
        }
      })}
    </svg>
  );
}

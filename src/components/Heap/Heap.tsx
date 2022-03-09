import React, { useState, useEffect } from "react";
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
          console.log("line ", heap[key]);
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

      {/* 
      <line
        x1={400}
        y1={80}
        x2={500 - 80}
        y2="160"
        stroke="white"
        strokeWidth="5"
      />
      <Node value={9} variant="normal" diameter={80} transX={`${500 - 40}px`} />
      <Node
        value={9}
        variant="normal"
        diameter={80}
        transX={`${500 - 120}px`}
        transY="120px"
      /> */}
    </svg>
  );
}

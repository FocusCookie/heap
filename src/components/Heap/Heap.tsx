import React from "react";
import "./Heap.css";
import Node from "../Node/Node";
import { LeveledNode } from "../../interfaces/heap";
import heapDrawUtilities from "../../functions/heapDrawUtilities";

type Props = {
  leveledHeap: any;
};

function getInitialOffsetForLevel(level: number): number {
  let result: number = 0;

  if (level > 0) {
    for (let i: number = 1; i <= level; i++)
      result = result + Math.pow(2, i + 1) * 10;
  }

  return result;
}

export default function Heap({ leveledHeap = [] }: Props) {
  console.log("rev ", leveledHeap.slice().reverse());

  return (
    <svg
      viewBox="0 0 1400 1400" // changed from 1000 to 1400 to support max5 lvls
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
        strokeWidth="5"
      />

      {leveledHeap
        .slice()
        .reverse()
        .map((nodes: any, lvlIndex: number) =>
          nodes.map((node: any, nodeIndex: number) => (
            <Node
              value={node.value}
              variant="normal"
              diameter={80}
              transX={`${
                nodeIndex * (Math.pow(2, lvlIndex) * 80) +
                getInitialOffsetForLevel(lvlIndex)
              }px`}
              transY={`${node.level * 160}px`}
              key={node.id}
            />
          ))
        )}

      {/* <Node value={9} variant="normal" diameter={80} transX={`${500 - 40}px`} />
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

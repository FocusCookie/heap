import React, { useState, useEffect } from "react";
import "./App.css";
import { useHeap } from "./hooks/Heap";
import { Node, Step, DrawingNode } from "./interfaces/heap";
import heapDrawUtilities from "./functions/heapDrawUtilities";
import Heap from "./components/Heap/Heap";
import uniqueId from "./functions/uniqueId";

function getInitialOffsetForLevel(level: number): number {
  let result: number = 0;

  if (level > 0) {
    for (let i: number = 1; i <= level; i++)
      result = result + Math.pow(2, i + 1) * 10;
  }

  return result;
}

function App() {
  const [value, setValue] = useState<number>(0);
  const [insertValue, setInsertValue] = useState(false);
  const [removeNode, setRemoveNode] = useState(false);
  const [heap, setHeap] = useState<any[]>([]);

  const { status, nodes, head, error, steps } = useHeap(
    value,
    insertValue,
    removeNode
  );

  const NODE_DIAMETER = 80;

  useEffect(() => {
    console.log("STATUS UPDATE ", status);
    if (
      status === "inserted" ||
      status === "removed" ||
      status === "error" ||
      status === "head_updated"
    ) {
      setInsertValue(false);
      setRemoveNode(false);

      const leveled = heapDrawUtilities.addLevels(nodes);
      const sortedByLevel = heapDrawUtilities.sortedByLevel(leveled);

      const updatedDrawedHeap: any = {};
      sortedByLevel
        .slice()
        .reverse()
        .forEach((nodes: any, lvlIndex: number) => {
          nodes.forEach((node: any, nodeIndex: number, lvlNodes: any) => {
            const x: number =
              nodeIndex * (Math.pow(2, lvlIndex) * 80) +
              getInitialOffsetForLevel(lvlIndex);
            const y: number = node.level * 160;

            const x2: number =
              Math.floor(nodeIndex / 2) * (Math.pow(2, lvlIndex + 1) * 80) +
              40 +
              getInitialOffsetForLevel(lvlIndex + 1);
            const y2: number = y - 120;

            const headId = sortedByLevel[0][0].id;

            const drawedLine = {
              type: "line",
              id: node.id + "_line_" + nodeIndex,
              x1: headId !== node.id ? x : -100,
              y1: headId !== node.id ? y : -100,
              x2: headId !== node.id ? x2 : -100,
              y2: headId !== node.id ? y2 : -100,
            };

            updatedDrawedHeap[drawedLine.id] = drawedLine;

            const drawedNode: DrawingNode = {
              type: "node",
              node: node,
              variant: headId === node.id ? "head" : "normal",
              diameter: NODE_DIAMETER,
              x: x,
              y: y,
              key: node.id,
            };

            updatedDrawedHeap[node.id] = drawedNode;
          });
        });

      setHeap(updatedDrawedHeap);
    }
  }, [status, head, nodes, error]);

  function handleInput(e: any) {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  }

  function insertHandler() {
    setRemoveNode(false);
    setInsertValue(true);
  }

  function delteHandler() {
    setRemoveNode(true);
    setInsertValue(false);
  }

  return (
    <div className="App flex flex-row gap-4">
      <header className="App-header">
        <input
          type="number"
          name="value"
          id="value"
          value={value}
          onChange={handleInput}
        />

        <button disabled={insertValue} onClick={insertHandler}>
          Insert
        </button>
        <button disabled={removeNode} onClick={delteHandler}>
          Delete
        </button>

        <hr />

        <p>Status:{status}</p>
        <p>Data:</p>
        <ul>
          {nodes.map((node: Node) => {
            return <li key={`heap-${node.id}`}>{node.value}</li>;
          })}
        </ul>
        <p>Head:{head}</p>
        <p>Error:{error}</p>
        <hr />
        <p>steps:</p>
        <ul>
          {steps.map((step: Step, index: number) => {
            return <li key={`heap-${index}`}>{step.action}</li>;
          })}
        </ul>
      </header>
      <Heap heap={heap} />
    </div>
  );
}

export default App;

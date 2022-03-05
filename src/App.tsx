import React, { useState, useEffect } from "react";
import "./App.css";
import { useHeap } from "./hooks/Heap";
import { Node, Step } from "./interfaces/heap";

const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  );
};

function App() {
  const [value, setValue] = useState<number>(0);
  const [insertValue, setInsertValue] = useState(false);
  const [removeNode, setRemoveNode] = useState(false);

  const { status, nodes, head, error, steps } = useHeap(
    value,
    insertValue,
    removeNode
  );

  useEffect(() => {
    console.log("STATUS UPDATE ", status);
    if (
      status === "inserted" ||
      status === "removed" ||
      status === "error" ||
      status === "head_updated"
    ) {
      console.log("Set insertion and removement to false");
      setInsertValue(false);
      setRemoveNode(false);
      console.log(steps);
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
    <div className="App">
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
    </div>
  );
}

export default App;

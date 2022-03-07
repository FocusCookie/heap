import React, { useState, useEffect } from "react";
import "./App.css";
import { useHeap } from "./hooks/Heap";
import { Node, Step } from "./interfaces/heap";
import heapDrawUtilities from "./functions/heapDrawUtilities";
import Heap from "./components/Heap/Heap";

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
      setInsertValue(false);
      setRemoveNode(false);

      console.log(steps);
      console.log("-----");
      const leveled = heapDrawUtilities.addLevels(nodes);
      console.log("lvl ", leveled);
      const sorted = heapDrawUtilities.sortedByLevel(leveled);
      console.log("sorted ", sorted);

      console.log("-----");
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
  const leveledHeap: any = heapDrawUtilities.sortedByLevel([
    {
      level: 0,
      value: 73412,
      id: "ID_5000191778850000",
    },
    {
      level: 1,
      value: 9675,
      id: "ID_1118534989444000",
    },
    {
      level: 1,
      value: 333,
      id: "ID_1368300221671000",
    },
    {
      level: 2,
      value: 111,
      id: "ID_1443175222450000",
    },
    {
      level: 2,
      value: 734,
      id: "ID_1201995536436000",
    },
    {
      level: 2,
      value: 234,
      id: "ID_1606677296258000",
    },
    {
      level: 2,
      value: 85,
      id: "ID_2544045767070000",
    },
    {
      level: 3,
      value: 65,
      id: "ID_1274732125484000",
    },
    {
      level: 3,
      value: 99,
      id: "ID_5614322478300000",
    },
    {
      level: 3,
      value: 235,
      id: "ID_5774371380820000",
    },
    {
      level: 3,
      value: 564,
      id: "ID_1116489312747000",
    },
    {
      level: 3,
      value: 53,
      id: "ID_3264685245830000",
    },
    {
      level: 3,
      value: 222,
      id: "ID_5089028449930000",
    },
    {
      level: 3,
      value: 3,
      id: "ID_1021593735912000",
    },
    {
      level: 3,
      value: 23,
      id: "ID_1201189828192000",
    },
    {
      level: 4,
      value: 1,
      id: "ID_1536291559415000",
    },
    {
      level: 4,
      value: 23,
      id: "ID_1003324310905000",
    },
    {
      level: 4,
      value: 23,
      id: "ID_6095430965960000",
    },
    {
      level: 4,
      value: 34,
      id: "ID_1159954210931000",
    },
    {
      level: 4,
      value: 23,
      id: "ID_1591746202357000",
    },
    {
      level: 4,
      value: 68,
      id: "ID_2283280170910000",
    },
    {
      level: 4,
      value: 24,
      id: "ID_1074524434238000",
    },
    {
      level: 4,
      value: 23,
      id: "ID_1226308704070000",
    },
    {
      level: 4,
      value: 11,
      id: "ID_6489275318330000",
    },
    {
      level: 4,
      value: 23,
      id: "ID_1442890394655000",
    },
    {
      level: 4,
      value: 21,
      id: "ID_1002173310183000",
    },
    {
      level: 4,
      value: 1,
      id: "ID_9366039722820000",
    },
    {
      level: 4,
      value: 2,
      id: "ID_3061469872190000",
    },
    {
      level: 4,
      value: 3,
      id: "ID_1405585978690000",
    },
    {
      level: 4,
      value: 4,
      id: "ID_1187966078337000",
    },
    {
      level: 4,
      value: 5,
      id: "ID_1061260622492000",
    },
  ]);

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
      <br />
      <Heap leveledHeap={leveledHeap} />
    </div>
  );
}

export default App;

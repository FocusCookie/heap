import { useEffect, useReducer, useState } from "react";
import uniqueId from "../functions/uniqueId";
import { Node, Step } from "../interfaces/heap";

interface State {
  status: string;
  nodes: Node[];
  steps: Step[];
  head: number | null;
  error: "" | null;
}

enum ActionKind {
  INSERTING,
  INSERTED,
  REMOVING,
  REMOVED,
  ERROR,
  HEAD_UPDATED,
  RESET_ERROR,
}

interface Action {
  type: ActionKind;
  payload?: any;
  error?: string;
}

function heapReducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.INSERTING:
      return { ...state, status: "inserting" };
    case ActionKind.INSERTED:
      return {
        ...state,
        status: "inserted",
        nodes: payload.nodes,
        steps: payload.steps,
      };
    case ActionKind.REMOVING:
      return { ...state, status: "removing" };
    case ActionKind.REMOVED:
      return {
        ...state,
        status: "removed",
        nodes: payload.nodes,
        steps: payload.steps,
      };
    case ActionKind.ERROR:
      return { ...state, status: "error", error: payload };
    case ActionKind.RESET_ERROR:
      return { ...state, status: "reset_error", error: null };
    case ActionKind.HEAD_UPDATED:
      return { ...state, status: "head_updated", head: payload };
    default:
      return state;
  }
}

export const useHeap = (
  value: number | null,
  insert: boolean = false,
  remove: boolean = false
) => {
  const inititalState: State = {
    status: "idle",
    nodes: [],
    steps: [],
    head: null,
    error: null,
  };

  const [heap, setHeap] = useState<Node[]>([]);
  const [state, dispatch] = useReducer(heapReducer, inititalState);

  useEffect(() => {
    if (insert === remove) return;

    if (insert && value === null) {
      dispatch({
        type: ActionKind.ERROR,
        payload: "No value given for insertion.",
      });
      return;
    }

    if (insert && value !== null && value < 0) {
      dispatch({
        type: ActionKind.ERROR,
        payload: "No minus values allowed.",
      });
      return;
    }

    if (remove && value === null) {
      dispatch({
        type: ActionKind.ERROR,
        payload: "No value given for removment.",
      });
    }

    if (insert && value !== null) {
      const steps: Step[] = state.steps.map((el) => el);
      dispatch({ type: ActionKind.INSERTING });
      dispatch({ type: ActionKind.RESET_ERROR });

      const nodes: Node[] = heap.map((node) => node);
      const insertedNode: Node = { value: value, id: uniqueId() };
      nodes.push(insertedNode);

      steps.push({ action: `Inserted: ${insertedNode.value}`, nodes: nodes });

      let insertedNodeIndex: number = nodes.length - 1;
      let checkedInsertedValueWithParents: boolean = false;

      // check the inserted value against its parents until its not bigger than the parent
      while (!checkedInsertedValueWithParents) {
        if (insertedNodeIndex === 0) {
          checkedInsertedValueWithParents = true;
        } else {
          const parentIndex: number = Math.floor((insertedNodeIndex - 1) / 2);
          const parent: Node = nodes[parentIndex];

          if (parent.value < insertedNode.value) {
            nodes[parentIndex] = insertedNode;
            nodes[insertedNodeIndex] = parent;

            insertedNodeIndex = parentIndex;

            steps.push({
              action: `Switch - ${parent.value} < ${insertedNode.value} = ${
                parent.value < insertedNode.value
              }`,
              nodes: nodes,
            });
          } else {
            checkedInsertedValueWithParents = true;
          }
        }
      }

      setHeap(nodes);

      dispatch({ type: ActionKind.HEAD_UPDATED, payload: nodes[0].value });
      dispatch({ type: ActionKind.INSERTED, payload: { nodes, steps } });
    }

    if (remove && value !== null) {
      dispatch({ type: ActionKind.REMOVING });
      dispatch({ type: ActionKind.RESET_ERROR });

      console.log("DELETE INDEX", value);
    }
  }, [insert, remove]);

  return state;
};

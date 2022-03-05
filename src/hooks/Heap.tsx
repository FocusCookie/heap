import { useEffect, useReducer, useState } from "react";
import MaxHeap from "../functions/MaxHeap";
import { Node, Step } from "../interfaces/heap";

interface State {
  status: string;
  nodes: Node[];
  steps: Step[];
  head: number | null;
  error: "" | null;
}

enum ActionKind {
  STEP_UPDATE,
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
    case ActionKind.STEP_UPDATE:
      return { ...state, status: "step_update", steps: payload };
    case ActionKind.INSERTING:
      return { ...state, status: "inserting" };
    case ActionKind.INSERTED:
      return { ...state, status: "inserted", nodes: payload };
    case ActionKind.REMOVING:
      return { ...state, status: "removing" };
    case ActionKind.REMOVED:
      return { ...state, status: "removed", nodes: payload };
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

  const [heap, setHeap] = useState<number[]>([]);
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
      dispatch({ type: ActionKind.INSERTING });
      dispatch({ type: ActionKind.RESET_ERROR });

      const nodes = heap.map((val) => val);
      // add node to heap on the last node tree
      nodes.push(value);

      let valueIndex: number = nodes.length - 1;

      let checkedInsertedValueWithParents: boolean = false;

      // check the inserted value against its parents until its not bigger than the parent
      while (!checkedInsertedValueWithParents) {
        if (valueIndex === 0) {
          checkedInsertedValueWithParents = true;
        } else {
          const parentIndex: number = Math.floor((valueIndex - 1) / 2);
          const parent: number = nodes[parentIndex];

          if (parent < value) {
            nodes[parentIndex] = value;
            nodes[valueIndex] = parent;

            //update indexes
            valueIndex = parentIndex;

            const updatedSteps = [
              ...state.steps,
              { action: `Compare: ${parent} < ${value}`, nodes: nodes },
            ];

            dispatch({ type: ActionKind.STEP_UPDATE, payload: updatedSteps });
          } else {
            checkedInsertedValueWithParents = true;
          }
        }
      }

      const updatedHeap = MaxHeap.insert(heap, value);

      setHeap(updatedHeap);

      const updatedSteps = [
        ...state.steps,
        { action: `Inserted ${value}`, nodes: updatedHeap },
      ];

      dispatch({ type: ActionKind.STEP_UPDATE, payload: updatedSteps });
      dispatch({ type: ActionKind.HEAD_UPDATED, payload: updatedHeap[0] });
      dispatch({ type: ActionKind.INSERTED, payload: updatedHeap });
    }

    if (remove && value !== null) {
      dispatch({ type: ActionKind.REMOVING });
      dispatch({ type: ActionKind.RESET_ERROR });

      if (value >= heap.length || value < 0) {
        dispatch({
          type: ActionKind.ERROR,
          payload: "Given Index/Node is not existing in the Heap.",
        });
        return;
      } else {
        const updatedHeap = MaxHeap.deleteNode(heap, value);
        setHeap(updatedHeap);

        dispatch({ type: ActionKind.HEAD_UPDATED, payload: updatedHeap[0] });
        dispatch({ type: ActionKind.REMOVED, payload: updatedHeap });
      }
    }
  }, [insert, remove]);

  return state;
};

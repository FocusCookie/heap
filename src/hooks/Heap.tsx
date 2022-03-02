import { useEffect, useReducer, useState } from "react";
import MaxHeap from "../functions/MaxHeap";

//TODO: Implement the heap functions not wiht import, because i need to make thame timed in an interval each step to display it in

interface State {
  status: string;
  data: number[];
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
      return { ...state, status: "inserted", data: payload };
    case ActionKind.REMOVING:
      return { ...state, status: "removing" };
    case ActionKind.REMOVED:
      return { ...state, status: "removed", data: payload };
    case ActionKind.ERROR:
      return { ...state, status: "error", error: payload };
    case ActionKind.RESET_ERROR:
      return { ...state, status: "reseted-error", error: null };
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
    data: [],
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

      const updatedHeap = MaxHeap.insert(heap, value);
      setHeap(updatedHeap);

      dispatch({ type: ActionKind.HEAD_UPDATED, payload: updatedHeap[0] });
      dispatch({ type: ActionKind.INSERTED, payload: updatedHeap });
    }
    console.log("remove ", remove);
    console.log("remove ", remove);

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

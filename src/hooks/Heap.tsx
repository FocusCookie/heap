import { useEffect, useReducer, useState } from "react";
import MaxHeap from "../functions/MaxHeap";

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

    if (insert && !value) {
      dispatch({
        type: ActionKind.ERROR,
        payload: "No value given for insertion.",
      });
    }

    if (remove && !value) {
      dispatch({
        type: ActionKind.ERROR,
        payload: "No value given for removment.",
      });
    }

    if (insert && value) {
      dispatch({ type: ActionKind.INSERTING });

      const updatedHeap = MaxHeap.insert(heap, value);
      setHeap(updatedHeap);

      dispatch({ type: ActionKind.INSERTED, payload: updatedHeap });
    }

    if (remove && value) {
      dispatch({ type: ActionKind.INSERTING });

      const updatedHeap = MaxHeap.insert(heap, value);
      setHeap(updatedHeap);

      dispatch({ type: ActionKind.INSERTED, payload: updatedHeap });
    }
  }, [insert, remove]);

  //TODO: verhindern, dass ein endloses removement oder insertion passiert, wenn remove oder insert nicht wieder auf false gesetzt wird

  return state;
};

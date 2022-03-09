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
    if (remove && insert) {
      dispatch({
        type: ActionKind.ERROR,
        payload: "Cant remove and insert at the same time.",
      });
      return;
    }

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
              action: `Switch: ${parent.value} < ${insertedNode.value} = ${
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

    if (remove) {
      dispatch({ type: ActionKind.REMOVING });
      dispatch({ type: ActionKind.RESET_ERROR });

      const steps: Step[] = state.steps.map((el) => el);
      const nodes: Node[] = heap.map((node) => node);
      const nodeIndexToDelete: number = 0;
      const nodeToDelete: Node = nodes[nodeIndexToDelete];

      const lastNodeIndex: number = nodes.length - 1;
      let checkedTreeForBalancing: boolean = false;

      if (nodeIndexToDelete === nodes.length - 1) {
        nodes.pop();

        steps.push({
          action: `Removed: ${nodeToDelete.value}`,
          nodes: nodes,
        });
      } else {
        // swap delete index with root
        const lastNode = nodes[lastNodeIndex];

        // switch node to delete with the last leaf node in the tree
        nodes[nodeIndexToDelete] = lastNode;
        nodes[lastNodeIndex] = nodes[nodeIndexToDelete];

        steps.push({
          action: `Swap: ${nodeToDelete.value} with ${lastNode.value}`,
          nodes: nodes,
        });

        // delete last node which is the node to delete
        nodes.pop();

        if (nodes.length === 0) checkedTreeForBalancing = false;

        steps.push({
          action: `Removed: ${nodeToDelete.value}`,
          nodes: nodes,
        });

        let parentIndex: number = nodeIndexToDelete;

        while (!checkedTreeForBalancing) {
          const parentLeftNodeIndex: number = 2 * parentIndex + 1;
          const parentRightNodeIndex: number = 2 * parentIndex + 2;

          const parent: Node = nodes[parentIndex];
          const leftNode: Node = nodes[parentLeftNodeIndex];
          const rightNode: Node = nodes[parentRightNodeIndex];
          const rightNodeExists: boolean = typeof rightNode === "object";
          const leftNodeExists: boolean = typeof leftNode === "object";

          const switchParentWithChildNode =
            (leftNodeExists && leftNode.value > parent.value) ||
            (rightNodeExists && rightNode.value > parent.value);

          const leftNodeIsBiggerThenRightNode =
            leftNodeExists &&
            rightNodeExists &&
            leftNode.value > rightNode.value;

          if (switchParentWithChildNode) {
            if (
              leftNodeIsBiggerThenRightNode ||
              (leftNodeExists && !rightNode)
            ) {
              nodes[parentIndex] = leftNode;
              nodes[parentLeftNodeIndex] = parent;
              parentIndex = parentLeftNodeIndex;

              steps.push({
                action: `Swap: ${leftNode.value} > ${parent.value} = true`,
                nodes: nodes,
              });
            }

            if (!leftNodeIsBiggerThenRightNode && rightNode) {
              nodes[parentIndex] = rightNode;
              nodes[parentRightNodeIndex] = parent;
              parentIndex = parentRightNodeIndex;

              steps.push({
                action: `Swap: ${rightNode.value} > ${parent.value} = true`,
                nodes: nodes,
              });
            }
          } else {
            checkedTreeForBalancing = true;
          }
        }
      }

      setHeap(nodes);

      dispatch({
        type: ActionKind.HEAD_UPDATED,
        payload: nodes[0] ? nodes[0].value : null,
      });
      dispatch({ type: ActionKind.REMOVED, payload: { nodes, steps } });
    }
  }, [insert, remove]);

  return state;
};
